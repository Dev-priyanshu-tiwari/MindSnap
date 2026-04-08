// ============================================================
//  MindSnap — Quiz App
//  Features: Timer, Streak, Categories, Difficulty,
//            LocalStorage high scores, Result breakdown
// ============================================================

// ============================================================
//  QUESTION BANK
// ============================================================
const QUESTIONS = {
  tech: [
    { q: "What does CSS stand for?", opts: ["Cascading Style Sheets","Computer Style System","Creative Style Sheets","Coded Style Syntax"], ans: 0, diff: "easy" },
    { q: "Which language runs in the browser natively?", opts: ["Python","Java","JavaScript","PHP"], ans: 2, diff: "easy" },
    { q: "What does HTML stand for?", opts: ["HyperText Markup Language","High Transfer Markup Language","HyperText Machine Language","Hyperlink Text Markup Language"], ans: 0, diff: "easy" },
    { q: "Which HTML tag is used to link a CSS file?", opts: ["<style>","<script>","<link>","<css>"], ans: 2, diff: "easy" },
    { q: "What is the time complexity of binary search?", opts: ["O(n)","O(log n)","O(n²)","O(1)"], ans: 1, diff: "medium" },
    { q: "Which data structure uses LIFO order?", opts: ["Queue","Stack","Array","Linked List"], ans: 1, diff: "medium" },
    { q: "What does API stand for?", opts: ["Application Programming Interface","Automated Program Integration","Applied Protocol Interface","Application Protocol Input"], ans: 0, diff: "easy" },
    { q: "Which HTTP method is used to send form data?", opts: ["GET","PUT","POST","DELETE"], ans: 2, diff: "medium" },
    { q: "What is the output of `typeof null` in JavaScript?", opts: ["'null'","'undefined'","'object'","'boolean'"], ans: 2, diff: "hard" },
    { q: "Which sorting algorithm has O(n log n) average time complexity?", opts: ["Bubble Sort","Insertion Sort","Merge Sort","Selection Sort"], ans: 2, diff: "medium" },
    { q: "What is a closure in JavaScript?", opts: ["A loop that never ends","A function with access to its outer scope","A sealed class","An async function"], ans: 1, diff: "hard" },
    { q: "What does DNS stand for?", opts: ["Digital Network System","Domain Name System","Dynamic Naming Service","Distributed Network Service"], ans: 1, diff: "easy" },
    { q: "Which protocol is used to load websites securely?", opts: ["FTP","HTTP","HTTPS","SMTP"], ans: 2, diff: "easy" },
    { q: "What is the purpose of `git commit`?", opts: ["Push code to remote","Save staged changes locally","Pull latest changes","Merge branches"], ans: 1, diff: "medium" },
    { q: "Which of these is NOT a JavaScript framework?", opts: ["React","Vue","Django","Angular"], ans: 2, diff: "medium" },
  ],
  science: [
    { q: "What is the speed of light in a vacuum?", opts: ["3×10⁶ m/s","3×10⁸ m/s","3×10¹⁰ m/s","3×10⁴ m/s"], ans: 1, diff: "easy" },
    { q: "What is the chemical formula for water?", opts: ["HO","H₂O","H₃O","OH₂"], ans: 1, diff: "easy" },
    { q: "Which planet is closest to the Sun?", opts: ["Venus","Earth","Mercury","Mars"], ans: 2, diff: "easy" },
    { q: "What is the atomic number of Carbon?", opts: ["6","12","8","14"], ans: 0, diff: "easy" },
    { q: "What force keeps planets in orbit?", opts: ["Magnetic force","Nuclear force","Gravitational force","Centrifugal force"], ans: 2, diff: "easy" },
    { q: "What is the powerhouse of the cell?", opts: ["Nucleus","Ribosome","Mitochondria","Endoplasmic reticulum"], ans: 2, diff: "easy" },
    { q: "At what temperature does water boil (at sea level)?", opts: ["90°C","95°C","100°C","105°C"], ans: 2, diff: "easy" },
    { q: "What is the hardest natural substance on Earth?", opts: ["Quartz","Iron","Diamond","Titanium"], ans: 2, diff: "easy" },
    { q: "Which element has the symbol 'Au'?", opts: ["Silver","Copper","Gold","Aluminum"], ans: 2, diff: "medium" },
    { q: "What is Newton's Second Law of Motion?", opts: ["F=ma","E=mc²","v=u+at","P=mv"], ans: 0, diff: "medium" },
    { q: "What is the pH of pure water?", opts: ["5","6","7","8"], ans: 2, diff: "medium" },
    { q: "Which gas is most abundant in Earth's atmosphere?", opts: ["Oxygen","Carbon Dioxide","Nitrogen","Argon"], ans: 2, diff: "medium" },
    { q: "What type of wave is sound?", opts: ["Transverse","Longitudinal","Electromagnetic","Surface"], ans: 1, diff: "hard" },
    { q: "What is the half-life of Carbon-14?", opts: ["~1,000 years","~5,730 years","~10,000 years","~14,000 years"], ans: 1, diff: "hard" },
  ],
  general: [
    { q: "What is the capital of India?", opts: ["Mumbai","Chennai","Kolkata","New Delhi"], ans: 3, diff: "easy" },
    { q: "Which country is the largest by area?", opts: ["China","Canada","USA","Russia"], ans: 3, diff: "easy" },
    { q: "How many continents are there on Earth?", opts: ["5","6","7","8"], ans: 2, diff: "easy" },
    { q: "Who wrote 'Romeo and Juliet'?", opts: ["Charles Dickens","William Shakespeare","Jane Austen","Mark Twain"], ans: 1, diff: "easy" },
    { q: "What is the currency of Japan?", opts: ["Yuan","Won","Rupee","Yen"], ans: 3, diff: "easy" },
    { q: "In which year did World War II end?", opts: ["1942","1943","1944","1945"], ans: 3, diff: "easy" },
    { q: "Which ocean is the largest?", opts: ["Atlantic","Indian","Arctic","Pacific"], ans: 3, diff: "easy" },
    { q: "How many bones are in the adult human body?", opts: ["196","206","216","226"], ans: 1, diff: "medium" },
    { q: "What is the national sport of India?", opts: ["Cricket","Hockey","Kabaddi","Football"], ans: 1, diff: "medium" },
    { q: "Which planet is known as the Red Planet?", opts: ["Venus","Jupiter","Mars","Saturn"], ans: 2, diff: "easy" },
    { q: "What is the longest river in the world?", opts: ["Amazon","Yangtze","Mississippi","Nile"], ans: 3, diff: "medium" },
    { q: "Who invented the telephone?", opts: ["Thomas Edison","Nikola Tesla","Alexander Graham Bell","Guglielmo Marconi"], ans: 2, diff: "medium" },
    { q: "What is the smallest country in the world?", opts: ["Monaco","Nauru","Liechtenstein","Vatican City"], ans: 3, diff: "hard" },
  ],
};

