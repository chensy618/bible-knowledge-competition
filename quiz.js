(function () {
  const shared = window.APP_SHARED;
  const STORAGE_KEYS = shared.STORAGE_KEYS;
  const questionBank = shared.getQuestionBank();

  const elements = {
    backLink: document.getElementById("back-link"),
    quizTitle: document.getElementById("quiz-title"),
    quizDescription: document.getElementById("quiz-description"),
    groupSummaryPill: document.getElementById("group-summary-pill"),
    timerSummaryPill: document.getElementById("timer-summary-pill"),
    questionSummaryPill: document.getElementById("question-summary-pill"),
    timerDisplay: document.getElementById("timer-display"),
    timerStatus: document.getElementById("timer-status"),
    startTimerBtn: document.getElementById("start-timer-btn"),
    pauseTimerBtn: document.getElementById("pause-timer-btn"),
    roundHeading: document.getElementById("round-heading"),
    nextRoundBtn: document.getElementById("next-round-btn"),
    restartQuizBtn: document.getElementById("restart-quiz-btn"),
    progressList: document.getElementById("progress-list"),
    scoreboard: document.getElementById("scoreboard"),
    roundStatusPill: document.getElementById("round-status-pill"),
    groupBoard: document.getElementById("group-board"),
    toast: document.getElementById("toast"),
    langZhBtn: document.getElementById("lang-zh-btn"),
    langEnBtn: document.getElementById("lang-en-btn"),
  };

  let timerHandle = null;
  let toastHandle = null;
  let state = loadState();

  bindEvents();
  render();

  if (state && !isQuizComplete() && !getCurrentRound().revealed) {
    startTimer();
  }

  function bindEvents() {
    elements.startTimerBtn.addEventListener("click", function () {
      startTimer();
    });

    elements.pauseTimerBtn.addEventListener("click", function () {
      pauseTimer();
    });

    elements.nextRoundBtn.addEventListener("click", function () {
      nextRound();
    });

    elements.restartQuizBtn.addEventListener("click", function () {
      restartQuiz();
    });

    document.addEventListener("click", function (event) {
      const langButton = event.target.closest("[data-lang]");
      if (langButton) {
        setLanguage(langButton.dataset.lang);
        return;
      }

      const roundButton = event.target.closest("[data-view-round-index]");
      if (roundButton) {
        setViewedRound(Number(roundButton.dataset.viewRoundIndex));
        return;
      }

      const answerButton = event.target.closest("[data-group-index][data-option-index]");
      if (!answerButton) {
        return;
      }

      selectAnswer(
        Number(answerButton.dataset.groupIndex),
        Number(answerButton.dataset.optionIndex)
      );
    });
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEYS.quiz);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.rounds) && parsed.rounds.length) {
          return normalizeState(parsed);
        }
      }
    } catch (error) {
      return null;
    }

    try {
      const rawSetup = localStorage.getItem(STORAGE_KEYS.setup);
      if (!rawSetup) {
        return null;
      }

      return createSessionFromSetup(JSON.parse(rawSetup));
    } catch (error) {
      return null;
    }
  }

  function normalizeState(parsed) {
    const language = parsed.language === "en" ? "en" : shared.getSavedLanguage();
    const groupCount = shared.clampNumber(
      parsed.groupCount,
      1,
      shared.getMaxGroups(questionBank.length),
      4
    );
    const groups = normalizeGroups(parsed.groups, groupCount, language);
    const rounds = (Array.isArray(parsed.rounds) ? parsed.rounds : [])
      .map(function (round) {
        return normalizeRound(round, groupCount);
      })
      .filter(Boolean);

    if (!rounds.length) {
      return createSessionFromSetup({
        competitionTitle: parsed.competitionTitle,
        groupCount,
        questionTimer: parsed.questionTimer,
        language,
        groups,
      });
    }

    return {
      competitionTitle: sanitizeText(
        parsed.competitionTitle,
        shared.translate("setup", "defaultCompetitionTitle", language)
      ),
      groupCount,
      questionTimer: shared.clampNumber(parsed.questionTimer, 10, 300, 30),
      language,
      groups,
      rounds,
      currentRoundIndex: shared.clampNumber(parsed.currentRoundIndex, 0, rounds.length, 0),
      viewRoundIndex: normalizeViewRoundIndex(parsed.viewRoundIndex, parsed.currentRoundIndex, rounds.length),
      timeLeft: shared.clampNumber(parsed.timeLeft, 0, parsed.questionTimer || 30, 30),
    };
  }

  function normalizeViewRoundIndex(rawValue, currentRoundIndex, roundCount) {
    if (!roundCount) {
      return 0;
    }

    const latestViewableRoundIndex = Math.min(
      Math.max(0, Number(currentRoundIndex) || 0),
      roundCount - 1
    );

    return shared.clampNumber(rawValue, 0, latestViewableRoundIndex, latestViewableRoundIndex);
  }

  function normalizeRound(round, groupCount) {
    if (!round || !Array.isArray(round.questionIds)) {
      return null;
    }

    const questionIds = round.questionIds.filter(isKnownQuestionId).slice(0, groupCount);
    if (questionIds.length !== groupCount) {
      return null;
    }

    return {
      questionIds,
      revealed: Boolean(round.revealed),
      answers: Array.from({ length: groupCount }, function (_, index) {
        return normalizeAnswer(round.answers && round.answers[index]);
      }),
    };
  }

  function normalizeAnswer(answer) {
    const selectedOptionIndex = getNormalizedOptionIndex(answer && answer.selectedOptionIndex);
    const hasSelection = Number.isInteger(selectedOptionIndex);
    return {
      selectedOptionIndex: hasSelection ? selectedOptionIndex : null,
      submitted: Boolean(answer && (answer.submitted || hasSelection)),
      correct: Boolean(answer && answer.correct),
      timedOut: Boolean(answer && answer.timedOut),
    };
  }

  function getNormalizedOptionIndex(rawValue) {
    if (Number.isInteger(rawValue)) {
      return rawValue;
    }

    if (typeof rawValue === "string") {
      const normalized = rawValue.trim().toUpperCase();
      if (/^[A-Z]$/.test(normalized)) {
        return normalized.charCodeAt(0) - 65;
      }

      const numericValue = Number(normalized);
      if (Number.isInteger(numericValue)) {
        return numericValue;
      }
    }

    return null;
  }

  function createSessionFromSetup(setup) {
    const language = setup.language === "en" ? "en" : shared.getSavedLanguage();
    const groupCount = shared.clampNumber(
      setup.groupCount,
      1,
      shared.getMaxGroups(questionBank.length),
      4
    );
    const questionTimer = shared.clampNumber(setup.questionTimer, 10, 300, 30);
    const groups = normalizeGroups(setup.groups, groupCount, language);
    const questionIds = shared.shuffle(
      questionBank.map(function (question) {
        return question.id;
      })
    );
    const rounds = shared.buildRoundBundles(questionIds, groupCount).map(function (bundle) {
      return {
        questionIds: bundle,
        revealed: false,
        answers: groups.map(function () {
          return createEmptyAnswer();
        }),
      };
    });

    if (!rounds.length) {
      return null;
    }

    return {
      competitionTitle: sanitizeText(
        setup.competitionTitle,
        shared.translate("setup", "defaultCompetitionTitle", language)
      ),
      groupCount,
      questionTimer,
      language,
      groups,
      rounds,
      currentRoundIndex: 0,
      viewRoundIndex: 0,
      timeLeft: questionTimer,
    };
  }

  function normalizeGroups(groups, count, language) {
    const source = Array.isArray(groups) ? groups : [];
    const normalized = [];

    for (let index = 0; index < count; index += 1) {
      const rawName =
        source[index] && typeof source[index].name === "string" ? source[index].name.trim() : "";
      normalized.push({
        name:
          rawName ||
          shared.translate("setup", "defaultGroupName", language, {
            index: index + 1,
          }),
      });
    }

    return normalized;
  }

  function createEmptyAnswer() {
    return {
      selectedOptionIndex: null,
      submitted: false,
      correct: false,
      timedOut: false,
    };
  }

  function persistState() {
    if (!state) {
      return;
    }

    localStorage.setItem(STORAGE_KEYS.quiz, JSON.stringify(state));
  }

  function persistAndRender() {
    persistState();
    render();
  }

  function render() {
    const language = state ? state.language : shared.getSavedLanguage();

    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.title = shared.translate("quiz", "pageTitle", language);

    setText("back-link", shared.translate("quiz", "backLink", language));
    setText("quiz-kicker", shared.translate("quiz", "heroKicker", language));
    setText("timer-kicker", shared.translate("quiz", "timerKicker", language));
    setText("round-kicker", shared.translate("quiz", "roundKicker", language));
    setText("board-kicker", shared.translate("quiz", "boardKicker", language));
    setText("board-heading", shared.translate("quiz", "boardHeading", language));
    setText("scoreboard-kicker", shared.translate("quiz", "scoreboardKicker", language));
    setText("scoreboard-heading", shared.translate("quiz", "scoreboardTitle", language));
    setText("scoreboard-rule", shared.translate("quiz", "scoreboardRule", language));
    setText("start-timer-btn", shared.translate("quiz", "startTimer", language));
    setText("pause-timer-btn", shared.translate("quiz", "pauseTimer", language));
    setText("next-round-btn", shared.translate("quiz", "nextRound", language));
    setText("restart-quiz-btn", shared.translate("quiz", "restartQuiz", language));

    renderLanguageButtons(language);

    if (!state) {
      renderMissingState(language);
      return;
    }

    const totalQuestions = state.rounds.length * state.groupCount;

    elements.quizTitle.textContent = state.competitionTitle;
    elements.quizDescription.textContent = shared.translate("quiz", "heroText", language);
    elements.groupSummaryPill.textContent = shared.translate("quiz", "groupSummary", language, {
      count: state.groupCount,
    });
    elements.timerSummaryPill.textContent = shared.translate("quiz", "timerSummary", language, {
      seconds: state.questionTimer,
    });
    elements.questionSummaryPill.textContent = shared.translate(
      "quiz",
      "questionSummary",
      language,
      {
        rounds: state.rounds.length,
        questions: totalQuestions,
      }
    );

    renderProgress(language);
    renderScoreboard(language);
    renderTimer(language);
    renderRoundHeader(language);
    renderBoard(language);
    renderButtons();
  }

  function renderMissingState(language) {
    elements.quizTitle.textContent = shared.translate("quiz", "missingTitle", language);
    elements.quizDescription.textContent = shared.translate("quiz", "missingText", language);
    elements.groupSummaryPill.textContent = shared.translate("quiz", "groupSummary", language, {
      count: 0,
    });
    elements.timerSummaryPill.textContent = shared.translate("quiz", "timerSummary", language, {
      seconds: 0,
    });
    elements.questionSummaryPill.textContent = shared.translate(
      "quiz",
      "questionSummary",
      language,
      {
        rounds: 0,
        questions: 0,
      }
    );
    elements.roundHeading.textContent = shared.translate("quiz", "missingBoardTitle", language);
    elements.progressList.innerHTML = "";
    elements.scoreboard.innerHTML = "";
    elements.timerDisplay.textContent = "00:00";
    elements.timerStatus.textContent = shared.translate("quiz", "timerWaiting", language);
    elements.roundStatusPill.textContent = shared.translate("quiz", "boardStatusComplete", language);
    elements.groupBoard.innerHTML =
      '<div class="empty-card"><div><p class="kicker">' +
      shared.escapeHtml(shared.translate("quiz", "missingTitle", language)) +
      "</p><h3>" +
      shared.escapeHtml(shared.translate("quiz", "missingBoardTitle", language)) +
      "</h3><p>" +
      shared.escapeHtml(shared.translate("quiz", "missingBoardText", language)) +
      "</p></div></div>";
    elements.startTimerBtn.disabled = true;
    elements.pauseTimerBtn.disabled = true;
    elements.nextRoundBtn.disabled = true;
    elements.restartQuizBtn.disabled = true;
  }

  function renderTimer(language) {
    elements.timerDisplay.textContent = shared.formatTime(state.timeLeft);

    if (isQuizComplete()) {
      elements.timerStatus.textContent = shared.translate("quiz", "timerComplete", language);
      return;
    }

    const currentRound = getCurrentRound();
    if (currentRound.revealed) {
      const hasTimeout = currentRound.answers.some(function (answer) {
        return answer.timedOut;
      });
      elements.timerStatus.textContent = hasTimeout
        ? shared.translate("quiz", "timerTimeout", language)
        : shared.translate("quiz", "timerAnswered", language);
      return;
    }

    elements.timerStatus.textContent = timerHandle
      ? shared.translate("quiz", "timerRunning", language)
      : shared.translate("quiz", "timerPaused", language);
  }

  function renderProgress(language) {
    const viewedRoundIndex = getViewedRoundIndex();
    elements.progressList.innerHTML = state.rounds
      .map(function (_, index) {
        let label = shared.translate("quiz", "progressPending", language);
        let pillClass = "pending";
        let cardClass = "";
        const isViewable = isRoundViewable(index);

        if (index < state.currentRoundIndex) {
          label = shared.translate("quiz", "progressDone", language);
          pillClass = "done";
          cardClass = " answered";
        } else if (index === state.currentRoundIndex && !isQuizComplete()) {
          label = shared.translate("quiz", "progressCurrent", language);
          pillClass = "current";
          cardClass = " current";
        }

        if (index === viewedRoundIndex) {
          cardClass += " viewing";
        }

        if (!isViewable) {
          cardClass += " locked";
        }

        return (
          '<button type="button" class="progress-card' +
          cardClass +
          '" data-view-round-index="' +
          index +
          '"' +
          (isViewable ? "" : " disabled") +
          ">" +
          "<div><strong>" +
          shared.escapeHtml(
            shared.translate("quiz", "roundCardTitle", language, {
              current: index + 1,
            })
          ) +
          "</strong></div>" +
          '<span class="progress-pill ' +
          pillClass +
          '">' +
          shared.escapeHtml(label) +
          "</span>" +
          "</button>"
        );
      })
      .join("");
  }

  function renderScoreboard(language) {
    const standings = calculateStandings();

    elements.scoreboard.innerHTML = standings
      .map(function (entry, index) {
        return (
          '<article class="score-card">' +
          '<div class="score-card-top">' +
          '<span class="score-rank">' +
          shared.escapeHtml(
            shared.translate("setup", "groupShort", language, {
              index: entry.groupIndex + 1,
            })
          ) +
          "</span>" +
          '<h3 class="score-group-name">' +
          shared.escapeHtml(entry.group.name) +
          "</h3>" +
          "</div>" +
          '<p class="score-rank-meta">' +
          shared.escapeHtml(
            shared.translate("quiz", "scoreRankLabel", language, {
              rank: entry.rank,
            })
          ) +
          "</p>" +
          '<p class="score-label">' +
          shared.escapeHtml(shared.translate("quiz", "scoreTotalLabel", language)) +
          "</p>" +
          '<div class="score-value">' +
          shared.escapeHtml(
            shared.translate("quiz", "scoreUnit", language, { score: entry.totalScore })
          ) +
          "</div>" +
          '<p class="score-meta">' +
          shared.escapeHtml(
            shared.translate("quiz", "scoreCorrectCount", language, {
              count: entry.correctCount,
            })
          ) +
          "</p>" +
          '<p class="score-meta">' +
          shared.escapeHtml(
            shared.translate("quiz", "scoreAnsweredCount", language, {
              count: entry.completedRounds,
            })
          ) +
          "</p>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderRoundHeader(language) {
    const viewedRoundIndex = getViewedRoundIndex();
    const viewedRound = getViewedRound();
    if (!viewedRound) {
      elements.roundHeading.textContent = shared.translate("quiz", "finishTitle", language);
      elements.roundStatusPill.textContent = shared.translate(
        "quiz",
        "boardStatusComplete",
        language
      );
      return;
    }

    elements.roundHeading.textContent = shared.translate("quiz", "roundHeading", language, {
      current: viewedRoundIndex + 1,
      total: state.rounds.length,
    });

    if (isQuizComplete()) {
      elements.roundStatusPill.textContent = shared.translate(
        "quiz",
        "boardStatusComplete",
        language
      );
      return;
    }

    elements.roundStatusPill.textContent =
      viewedRound.revealed || viewedRoundIndex < state.currentRoundIndex
        ? shared.translate("quiz", "boardStatusRevealed", language)
        : shared.translate("quiz", "boardStatusLive", language);
  }

  function renderBoard(language) {
    const viewedRound = getViewedRound();
    if (!viewedRound) {
      elements.groupBoard.innerHTML =
        '<div class="finish-card"><div><p class="kicker">' +
        shared.escapeHtml(shared.translate("quiz", "finishKicker", language)) +
        "</p><h3>" +
        shared.escapeHtml(shared.translate("quiz", "finishTitle", language)) +
        "</h3><p>" +
        shared.escapeHtml(shared.translate("quiz", "finishText", language)) +
        "</p></div></div>";
      return;
    }

    const viewedRoundIndex = getViewedRoundIndex();
    const isInteractiveRound = viewedRoundIndex === state.currentRoundIndex && !isQuizComplete();
    elements.groupBoard.innerHTML = state.groups
      .map(function (group, groupIndex) {
        const question = getLocalizedQuestion(viewedRound.questionIds[groupIndex], language);
        const answer = viewedRound.answers[groupIndex];

        return (
          '<article class="board-row">' +
          '<div class="board-cell board-group-cell">' +
          '<div class="group-label-row">' +
          '<span class="group-badge">' +
          shared.escapeHtml(
            shared.translate("setup", "groupShort", language, { index: groupIndex + 1 })
          ) +
          "</span>" +
          '<h3 class="group-name">' +
          shared.escapeHtml(group.name) +
          "</h3>" +
          "</div>" +
          "</div>" +
          renderQuestionBody(
            question,
            answer,
            viewedRound.revealed,
            language,
            groupIndex,
            isInteractiveRound
          ) +
          "</article>"
        );
      })
      .join("");
  }

  function renderQuestionBody(
    question,
    answer,
    roundRevealed,
    language,
    groupIndex,
    isInteractiveRound
  ) {
    const answerResolved = isAnswerResolved(answer, roundRevealed);
    const optionTextMarkup = question.options
      .map(function (option, optionIndex) {
        const optionState = getOptionState(answer, optionIndex, question.answerIndex, answerResolved);
        const optionClasses = ["board-option-text"];

        if (optionState.isSelected) {
          optionClasses.push("selected");
        }

        if (optionState.isCorrect) {
          optionClasses.push("correct");
        } else if (optionState.isWrongSelected) {
          optionClasses.push("incorrect");
        }

        return (
          '<div class="' +
          optionClasses.join(" ") +
          '">' +
          "<strong>" +
          String.fromCharCode(65 + optionIndex) +
          ".</strong> " +
          shared.escapeHtml(option) +
          "</div>"
        );
      })
      .join("");

    const answerButtonsMarkup = question.options
      .map(function (option, optionIndex) {
        const optionState = getOptionState(answer, optionIndex, question.answerIndex, answerResolved);
        const classes = ["board-answer-btn"];

        if (optionState.isSelected) {
          classes.push("selected");
        }

        if (optionState.isCorrect) {
          classes.push("correct");
        } else if (optionState.isWrongSelected) {
          classes.push("incorrect");
        }

        const disableButton = answerResolved || !isInteractiveRound;
        const buttonLabel =
          answerResolved && answer.selectedOptionIndex === optionIndex
            ? shared.translate("quiz", "optionSubmitted", language)
            : shared.translate("quiz", "optionSelect", language);

        return (
          '<button type="button" class="' +
          classes.join(" ") +
          '" data-group-index="' +
          groupIndex +
          '" data-option-index="' +
          optionIndex +
          '"' +
          (disableButton ? " disabled" : "") +
          ' aria-label="' +
          shared.escapeHtml(buttonLabel + " " + String.fromCharCode(65 + optionIndex)) +
          ">" +
          '<span class="board-answer-letter">' +
          String.fromCharCode(65 + optionIndex) +
          "</span>" +
          "</button>"
        );
      })
      .join("");

    const answerDetailText = answer.timedOut
      ? shared.translate("quiz", "unansweredReveal", language)
      : question.explanation;
    const scriptureBlock = question.scripture
      ? "<p><strong>" +
        shared.escapeHtml(shared.translate("common", "scripture", language)) +
        ":</strong> " +
        shared.escapeHtml(question.scripture) +
        "</p>"
      : "";

    const answerPanel = answerResolved
      ? '<div class="answer-panel ' +
        getAnswerPanelClass(answer) +
        '">' +
        '<p class="kicker">' +
        shared.escapeHtml(shared.translate("common", "answer", language)) +
        "</p>" +
        "<h4>" +
        shared.escapeHtml(question.options[question.answerIndex]) +
        "</h4>" +
        scriptureBlock +
        "<p><strong>" +
        shared.escapeHtml(shared.translate("common", "source", language)) +
        ":</strong> " +
        shared.escapeHtml(question.reference) +
        "</p>" +
        "<p>" +
        shared.escapeHtml(answerDetailText) +
        "</p>" +
        "</div>"
      : "";

    return (
      '<div class="board-cell board-question-cell">' +
      '<div class="question-topline">' +
      '<span class="question-chip">' +
      shared.escapeHtml(question.testament) +
      "</span>" +
      '<span class="question-chip">' +
      shared.escapeHtml(question.book) +
      "</span>" +
      '<span class="question-chip">' +
      shared.escapeHtml(question.difficulty) +
      "</span>" +
      "</div>" +
      '<p class="board-question-prompt">' +
      '<span class="board-question-label">' +
      shared.escapeHtml(language === "zh" ? "题目：" : "Question:") +
      "</span>" +
      shared.escapeHtml(question.prompt) +
      "</p>" +
      '<div class="board-option-texts">' +
      optionTextMarkup +
      "</div>" +
      answerPanel +
      "</div>" +
      '<div class="board-cell board-answer-cell">' +
      '<div class="board-answer-grid">' +
      answerButtonsMarkup +
      "</div>" +
      "</div>"
    );
  }

  function renderButtons() {
    if (!state) {
      return;
    }

    const currentRound = isQuizComplete() ? null : getCurrentRound();
    elements.startTimerBtn.disabled =
      !currentRound || currentRound.revealed || state.timeLeft <= 0 || Boolean(timerHandle);
    elements.pauseTimerBtn.disabled = !timerHandle;
    elements.nextRoundBtn.disabled = !currentRound || !currentRound.revealed;
    elements.restartQuizBtn.disabled = false;
  }

  function calculateStandings() {
    const standings = state.groups.map(function (group, groupIndex) {
      let totalScore = 0;
      let correctCount = 0;
      let completedRounds = 0;

      state.rounds.forEach(function (round) {
        const answer = round.answers[groupIndex];
        if (!answer) {
          return;
        }

        if (answer.submitted || answer.timedOut || round.revealed) {
          completedRounds += 1;
        }

        if (answer.correct) {
          totalScore += 1;
          correctCount += 1;
        }
      });

      return {
        group,
        groupIndex,
        totalScore,
        correctCount,
        completedRounds,
      };
    });

    standings.sort(function (left, right) {
      if (right.totalScore !== left.totalScore) {
        return right.totalScore - left.totalScore;
      }

      return left.groupIndex - right.groupIndex;
    });

    standings.forEach(function (entry, index) {
      if (index > 0 && entry.totalScore === standings[index - 1].totalScore) {
        entry.rank = standings[index - 1].rank;
        return;
      }

      entry.rank = index + 1;
    });

    return standings;
  }

  function selectAnswer(groupIndex, optionIndex) {
    if (!state || isQuizComplete()) {
      return;
    }

    if (getViewedRoundIndex() !== state.currentRoundIndex) {
      return;
    }

    const currentRound = getCurrentRound();
    if (currentRound.revealed) {
      return;
    }

    const question = getQuestionById(currentRound.questionIds[groupIndex]);
    const answer = currentRound.answers[groupIndex];
    if (!question || !answer || answer.submitted || answer.timedOut || !Number.isInteger(optionIndex)) {
      return;
    }

    answer.selectedOptionIndex = optionIndex;
    answer.submitted = true;
    answer.correct = optionIndex === question.answerIndex;
    answer.timedOut = false;
    persistAndRender();

    if (areAllGroupsSubmitted(currentRound)) {
      revealCurrentRound("allAnswered");
      return;
    }

    showToast(
      shared.translate("quiz", "toastAnswered", state.language, {
        group: state.groups[groupIndex].name,
      })
    );
  }

  function areAllGroupsSubmitted(round) {
    return round.answers.every(function (answer) {
      return answer.submitted || answer.timedOut;
    });
  }

  function startTimer() {
    if (!state || isQuizComplete()) {
      return;
    }

    const currentRound = getCurrentRound();
    if (timerHandle || currentRound.revealed || state.timeLeft <= 0) {
      return;
    }

    timerHandle = window.setInterval(function () {
      if (state.timeLeft <= 1) {
        state.timeLeft = 0;
        stopTimer();
        revealCurrentRound("timeout");
        return;
      }

      state.timeLeft -= 1;
      persistState();
      renderTimer(state.language);
      renderButtons();
    }, 1000);

    renderTimer(state.language);
    renderButtons();
  }

  function pauseTimer() {
    if (!timerHandle) {
      return;
    }

    stopTimer();
    renderTimer(state.language);
    renderButtons();
  }

  function stopTimer() {
    if (timerHandle) {
      window.clearInterval(timerHandle);
      timerHandle = null;
    }
  }

  function revealCurrentRound(reason) {
    const currentRound = getCurrentRound();
    if (!currentRound || currentRound.revealed) {
      return;
    }

    currentRound.answers.forEach(function (answer, index) {
      if (!answer.submitted) {
        answer.timedOut = true;
        answer.correct = false;
        answer.selectedOptionIndex = null;
      } else if (Number.isInteger(answer.selectedOptionIndex)) {
        const question = getQuestionById(currentRound.questionIds[index]);
        answer.correct = answer.selectedOptionIndex === question.answerIndex;
      }
    });

    currentRound.revealed = true;
    stopTimer();
    persistAndRender();

    if (reason === "allAnswered") {
      showToast(shared.translate("quiz", "toastAllAnswered", state.language));
    } else if (reason === "timeout") {
      showToast(shared.translate("quiz", "toastTimeout", state.language));
    }
  }

  function nextRound() {
    if (!state || isQuizComplete()) {
      return;
    }

    const currentRound = getCurrentRound();
    if (!currentRound.revealed) {
      return;
    }

    stopTimer();

    if (state.currentRoundIndex >= state.rounds.length - 1) {
      state.currentRoundIndex = state.rounds.length;
      state.viewRoundIndex = state.rounds.length - 1;
      state.timeLeft = 0;
      persistAndRender();
      return;
    }

    state.currentRoundIndex += 1;
    state.viewRoundIndex = state.currentRoundIndex;
    state.timeLeft = state.questionTimer;
    persistAndRender();
    startTimer();
  }

  function restartQuiz() {
    if (!state) {
      return;
    }

    stopTimer();
    const refreshed = createSessionFromSetup({
      competitionTitle: state.competitionTitle,
      groupCount: state.groupCount,
      questionTimer: state.questionTimer,
      language: state.language,
      groups: state.groups,
    });

    if (!refreshed) {
      return;
    }

    state = refreshed;
    persistAndRender();
    startTimer();
    showToast(shared.translate("quiz", "toastRestarted", state.language));
  }

  function setLanguage(language) {
    const nextLanguage = language === "en" ? "en" : "zh";
    shared.setSavedLanguage(nextLanguage);

    if (!state) {
      renderMissingState(nextLanguage);
      renderLanguageButtons(nextLanguage);
      document.documentElement.lang = nextLanguage === "zh" ? "zh-CN" : "en";
      document.title = shared.translate("quiz", "pageTitle", nextLanguage);
      return;
    }

    state.language = nextLanguage;
    persistAndRender();
  }

  function renderLanguageButtons(language) {
    elements.langZhBtn.classList.toggle("active", language === "zh");
    elements.langEnBtn.classList.toggle("active", language === "en");
  }

  function setViewedRound(roundIndex) {
    if (!state || !isRoundViewable(roundIndex)) {
      return;
    }

    state.viewRoundIndex = roundIndex;
    persistAndRender();
  }

  function getCurrentRound() {
    if (!state || isQuizComplete()) {
      return null;
    }

    return state.rounds[state.currentRoundIndex] || null;
  }

  function getViewedRoundIndex() {
    if (!state || !state.rounds.length) {
      return 0;
    }

    return shared.clampNumber(
      state.viewRoundIndex,
      0,
      getLatestViewableRoundIndex(),
      getLatestViewableRoundIndex()
    );
  }

  function getViewedRound() {
    if (!state || !state.rounds.length) {
      return null;
    }

    return state.rounds[getViewedRoundIndex()] || null;
  }

  function getLatestViewableRoundIndex() {
    if (!state || !state.rounds.length) {
      return 0;
    }

    return isQuizComplete() ? state.rounds.length - 1 : state.currentRoundIndex;
  }

  function isRoundViewable(roundIndex) {
    return (
      Number.isInteger(roundIndex) &&
      Boolean(state) &&
      roundIndex >= 0 &&
      roundIndex <= getLatestViewableRoundIndex()
    );
  }

  function getLocalizedQuestion(questionId, language) {
    const question = getQuestionById(questionId);
    return question ? shared.localizeQuestion(question, language) : null;
  }

  function getQuestionById(questionId) {
    return (
      questionBank.find(function (question) {
        return question.id === questionId;
      }) || null
    );
  }

  function getGroupStatus(answer, revealed, language) {
    if (revealed) {
      if (answer.timedOut) {
        return {
          label: shared.translate("quiz", "statusTimedOut", language),
          className: "timed-out",
        };
      }

      if (answer.correct) {
        return {
          label: shared.translate("quiz", "statusCorrect", language),
          className: "correct",
        };
      }

      return {
        label: shared.translate("quiz", "statusIncorrect", language),
        className: "incorrect",
      };
    }

    if (answer.submitted) {
      return {
        label: shared.translate("quiz", "statusSubmitted", language),
        className: "submitted",
      };
    }

    return {
      label: shared.translate("quiz", "statusPending", language),
      className: "pending",
    };
  }

  function isAnswerResolved(answer, roundRevealed) {
    return Boolean(roundRevealed || answer.submitted || answer.timedOut);
  }

  function getOptionState(answer, optionIndex, answerIndex, answerResolved) {
    const isSelected = answer.selectedOptionIndex === optionIndex;
    return {
      isSelected,
      isCorrect: answerResolved && optionIndex === answerIndex,
      isWrongSelected: answerResolved && isSelected && optionIndex !== answerIndex,
    };
  }

  function getAnswerPanelClass(answer) {
    if (answer.timedOut) {
      return "timed-out";
    }

    return answer.correct ? "correct" : "incorrect";
  }

  function isQuizComplete() {
    return !state || state.currentRoundIndex >= state.rounds.length;
  }

  function isKnownQuestionId(id) {
    return questionBank.some(function (question) {
      return question.id === id;
    });
  }

  function sanitizeText(value, fallback) {
    if (typeof value !== "string") {
      return fallback;
    }

    const trimmed = value.trim();
    return trimmed || fallback;
  }

  function setText(id, value) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    }
  }

  function showToast(message) {
    window.clearTimeout(toastHandle);
    elements.toast.textContent = message;
    elements.toast.classList.add("visible");
    toastHandle = window.setTimeout(function () {
      elements.toast.classList.remove("visible");
    }, 2400);
  }
})();
