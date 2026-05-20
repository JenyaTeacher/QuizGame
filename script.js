let currentQuestion = 0;
let score = 0;
let selectedCategory = "";
let selectedDifficulty = "";
let questionsPool = [];
let multiplier = 1;

const questions = {
  flags: {
    easy: [
      { question: "Прапор України?", answers: ["🟦🟨", "🟥⬜", "🟩⬛", "🟧⬜"], correct: 0 },
      { question: "Прапор Франції?", answers: ["🟦⬜🟥", "🟩⬛", "🟥🟨", "⬛🟨"], correct: 0 },
      { question: "Прапор Німеччини?", answers: ["⬛🟥🟨", "🟦⬜🟥", "🟩⬜🟩", "🟥⬛🟥"], correct: 0 },
      { question: "Прапор Японії?", answers: ["⬜🔴⬜", "🟦🟨", "🟥🟩", "⬛🟨"], correct: 0 },
      { question: "Прапор США?", answers: ["🇺🇸", "🇬🇧", "🇨🇦", "🇦🇺"], correct: 0 }
    ],
    medium: [
      { question: "🇧🇷 це?", answers: ["Бразилія", "Аргентина", "Мексика", "Чилі"], correct: 0 },
      { question: "🇨🇭 це?", answers: ["Швейцарія", "Австрія", "Швеція", "Норвегія"], correct: 0 },
      { question: "🇿🇦 це?", answers: ["ПАР", "Єгипет", "Кенія", "Марокко"], correct: 0 },
      { question: "🇮🇳 це?", answers: ["Індія", "Індонезія", "Іран", "Ірак"], correct: 0 },
      { question: "🇦🇷 це?", answers: ["Аргентина", "Перу", "Болівія", "Уругвай"], correct: 0 }
    ],
    hard: [
      { question: "🇦🇿 це?", answers: ["Азербайджан", "Албанія", "Арменія", "Андорра"], correct: 0 },
      { question: "🇲🇰 це?", answers: ["Пн. Македонія", "Молдова", "Мальта", "Монако"], correct: 0 },
      { question: "🇱🇺 це?", answers: ["Люксембург", "Латвія", "Литва", "Ліван"], correct: 0 },
      { question: "🇧🇦 це?", answers: ["Боснія і Герцеговина", "Болгарія", "Бенін", "Бахрейн"], correct: 0 },
      { question: "🇰🇿 це?", answers: ["Казахстан", "Киргизстан", "Китай", "Корея"], correct: 0 }
    ]
  },
  countries: {
    easy: [
      { question: "Столиця України?", answers: ["Київ", "Львів", "Одеса", "Харків"], correct: 0 },
      { question: "Столиця Франції?", answers: ["Париж", "Рим", "Берлін", "Мадрид"], correct: 0 },
      { question: "Столиця Італії?", answers: ["Рим", "Мілан", "Венеція", "Неаполь"], correct: 0 },
      { question: "Столиця Німеччини?", answers: ["Берлін", "Бонн", "Гамбург", "Мюнхен"], correct: 0 },
      { question: "Столиця Японії?", answers: ["Токіо", "Осака", "Кіото", "Нара"], correct: 0 }
    ],
    medium: [
      { question: "Столиця Канади?", answers: ["Оттава", "Торонто", "Ванкувер", "Монреаль"], correct: 0 },
      { question: "Столиця Австралії?", answers: ["Канберра", "Сідней", "Мельбурн", "Перт"], correct: 0 },
      { question: "Столиця Бразилії?", answers: ["Бразиліа", "Ріо", "Сан-Паулу", "Ліма"], correct: 0 },
      { question: "Столиця Іспанії?", answers: ["Мадрид", "Барселона", "Севілья", "Валенсія"], correct: 0 },
      { question: "Столиця Туреччини?", answers: ["Анкара", "Стамбул", "Ізмір", "Бурса"], correct: 0 }
    ],
    hard: [
      { question: "Столиця Казахстану?", answers: ["Астана", "Алмати", "Шимкент", "Тараз"], correct: 0 },
      { question: "Столиця Мексики?", answers: ["Мехіко", "Канкун", "Монтеррей", "Гвадалахара"], correct: 0 },
      { question: "Столиця ПАР?", answers: ["Преторія", "Кейптаун", "Йоганнесбург", "Дурбан"], correct: 0 },
      { question: "Столиця Норвегії?", answers: ["Осло", "Берген", "Тронгейм", "Ставангер"], correct: 0 },
      { question: "Столиця Фінляндії?", answers: ["Гельсінкі", "Турку", "Оулу", "Еспоо"], correct: 0 }
    ]
  },
  wars: {
    easy: [
      { question: "Друга світова завершилась у?", answers: ["1945", "1939", "1918", "1950"], correct: 0 },
      { question: "Перша світова почалась у?", answers: ["1914", "1920", "1905", "1930"], correct: 0 },
      { question: "Французька революція?", answers: ["1789", "1812", "1750", "1900"], correct: 0 },
      { question: "Наполеон був з?", answers: ["Франція", "Англія", "Іспанія", "Німеччина"], correct: 0 },
      { question: "ВВВ переможці?", answers: ["Союзники", "Німеччина", "Японія", "Італія"], correct: 0 }
    ],
    medium: [
      { question: "Полтавська битва?", answers: ["1709", "1648", "1812", "1917"], correct: 0 },
      { question: "Битва при Гастінгсі?", answers: ["1066", "1200", "1415", "1600"], correct: 0 },
      { question: "Троянська війна — хто напав?", answers: ["Греція", "Рим", "Єгипет", "Персія"], correct: 0 },
      { question: "Хрестові походи — коли?", answers: ["Середньовіччя", "Античність", "Новий час", "Сучасність"], correct: 0 },
      { question: "Хто очолив монголів?", answers: ["Чингісхан", "Тамерлан", "Цезар", "Осман"], correct: 0 }
    ],
    hard: [
      { question: "Битва при Ватерлоо?", answers: ["1815", "1805", "1799", "1820"], correct: 0 },
      { question: "Наполеон програв при Ватерлоо?", answers: ["Британія і Пруссія", "Іспанія", "Італія", "Росія"], correct: 0 },
      { question: "Столітня війна між?", answers: ["Франція і Англія", "Рим і Греція", "Іспанія і Португалія", "Австрія"], correct: 0 },
      { question: "1914–1918 — це?", answers: ["WWI", "WWII", "Громадянська", "Наполеонські"], correct: 0 },
      { question: "Версальський мир?", answers: ["1919", "1914", "1925", "1930"], correct: 0 }
    ]
  },
  rulers: {
    easy: [
      { question: "Перший римський імператор?", answers: ["Октавіан Август", "Цезар", "Нерон", "Траян"], correct: 0 },
      { question: "Хто хрестив Русь?", answers: ["Володимир", "Ярослав", "Олег", "Святослав"], correct: 0 },
      { question: "Цезар — правив у?", answers: ["Рим", "Греція", "Єгипет", "Персія"], correct: 0 },
      { question: "Франція 1789 — король?", answers: ["Людовік XVI", "Людовік XIV", "Карл IX", "Філіп IV"], correct: 0 },
      { question: "Перший нормандський король Англії?", answers: ["Гарольд II", "Генріх VIII", "Річард I", "Едуард I"], correct: 0 }
    ],
    medium: [
      { question: "Об'єднав Німеччину?", answers: ["Бісмарк", "Гітлер", "Наполеон", "Кайзер"], correct: 0 },
      { question: "Найвідоміша королева Англії?", answers: ["Єлизавета I", "Вікторія", "Марія I", "Анна"], correct: 0 },
      { question: "Законодавець Osmanів?", answers: ["Сулейман", "Ататюрк", "Осман I", "Мехмед II"], correct: 0 },
      { question: "Карл Великий — правив?", answers: ["Франки", "Рим", "Візантія", "Османи"], correct: 0 },
      { question: "Петро I реформував?", answers: ["Росія", "Польща", "Швеція", "Франція"], correct: 0 }
    ],
    hard: [
      { question: "Останній цар Росії?", answers: ["Микола II", "Олександр II", "Петро I", "Іван IV"], correct: 0 },
      { question: "Засновник Османської імп.?", answers: ["Осман I", "Сулейман", "Мехмед II", "Ататюрк"], correct: 0 },
      { question: "Король-Сонце — хто?", answers: ["Людовік XIV", "Людовік XVI", "Генріх IV", "Філіп II"], correct: 0 },
      { question: "Іван Грозний правив у?", answers: ["Росія", "Польща", "Швеція", "Франція"], correct: 0 },
      { question: "Цезар загинув у?", answers: ["44 до н.е.", "30 до н.е.", "100 н.е.", "200 до н.е."], correct: 0 }
    ]
  }
};