// ============================================================
//  STATE
// ============================================================
let state = {
  category:    'mixed',
  difficulty:  'easy',
  questions:   [],
  current:     0,
  score:       0,
  streak:      0,
  bestStreak:  0,
  timer:       null,
  timeLeft:    20,
  timePerQ:    20,
  answered:    false,
  startTime:   0,
  timeTaken:   [],
  breakdown:   [],
};

// ============================================================
//  DIFFICULTY CONFIG
// ============================================================
const DIFF_CONFIG = { easy: 20, medium: 15, hard: 10 };

// ============================================================
//  HELPERS
// ============================================================
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getPool() {
  let pool = [];
  if (state.category === 'mixed') {
    Object.values(QUESTIONS).forEach(arr => pool.push(...arr));
  } else {
    pool = [...(QUESTIONS[state.category] || [])];
  }
  if (state.difficulty !== 'easy') {
    const filtered = pool.filter(q => q.diff === state.difficulty);
    if (filtered.length >= 5) pool = filtered;
  }
  return shuffle(pool).slice(0, 10);
}

function show(id)  { document.getElementById(id).classList.add('active');    }
function hide(id)  { document.getElementById(id).classList.remove('active'); }
function gid(id)   { return document.getElementById(id); }

const LABELS = ['A','B','C','D'];
const CIRC   = 213.6; // 2π × 34

// ============================================================
//  LOCAL STORAGE
// ============================================================
function loadStats() {
  const s = JSON.parse(localStorage.getItem('mindsnap') || '{}');
  gid('hsScore').textContent       = s.bestScore   ?? '—';
  gid('hsStreak').textContent      = s.bestStreak  ?? '—';
  gid('hsTotalPlayed').textContent = s.totalPlayed ?? '—';
}

