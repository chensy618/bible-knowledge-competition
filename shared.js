(function () {
  const STORAGE_KEYS = {
    setup: "bible-knowledge-competition-setup-v3",
    quiz: "bible-knowledge-competition-quiz-v3",
    language: "bible-knowledge-competition-language-v1",
  };
  const DEFAULT_LANGUAGE = "zh";
  const MAX_GROUPS = 8;

  const UI_TEXT = {
    common: {
      appName: {
        zh: "圣经知识竞赛",
        en: "Bible Knowledge Competition",
      },
      languageZh: {
        zh: "中文",
        en: "中文",
      },
      languageEn: {
        zh: "English",
        en: "English",
      },
      reference: {
        zh: "经文",
        en: "Reference",
      },
      scripture: {
        zh: "经文内容",
        en: "Scripture",
      },
      source: {
        zh: "出处",
        en: "Reference",
      },
      answer: {
        zh: "答案",
        en: "Answer",
      },
    },
    setup: {
      pageTitle: {
        zh: "圣经知识竞赛设置",
        en: "Bible Knowledge Competition Setup",
      },
      heroKicker: {
        zh: "圣经知识竞赛",
        en: "Bible Knowledge Competition",
      },
      heroTitle: {
        zh: "圣经知识竞赛",
        en: "Bible Knowledge Competition",
      },
      heroText: {
        zh: "设置标题、组数、每题时间和组名。",
        en: "Set the title, groups, timer, and group names.",
      },
      readyBadge: {
        zh: "{count} 题",
        en: "{count} questions",
      },
      uniqueBadge: {
        zh: "每组不同题",
        en: "Different question per group",
      },
      simultaneousBadge: {
        zh: "同步答题",
        en: "Simultaneous answering",
      },
      flowKicker: {
        zh: "答题规则",
        en: "Quiz Flow",
      },
      flowTitle: {
        zh: "设置后直接进入答题页",
        en: "Enter the quiz page after setup.",
      },
      flowText: {
        zh: "同轮同计时，每组不同题。",
        en: "One timer per round, different question per group.",
      },
      setupKicker: {
        zh: "比赛设置",
        en: "Setup",
      },
      setupTitle: {
        zh: "基本信息",
        en: "Basics",
      },
      titleLabel: {
        zh: "比赛标题",
        en: "Competition title",
      },
      titlePlaceholder: {
        zh: "请输入比赛标题",
        en: "Enter a competition title",
      },
      groupCountLabel: {
        zh: "分组数量",
        en: "Number of groups",
      },
      timerLabel: {
        zh: "每题计时（秒）",
        en: "Timer per question (seconds)",
      },
      capacityHint: {
        zh: "支持 {rounds} 轮，{groups} 组同时答题。",
        en: "Supports {rounds} rounds with {groups} groups.",
      },
      groupKicker: {
        zh: "小组",
        en: "Groups",
      },
      groupTitle: {
        zh: "填写组名",
        en: "Group names",
      },
      groupSupport: {
        zh: "会显示在答题页。",
        en: "Shown on the quiz page.",
      },
      startButton: {
        zh: "开始答题",
        en: "Start Quiz",
      },
      previewKicker: {
        zh: "答题说明",
        en: "Overview",
      },
      previewTitle: {
        zh: "进入答题页后",
        en: "After launch",
      },
      previewStep1Title: {
        zh: "先分组",
        en: "Set groups",
      },
      previewStep1Text: {
        zh: "本场沿用同一组名。",
        en: "The same group names are used for the whole session.",
      },
      previewStep2Title: {
        zh: "统一计时",
        en: "Shared timer",
      },
      previewStep2Text: {
        zh: "每轮共用一个倒计时。",
        en: "Each round uses one timer for all groups.",
      },
      previewStep3Title: {
        zh: "每组不同题",
        en: "Different questions",
      },
      previewStep3Text: {
        zh: "同轮题目不重复。",
        en: "No repeated questions in the same round.",
      },
      bankKicker: {
        zh: "题库",
        en: "Question Bank",
      },
      bankTitle: {
        zh: "已载入 {count} 题",
        en: "{count} questions loaded",
      },
      bankText: {
        zh: "默认中文，可切换英文。",
        en: "Chinese by default. English is available.",
      },
      groupLabel: {
        zh: "第 {index} 组",
        en: "Group {index}",
      },
      groupShort: {
        zh: "组 {index}",
        en: "G{index}",
      },
      defaultCompetitionTitle: {
        zh: "圣经知识竞赛",
        en: "Bible Knowledge Competition",
      },
      defaultGroupName: {
        zh: "第 {index} 组",
        en: "Group {index}",
      },
      insufficientQuestions: {
        zh: "当前题库不足以支撑至少一轮，请减少分组数量。",
        en: "The current question bank cannot support even one full round. Reduce the group count.",
      },
    },
    quiz: {
      pageTitle: {
        zh: "圣经知识竞赛答题页",
        en: "Bible Knowledge Competition Quiz",
      },
      backLink: {
        zh: "返回设置页",
        en: "Back to setup",
      },
      heroKicker: {
        zh: "同步答题",
        en: "Simultaneous Round",
      },
      heroText: {
        zh: "每一轮各组同时作答，但每组拿到的题目都不同。",
        en: "Every group answers at the same time, but each group gets a different question in the round.",
      },
      groupSummary: {
        zh: "{count} 组同时作答",
        en: "{count} groups answering together",
      },
      timerSummary: {
        zh: "每题 {seconds} 秒",
        en: "{seconds} seconds per round",
      },
      questionSummary: {
        zh: "{rounds} 轮 / {questions} 题",
        en: "{rounds} rounds / {questions} questions",
      },
      timerKicker: {
        zh: "本轮计时",
        en: "Round Timer",
      },
      timerWaiting: {
        zh: "等待开始",
        en: "Waiting to start",
      },
      timerRunning: {
        zh: "倒计时进行中",
        en: "Timer running",
      },
      timerPaused: {
        zh: "倒计时已暂停",
        en: "Timer paused",
      },
      timerAnswered: {
        zh: "全部已提交，等待下一轮",
        en: "All submissions received",
      },
      timerTimeout: {
        zh: "本轮时间已到",
        en: "Time is up for this round",
      },
      timerComplete: {
        zh: "所有轮次已完成",
        en: "All rounds completed",
      },
      startTimer: {
        zh: "开始计时",
        en: "Start",
      },
      pauseTimer: {
        zh: "暂停计时",
        en: "Pause",
      },
      roundKicker: {
        zh: "轮次控制",
        en: "Round Controls",
      },
      roundHeading: {
        zh: "第 {current} 轮 / 共 {total} 轮",
        en: "Round {current} of {total}",
      },
      roundCardTitle: {
        zh: "第 {current} 轮",
        en: "Round {current}",
      },
      roundSupport: {
        zh: "每一轮中，每组各答 1 题，题目互不相同。",
        en: "In each round, every group gets one unique question.",
      },
      nextRound: {
        zh: "下一轮",
        en: "Next Round",
      },
      restartQuiz: {
        zh: "重新开始",
        en: "Restart Quiz",
      },
      progressPending: {
        zh: "未开始",
        en: "Pending",
      },
      progressCurrent: {
        zh: "当前轮",
        en: "Current",
      },
      progressDone: {
        zh: "已完成",
        en: "Done",
      },
      boardKicker: {
        zh: "横版答题区",
        en: "Landscape Answer Board",
      },
      boardHeading: {
        zh: "各组同时答题",
        en: "All Groups Answering Together",
      },
      scoreboardKicker: {
        zh: "积分榜",
        en: "Scoreboard",
      },
      scoreboardTitle: {
        zh: "各组累计得分",
        en: "Cumulative Scores",
      },
      scoreboardRule: {
        zh: "每轮得分自动累计为总分；当前规则：答对 1 题得 1 分",
        en: "Scores carry over every round; current rule: 1 correct answer = 1 point",
      },
      scoreUnit: {
        zh: "{score} 分",
        en: "{score} pts",
      },
      scoreTotalLabel: {
        zh: "总分",
        en: "Total score",
      },
      scoreRankLabel: {
        zh: "当前排名 #{rank}",
        en: "Current rank #{rank}",
      },
      scoreCorrectCount: {
        zh: "答对 {count} 题",
        en: "{count} correct",
      },
      scoreAnsweredCount: {
        zh: "已完成 {count} 轮",
        en: "{count} rounds completed",
      },
      boardStatusLive: {
        zh: "本轮进行中",
        en: "Round live",
      },
      boardStatusRevealed: {
        zh: "本轮已揭晓",
        en: "Answers revealed",
      },
      boardStatusComplete: {
        zh: "比赛结束",
        en: "Quiz complete",
      },
      groupCardHint: {
        zh: "本轮题目仅分配给这一组，与其它组不同。",
        en: "This question is assigned only to this group for the current round.",
      },
      statusPending: {
        zh: "未作答",
        en: "Waiting",
      },
      statusSubmitted: {
        zh: "已提交",
        en: "Submitted",
      },
      statusCorrect: {
        zh: "答对了",
        en: "Correct",
      },
      statusIncorrect: {
        zh: "答错了",
        en: "Incorrect",
      },
      statusTimedOut: {
        zh: "超时",
        en: "Timed out",
      },
      optionSelect: {
        zh: "选择",
        en: "Select",
      },
      optionSubmitted: {
        zh: "已提交",
        en: "Locked",
      },
      finishKicker: {
        zh: "完成",
        en: "Finished",
      },
      finishTitle: {
        zh: "所有轮次已经结束。",
        en: "All rounds have been completed.",
      },
      finishText: {
        zh: "你可以重新开始生成一套新的题目分配，或者返回设置页调整组数与计时。",
        en: "You can restart to generate a fresh assignment, or return to setup to change groups and timers.",
      },
      missingTitle: {
        zh: "尚未创建比赛",
        en: "Quiz not ready",
      },
      missingText: {
        zh: "请先回到设置页，完成分组与计时后再进入答题页。",
        en: "Return to the setup page and create a session first.",
      },
      missingBoardTitle: {
        zh: "需要先完成设置",
        en: "Setup required",
      },
      missingBoardText: {
        zh: "答题页需要从设置页读取语言、分组和计时配置。",
        en: "The quiz page needs language, groups, and timer settings from the setup page.",
      },
      toastAnswered: {
        zh: "{group} 已提交答案。",
        en: "{group} submitted an answer.",
      },
      toastAllAnswered: {
        zh: "所有分组都已提交，本轮答案已揭晓。",
        en: "All groups have submitted. Answers are now revealed.",
      },
      toastTimeout: {
        zh: "本轮时间到，未提交的分组已记为超时。",
        en: "Time is up. Unsubmitted groups were marked as timed out.",
      },
      toastRestarted: {
        zh: "已按当前分组重新开始比赛。",
        en: "The quiz was restarted with the current groups.",
      },
      unansweredReveal: {
        zh: "未作答，时间结束后自动揭晓正确答案。",
        en: "No answer submitted. The correct answer is revealed after time expired.",
      },
    },
  };

  function getSavedLanguage() {
    const raw = localStorage.getItem(STORAGE_KEYS.language);
    return raw === "en" ? "en" : DEFAULT_LANGUAGE;
  }

  function setSavedLanguage(language) {
    localStorage.setItem(STORAGE_KEYS.language, language === "en" ? "en" : DEFAULT_LANGUAGE);
  }

  function localize(value, language, fallback) {
    if (typeof value === "string") {
      return value;
    }

    if (value && typeof value === "object") {
      if (typeof value[language] === "string") {
        return value[language];
      }

      if (typeof value.zh === "string") {
        return value.zh;
      }

      if (typeof value.en === "string") {
        return value.en;
      }
    }

    return fallback || "";
  }

  function interpolate(template, params) {
    if (!params) {
      return template;
    }

    return template.replace(/\{(\w+)\}/g, function (_, key) {
      return Object.prototype.hasOwnProperty.call(params, key) ? params[key] : "";
    });
  }

  function translate(scope, key, language, params) {
    const section = UI_TEXT[scope] || {};
    return interpolate(localize(section[key], language, key), params);
  }

  function clampNumber(value, min, max, fallback) {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
      return fallback;
    }

    return Math.min(max, Math.max(min, Math.round(parsed)));
  }

  function shuffle(items) {
    const clone = items.slice();

    for (let index = clone.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      const temp = clone[index];
      clone[index] = clone[swapIndex];
      clone[swapIndex] = temp;
    }

    return clone;
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
  }

  function getMaxGroups(questionCount) {
    return Math.max(1, Math.min(MAX_GROUPS, questionCount || MAX_GROUPS));
  }

  function buildRoundBundles(questionIds, groupCount) {
    const rounds = [];
    const totalRounds = Math.floor(questionIds.length / groupCount);

    for (let index = 0; index < totalRounds; index += 1) {
      rounds.push(questionIds.slice(index * groupCount, (index + 1) * groupCount));
    }

    return rounds;
  }

  function getQuestionConfig() {
    if (window.BIBLE_QUESTION_CONFIG && Array.isArray(window.BIBLE_QUESTION_CONFIG.questions)) {
      return window.BIBLE_QUESTION_CONFIG;
    }

    if (Array.isArray(window.BIBLE_QUESTIONS)) {
      return {
        version: 0,
        questions: window.BIBLE_QUESTIONS,
      };
    }

    return {
      version: 0,
      questions: [],
    };
  }

  function getQuestionBank() {
    return getQuestionConfig().questions.filter(function (question) {
      return (
        question &&
        typeof question.id === "string" &&
        question.id &&
        Array.isArray(question.options) &&
        question.options.length >= 2 &&
        Number.isInteger(question.answerIndex) &&
        question.answerIndex >= 0 &&
        question.answerIndex < question.options.length
      );
    });
  }

  function localizeReference(question, language) {
    if (!question || !question.reference) {
      return "";
    }

    if (typeof question.reference === "object") {
      return localize(question.reference, language);
    }

    if (typeof question.reference !== "string") {
      return "";
    }

    if (language !== "zh") {
      return question.reference;
    }

    const chapterMatch = question.reference.match(/\d+:\d/);
    const localizedBook = localize(question.book, "zh", question.reference);

    if (!chapterMatch || typeof chapterMatch.index !== "number") {
      return localizedBook;
    }

    return localizedBook + " " + question.reference.slice(chapterMatch.index);
  }

  function localizeQuestion(question, language) {
    return {
      id: question.id,
      testament: localize(question.testament, language),
      difficulty: localize(question.difficulty, language),
      book: localize(question.book, language),
      prompt: localize(question.prompt, language),
      options: question.options.map(function (option) {
        return localize(option, language);
      }),
      answerIndex: question.answerIndex,
      reference: localizeReference(question, language),
      scripture: localize(question.scripture, language),
      explanation: localize(question.explanation, language),
    };
  }

  window.APP_SHARED = {
    STORAGE_KEYS,
    DEFAULT_LANGUAGE,
    UI_TEXT,
    getSavedLanguage,
    setSavedLanguage,
    localize,
    translate,
    clampNumber,
    shuffle,
    escapeHtml,
    formatTime,
    getMaxGroups,
    buildRoundBundles,
    getQuestionConfig,
    getQuestionBank,
    localizeQuestion,
  };
})();