function selectCategory(cat) {
  selectedCategory = cat;
  document.getElementById("categories").classList.add("hidden");
  document.getElementById("difficulty").classList.remove("hidden");
}

function goBack() {
  document.getElementById("difficulty").classList.add("hidden");
  document.getElementById("categories").classList.remove("hidden");
}

function startGame(diff) {
  selectedDifficulty = diff;
  multiplier = diff === 'easy' ? 1 : diff === 'medium' ? 2 : 3;
  currentQuestion = 0;
  score = 0;
  questionsPool = questions[selectedCategory][diff];
  document.getElementById("difficulty").classList.add("hidden");
  document.getElementById("quiz").classList.remove("hidden");
  showQuestion();
  updateHUD();
}

function updateHUD() {
  const total = questionsPool.length;
  document.getElementById("progress").textContent = `${currentQuestion + 1}/${total}`;
  document.getElementById("scoreLive").textContent = score;
  document.getElementById("progFill").style.width = `${(currentQuestion / total) * 100}%`;
}

function showQuestion() {
  const q = questionsPool[currentQuestion];
  document.getElementById("question-box").textContent = q.question;

  const answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  // shuffle answers but track correct
  const indexed = q.answers.map((a, i) => ({ text: a, orig: i }));
  const shuffled = indexed.sort(() => Math.random() - 0.5);

  shuffled.forEach(({ text, orig }) => {
    const btn = document.createElement("button");
    btn.className = "ans-btn";
    btn.textContent = text;
    btn.onclick = () => checkAnswer(orig, q.correct, btn, shuffled);
    answersDiv.appendChild(btn);
  });

  updateHUD();
}