function saveStats(score, streak) {
  const s = JSON.parse(localStorage.getItem('mindsnap') || '{}');
  s.bestScore   = Math.max(s.bestScore   || 0, score);
  s.bestStreak  = Math.max(s.bestStreak  || 0, streak);
  s.totalPlayed = (s.totalPlayed || 0) + 1;
  localStorage.setItem('mindsnap', JSON.stringify(s));
}

// ============================================================
//  HOME SCREEN
// ============================================================
loadStats();

document.querySelectorAll('.cat-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.category = btn.dataset.cat;
  });
});

document.querySelectorAll('.diff-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    state.difficulty = btn.dataset.diff;
  });
});

gid('startBtn').addEventListener('click', startQuiz);

// ============================================================
//  START QUIZ
// ============================================================
function startQuiz() {
  state.questions  = getPool();
  state.current    = 0;
  state.score      = 0;
  state.streak     = 0;
  state.bestStreak = 0;
  state.timeTaken  = [];
  state.breakdown  = [];
  state.timePerQ   = DIFF_CONFIG[state.difficulty];

  hide('screenHome');
  show('screenQuiz');
  renderQuestion();
}

// ============================================================
//  RENDER QUESTION
// ============================================================
function renderQuestion() {
  const q   = state.questions[state.current];
  const idx = state.current;
  const tot = state.questions.length;

  state.answered = false;
  state.startTime = Date.now();

  // Header
  gid('qNum').textContent      = `Q${idx + 1} / ${tot}`;
  gid('qCatTag').textContent   = q.diff.toUpperCase();
  gid('liveScore').textContent = state.score;
  gid('progressFill').style.width = `${(idx / tot) * 100}%`;

  // Streak badge
  const sb = gid('streakBadge');
  sb.textContent = `🔥 ${state.streak}`;
  sb.classList.toggle('fire', state.streak >= 3);

  // Question
  gid('questionText').textContent = q.q;

  // Shuffle option display order
  const shuffled = shuffle(q.opts.map((o, i) => ({ text: o, origIdx: i })));

  // Options
  const grid = gid('optionsGrid');
  grid.innerHTML = '';
  shuffled.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="opt-label">${LABELS[i]}</span><span>${opt.text}</span>`;
    btn.addEventListener('click', () => selectAnswer(btn, opt.origIdx, shuffled, q));
    grid.appendChild(btn);
  });

  // Feedback
  const fb = gid('feedbackBar');
  fb.textContent = '';
  fb.className   = 'feedback-bar';

  // Timer
  startTimer(q, shuffled);
}

// ============================================================
//  TIMER
// ============================================================
function startTimer(q, shuffled) {
  clearInterval(state.timer);
  state.timeLeft = state.timePerQ;
  const ring     = gid('timerRing');
  const txt      = gid('timerText');
  const total    = state.timePerQ;

  ring.className     = 'timer-ring';
  txt.textContent    = state.timeLeft;
  ring.style.strokeDashoffset = 0;

  state.timer = setInterval(() => {
    state.timeLeft--;
    txt.textContent = state.timeLeft;

    const offset = CIRC * (1 - state.timeLeft / total);
    ring.style.strokeDashoffset = offset;

    if (state.timeLeft <= 5) ring.className = 'timer-ring danger';
    else if (state.timeLeft <= 10) ring.className = 'timer-ring warn';

    if (state.timeLeft <= 0) {
      clearInterval(state.timer);
      handleTimeout(q, shuffled);
    }
  }, 1000);
}

// ============================================================
//  SELECT ANSWER
// ============================================================
function selectAnswer(btn, chosenOrigIdx, shuffled, q) {
  if (state.answered) return;
  state.answered = true;
  clearInterval(state.timer);

  const timeTaken = ((Date.now() - state.startTime) / 1000).toFixed(1);
  state.timeTaken.push(parseFloat(timeTaken));

  const correct   = chosenOrigIdx === q.ans;
  const allBtns   = gid('optionsGrid').querySelectorAll('.option-btn');
  const correctTxt = q.opts[q.ans];

  allBtns.forEach((b, i) => {
    b.disabled = true;
    const origIdx = shuffled[i].origIdx;
    if (origIdx === q.ans)         b.classList.add('correct');
    else if (b === btn && !correct) b.classList.add('wrong');
    else                           b.classList.add('revealed');
  });

  const fb = gid('feedbackBar');
  if (correct) {
    state.score++;
    state.streak++;
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    fb.textContent = ['✓ Correct! Nice work.','✓ That\'s right!','✓ Nailed it!','✓ Excellent!'][Math.floor(Math.random()*4)];
    fb.className   = 'feedback-bar correct-fb';
  } else {
    state.streak = 0;
    fb.textContent = `✗ Wrong! Answer: ${correctTxt}`;
    fb.className   = 'feedback-bar wrong-fb';
  }

  gid('liveScore').textContent = state.score;
  gid('streakBadge').textContent = `🔥 ${state.streak}`;
  gid('streakBadge').classList.toggle('fire', state.streak >= 3);

  state.breakdown.push({ q: q.q, correct, yourAns: q.opts[chosenOrigIdx], correctAns: correctTxt });

  setTimeout(nextQuestion, 1400);
}

// ============================================================
//  TIMEOUT
// ============================================================
function handleTimeout(q, shuffled) {
  if (state.answered) return;
  state.answered  = true;
  state.streak    = 0;
  state.timeTaken.push(state.timePerQ);

  const allBtns   = gid('optionsGrid').querySelectorAll('.option-btn');
  const correctTxt = q.opts[q.ans];

  allBtns.forEach((b, i) => {
    b.disabled = true;
    const origIdx = shuffled[i].origIdx;
    if (origIdx === q.ans) b.classList.add('correct');
    else                   b.classList.add('revealed');
  });

  const fb = gid('feedbackBar');
  fb.textContent = `⏰ Time's up! Answer: ${correctTxt}`;
  fb.className   = 'feedback-bar timeout-fb';

  gid('streakBadge').textContent = '🔥 0';
  gid('streakBadge').classList.remove('fire');

  state.breakdown.push({ q: q.q, correct: false, yourAns: 'Timed out', correctAns: correctTxt });

  setTimeout(nextQuestion, 1600);
}

