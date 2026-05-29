(function () {
  const shared = window.APP_SHARED;
  const STORAGE_KEYS = shared.STORAGE_KEYS;
  const questionBank = shared.getQuestionBank();
  const MAX_GROUPS = shared.getMaxGroups(questionBank.length);
  const MIN_GROUPS = 1;

  const elements = {
    setupForm: document.getElementById("setup-form"),
    competitionTitle: document.getElementById("competition-title"),
    groupCount: document.getElementById("group-count"),
    questionTimer: document.getElementById("question-timer"),
    groupFields: document.getElementById("group-fields"),
    questionCountBadge: document.getElementById("question-count-badge"),
    uniqueModeBadge: document.getElementById("unique-mode-badge"),
    simultaneousModeBadge: document.getElementById("simultaneous-mode-badge"),
    questionBankCount: document.getElementById("question-bank-count"),
    questionBankText: document.getElementById("question-bank-text"),
    capacityHint: document.getElementById("capacity-hint"),
    toast: document.getElementById("toast"),
    langZhBtn: document.getElementById("lang-zh-btn"),
    langEnBtn: document.getElementById("lang-en-btn"),
  };

  let toastHandle = null;
  let state = loadSetup();

  bindEvents();
  render();

  function bindEvents() {
    elements.competitionTitle.addEventListener("input", function (event) {
      state.competitionTitle = event.target.value;
      persistState();
    });

    elements.groupCount.addEventListener("change", function (event) {
      const nextCount = shared.clampNumber(event.target.value, MIN_GROUPS, MAX_GROUPS, 4);
      resizeGroups(nextCount);
      state.groupCount = nextCount;
      persistAndRender();
    });

    elements.questionTimer.addEventListener("change", function (event) {
      state.questionTimer = shared.clampNumber(event.target.value, 10, 300, 30);
      persistAndRender();
    });

    elements.groupFields.addEventListener("input", function (event) {
      const input = event.target.closest("[data-group-index]");
      if (!input) {
        return;
      }

      const index = Number(input.dataset.groupIndex);
      if (!Number.isInteger(index) || !state.groups[index]) {
        return;
      }

      state.groups[index].name = input.value;
      persistState();
    });

    document.addEventListener("click", function (event) {
      const button = event.target.closest("[data-lang]");
      if (!button) {
        return;
      }

      setLanguage(button.dataset.lang);
    });

    elements.setupForm.addEventListener("submit", function (event) {
      event.preventDefault();
      startQuiz();
    });
  }

  function loadSetup() {
    const language = shared.getSavedLanguage();
    const defaultState = createDefaultState(language);

    try {
      const raw = localStorage.getItem(STORAGE_KEYS.setup);
      if (!raw) {
        return defaultState;
      }

      const parsed = JSON.parse(raw);
      const groupCount = shared.clampNumber(
        parsed.groupCount,
        MIN_GROUPS,
        MAX_GROUPS,
        defaultState.groupCount
      );

      return {
        competitionTitle:
          typeof parsed.competitionTitle === "string"
            ? parsed.competitionTitle
            : defaultState.competitionTitle,
        groupCount,
        questionTimer: shared.clampNumber(
          parsed.questionTimer,
          10,
          300,
          defaultState.questionTimer
        ),
        language: parsed.language === "en" ? "en" : language,
        groups: normalizeGroups(parsed.groups, groupCount, parsed.language === "en" ? "en" : language),
      };
    } catch (error) {
      return defaultState;
    }
  }

  function createDefaultState(language) {
    return {
      competitionTitle: shared.translate("setup", "defaultCompetitionTitle", language),
      groupCount: Math.min(4, MAX_GROUPS),
      questionTimer: 30,
      language,
      groups: createGroupList(Math.min(4, MAX_GROUPS), language),
    };
  }

  function createGroupList(count, language) {
    return Array.from({ length: count }, function (_, index) {
      return {
        name: shared.translate("setup", "defaultGroupName", language, {
          index: index + 1,
        }),
      };
    });
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

  function resizeGroups(nextCount) {
    const resized = state.groups.slice(0, nextCount);

    while (resized.length < nextCount) {
      resized.push({
        name: shared.translate("setup", "defaultGroupName", state.language, {
          index: resized.length + 1,
        }),
      });
    }

    state.groups = resized;
  }

  function persistState() {
    localStorage.setItem(
      STORAGE_KEYS.setup,
      JSON.stringify({
        competitionTitle: state.competitionTitle,
        groupCount: state.groupCount,
        questionTimer: state.questionTimer,
        language: state.language,
        groups: state.groups.map(function (group, index) {
          return {
            name: getGroupName(group, index),
          };
        }),
      })
    );
  }

  function persistAndRender() {
    persistState();
    render();
  }

  function render() {
    const language = state.language;
    const questionCount = questionBank.length;
    const availableRounds = Math.floor(questionCount / state.groupCount);

    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.title = shared.translate("setup", "pageTitle", language);

    setText("hero-heading", shared.translate("setup", "heroTitle", language));
    setText("hero-text", shared.translate("setup", "heroText", language));
    setText(
      "question-count-badge",
      shared.translate("setup", "readyBadge", language, { count: questionCount })
    );
    setText("unique-mode-badge", shared.translate("setup", "uniqueBadge", language));
    setText(
      "simultaneous-mode-badge",
      shared.translate("setup", "simultaneousBadge", language)
    );
    setText("flow-kicker", shared.translate("setup", "flowKicker", language));
    setText("flow-title", shared.translate("setup", "flowTitle", language));
    setText("flow-text", shared.translate("setup", "flowText", language));
    setText("setup-kicker", shared.translate("setup", "setupKicker", language));
    setText("setup-title", shared.translate("setup", "setupTitle", language));
    setText("competition-title-label", shared.translate("setup", "titleLabel", language));
    setText("group-count-label", shared.translate("setup", "groupCountLabel", language));
    setText("question-timer-label", shared.translate("setup", "timerLabel", language));
    setText(
      "capacity-hint",
      shared.translate("setup", "capacityHint", language, {
        rounds: availableRounds,
        groups: state.groupCount,
      })
    );
    setText("group-kicker", shared.translate("setup", "groupKicker", language));
    setText("group-title", shared.translate("setup", "groupTitle", language));
    setText("group-support", shared.translate("setup", "groupSupport", language));
    setText("start-quiz-btn", shared.translate("setup", "startButton", language));
    setText("preview-kicker", shared.translate("setup", "previewKicker", language));
    setText("preview-title", shared.translate("setup", "previewTitle", language));
    setText("preview-step1-title", shared.translate("setup", "previewStep1Title", language));
    setText("preview-step1-text", shared.translate("setup", "previewStep1Text", language));
    setText("preview-step2-title", shared.translate("setup", "previewStep2Title", language));
    setText("preview-step2-text", shared.translate("setup", "previewStep2Text", language));
    setText("preview-step3-title", shared.translate("setup", "previewStep3Title", language));
    setText("preview-step3-text", shared.translate("setup", "previewStep3Text", language));
    setText("bank-kicker", shared.translate("setup", "bankKicker", language));
    setText(
      "question-bank-count",
      shared.translate("setup", "bankTitle", language, { count: questionCount })
    );
    setText("question-bank-text", shared.translate("setup", "bankText", language));

    elements.competitionTitle.value = state.competitionTitle;
    elements.competitionTitle.placeholder = shared.translate(
      "setup",
      "titlePlaceholder",
      language
    );
    elements.groupCount.max = String(MAX_GROUPS);
    elements.groupCount.value = state.groupCount;
    elements.questionTimer.value = state.questionTimer;

    elements.groupFields.innerHTML = state.groups
      .map(function (group, index) {
        return (
          '<div class="group-input-row">' +
          '<span class="group-number">' +
          shared.escapeHtml(
            shared.translate("setup", "groupShort", language, { index: index + 1 })
          ) +
          "</span>" +
          "<label>" +
          shared.escapeHtml(
            shared.translate("setup", "groupLabel", language, { index: index + 1 })
          ) +
          '<input type="text" data-group-index="' +
          index +
          '" maxlength="28" value="' +
          shared.escapeHtml(getGroupName(group, index)) +
          '" />' +
          "</label>" +
          "</div>"
        );
      })
      .join("");

    renderLanguageButtons();
  }

  function startQuiz() {
    const questionIds = shared.shuffle(
      questionBank.map(function (question) {
        return question.id;
      })
    );
    const roundBundles = shared.buildRoundBundles(questionIds, state.groupCount);

    if (!roundBundles.length) {
      showToast(shared.translate("setup", "insufficientQuestions", state.language));
      return;
    }

    persistState();
    localStorage.setItem(
      STORAGE_KEYS.quiz,
      JSON.stringify({
        competitionTitle: getCompetitionTitle(),
        groupCount: state.groupCount,
        questionTimer: state.questionTimer,
        language: state.language,
        groups: state.groups.map(function (group, index) {
          return { name: getGroupName(group, index) };
        }),
        rounds: roundBundles.map(function (bundle) {
          return {
            questionIds: bundle,
            revealed: false,
            answers: state.groups.map(function () {
              return createEmptyAnswer();
            }),
          };
        }),
        currentRoundIndex: 0,
        timeLeft: state.questionTimer,
      })
    );

    window.location.href = "quiz.html";
  }

  function createEmptyAnswer() {
    return {
      selectedOptionIndex: null,
      submitted: false,
      correct: false,
      timedOut: false,
    };
  }

  function setLanguage(language) {
    const nextLanguage = language === "en" ? "en" : "zh";
    if (state.language === nextLanguage) {
      return;
    }

    state.language = nextLanguage;
    shared.setSavedLanguage(nextLanguage);
    persistAndRender();
  }

  function renderLanguageButtons() {
    elements.langZhBtn.classList.toggle("active", state.language === "zh");
    elements.langEnBtn.classList.toggle("active", state.language === "en");
  }

  function getCompetitionTitle() {
    return state.competitionTitle.trim()
      || shared.translate("setup", "defaultCompetitionTitle", state.language);
  }

  function getGroupName(group, index) {
    return group.name.trim()
      || shared.translate("setup", "defaultGroupName", state.language, {
        index: index + 1,
      });
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