function checkAnswer(chosen, correct, clickedBtn, shuffled) {
  const allBtns = document.querySelectorAll(".ans-btn");
  allBtns.forEach(b => b.disabled = true);

  const feedback = document.getElementById("feedback");

  if (chosen === correct) {
    clickedBtn.classList.add("correct");
    score += multiplier;
    feedback.textContent = "✔ Правильно! +" + multiplier;
    feedback.className = "feedback-strip correct show";
  } else {
    clickedBtn.classList.add("wrong");
    // highlight correct
    allBtns.forEach((b, idx) => {
      if (shuffled[idx].orig === correct) b.classList.add("correct");
    });
    feedback.textContent = "✖ Неправильно!";
    feedback.className = "feedback-strip wrong show";
  }

  setTimeout(() => {
    feedback.className = "feedback-strip";
    currentQuestion++;
    if (currentQuestion < questionsPool.length) {
      showQuestion();
    } else {
      endGame();
    }
  }, 800);
}

function endGame() {
  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("result").classList.remove("hidden");

  const total = questionsPool.length;
  const maxScore = total * multiplier;
  const pct = score / maxScore;

  document.getElementById("finalScore").textContent = score + " / " + maxScore;
  document.getElementById("resultSub").textContent = `Правильних відповідей: ${Math.round(pct * 100)}%`;

  let emoji, msg;
  if (pct === 1)       { emoji = "🏆"; msg = "Ідеальний результат! Ти легенда!"; }
  else if (pct >= 0.8) { emoji = "🔥"; msg = "Відмінно! Майже ідеально."; }
  else if (pct >= 0.6) { emoji = "👍"; msg = "Непогано! Ще трохи практики."; }
  else if (pct >= 0.4) { emoji = "😅"; msg = "Є куди рости. Спробуй ще!"; }
  else                 { emoji = "💀"; msg = "Складно? Повтори матеріал!"; }

  document.getElementById("resultEmoji").textContent = emoji;
  document.getElementById("resultMsg").textContent = msg;
}

function restart() { location.reload(); }