// ============================================================
//  NEXT QUESTION / END
// ============================================================
function nextQuestion() {
  state.current++;
  if (state.current < state.questions.length) {
    renderQuestion();
  } else {
    endQuiz();
  }
}

// ============================================================
//  END QUIZ
// ============================================================
function endQuiz() {
  clearInterval(state.timer);
  saveStats(state.score, state.bestStreak);

  hide('screenQuiz');
  show('screenResult');

  const total   = state.questions.length;
  const pct     = Math.round((state.score / total) * 100);
  const avgTime = state.timeTaken.length
    ? (state.timeTaken.reduce((a,b) => a+b, 0) / state.timeTaken.length).toFixed(1)
    : '—';

  // Emoji & title
  let emoji = '😢', title = 'Better luck next time!';
  if (pct >= 90)      { emoji = '🏆'; title = 'Legendary!'; }
  else if (pct >= 70) { emoji = '🎉'; title = 'Great job!'; }
  else if (pct >= 50) { emoji = '😎'; title = 'Not bad!'; }
  else if (pct >= 30) { emoji = '🤔'; title = 'Keep practicing!'; }

  gid('resultEmoji').textContent  = emoji;
  gid('resultTitle').textContent  = title;
  gid('rsNum').textContent        = state.score;
  gid('rsPct').textContent        = pct + '%';
  gid('rsTime').textContent       = avgTime + 's';
  gid('rsStreak').textContent     = state.bestStreak;

  // Score ring animation
  const circle  = gid('rsCircle');
  const circum  = 314.2;
  setTimeout(() => {
    circle.style.strokeDashoffset = circum * (1 - pct / 100);
    circle.style.stroke = pct >= 70 ? 'var(--accent)' : pct >= 40 ? 'var(--warn)' : 'var(--danger)';
  }, 200);

  // Breakdown
  const bd = gid('resultBreakdown');
  bd.innerHTML = '';
  state.breakdown.forEach(item => {
    const div = document.createElement('div');
    div.className = `bd-item ${item.correct ? 'correct' : 'wrong'}`;
    div.innerHTML = `
      <span class="bd-icon">${item.correct ? '✓' : '✗'}</span>
      <div>
        <div class="bd-q">${item.q}</div>
        <div class="bd-a">${item.correct ? item.correctAns : `You: ${item.yourAns} → ${item.correctAns}`}</div>
      </div>`;
    bd.appendChild(div);
  });

  // Update home stats
  loadStats();
}

// ============================================================
//  RESULT BUTTONS
// ============================================================
gid('retryBtn').addEventListener('click', () => {
  hide('screenResult');
  startQuiz();
});

gid('homeBtn').addEventListener('click', () => {
  hide('screenResult');
  show('screenHome');
  loadStats();
});
