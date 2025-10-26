// Quiz Data
const quizData = [
  { question: "During tough times, what do you prefer to do?", options: ["Make do with what you have", "Share with others", "Find creative solutions", "Wait for better times"] },
  { question: "What's your ideal meal situation?", options: ["Simple and filling", "Shared with family", "Whatever is available", "Traditional and comforting"] },
  { question: "How do you handle scarcity?", options: ["Adapt and improvise", "Help others first", "Stay positive", "Remember better times"] },
  { question: "What's most important to you?", options: ["Survival", "Community", "Tradition", "Hope"] },
  { question: "Your ideal cooking method?", options: ["One-pot meals", "Family recipes", "Whatever works", "Simple and fast"] },
  { question: "What motivates you most?", options: ["Practical needs", "Caring for others", "Cultural pride", "Future dreams"] },
  { question: "How do you see food?", options: ["Necessity for survival", "Way to bring people together", "Connection to home", "Source of comfort"] },
  { question: "What's your approach to challenges?", options: ["Face them head-on", "Work with others", "Draw on experience", "Stay optimistic"] }
];

// State
let currentQuestion = 0;
let userAnswers = [];

// DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');

// Events
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
prevBtn.addEventListener('click', prevQuestion);
submitBtn.addEventListener('click', submitQuiz);
restartBtn.addEventListener('click', restartQuiz);

// Helpers
function show(el) { el.classList.remove('hidden'); }
function hide(el) { el.classList.add('hidden'); }

function startQuiz() {
  startScreen.classList.add('hidden');
  quizScreen.classList.remove('hidden');
  currentQuestion = 0;
  userAnswers = [];
  showQuestion();
}

function showQuestion() {
  const question = quizData[currentQuestion];
  document.getElementById('question-text').textContent = question.question;

  // Progress
  const progress = ((currentQuestion + 1) / quizData.length) * 100;
  document.getElementById('progress').style.width = progress + '%';
  document.getElementById('current-question').textContent = currentQuestion + 1;
  document.getElementById('total-questions').textContent = quizData.length;

  // Options
  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = '';
  question.options.forEach((option, index) => {
    const button = document.createElement('button');
    button.className = 'option-btn';
    button.textContent = option;
    button.addEventListener('click', () => selectOption(index));
    if (userAnswers[currentQuestion] === index) {
      button.classList.add('selected'); // keep selection if revisiting
    }
    optionsContainer.appendChild(button);
  });

  // Reset buttons
  hide(prevBtn);
  hide(nextBtn);
  hide(submitBtn);

  // Apply visibility rules
  const isFirst = currentQuestion === 0;
  const isLast = currentQuestion === quizData.length - 1;
  const hasSelection = userAnswers[currentQuestion] !== undefined;

  if (isFirst) {
    if (hasSelection) show(nextBtn); // only Next after selection
  } else if (isLast) {
    show(prevBtn);                   // Previous always
    if (hasSelection) show(submitBtn); // Submit after selection
  } else {
    show(prevBtn);                   // Previous always
    if (hasSelection) show(nextBtn); // Next after selection
  }
}

function selectOption(selectedIndex) {
  document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
  const selectedBtn = document.querySelectorAll('.option-btn')[selectedIndex];
  if (selectedBtn) selectedBtn.classList.add('selected');
  userAnswers[currentQuestion] = selectedIndex;

  // Update buttons immediately based on position
  const isFirst = currentQuestion === 0;
  const isLast = currentQuestion === quizData.length - 1;

  hide(nextBtn);
  hide(submitBtn);

  if (isLast) {
    show(prevBtn);
    show(submitBtn);
  } else if (isFirst) {
    show(nextBtn);
  } else {
    show(prevBtn);
    show(nextBtn);
  }
}

function nextQuestion() {
  if (userAnswers[currentQuestion] === undefined) {
    alert("Please select an option before continuing.");
    return;
  }
  currentQuestion++;
  showQuestion();
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  }
}

function submitQuiz() {
  // Block submission until all questions are answered
  if (userAnswers.length < quizData.length || userAnswers.includes(undefined)) {
    alert("Please answer all questions before submitting.");
    return;
  }
  showResults();
}

function showResults() {
  quizScreen.classList.add('hidden');
  resultsScreen.classList.remove('hidden');

  // Count answers
  const answerCounts = [0, 0, 0, 0];
  userAnswers.forEach(ans => {
    if (ans !== undefined) answerCounts[ans]++;
  });
  const maxIndex = answerCounts.indexOf(Math.max(...answerCounts));

  let personality, description, emoji, color, imgSrc;

  switch (maxIndex) {
    case 0:
      personality = 'Sweet Potato & Tapioca';
      description = "Resilient and adaptable, like the root crops that became staples when rice was scarce.";
      emoji = '🍠🌱';
      color = '#8B5E3C';
      imgSrc = 'images/tapioca.avif';
      break;
    case 1:
      personality = 'Rice Rations';
      description = "Disciplined and enduring, like rationed rice carefully stretched to survive.";
      emoji = '🍚📏';
      color = '#C2B280';
      imgSrc = 'images/rice-rations.avif';
      break;
    case 2:
      personality = 'Salted Fish & Anchovies';
      description = "Resourceful and pragmatic, like preserved fish that sustained families without refrigeration.";
      emoji = '🐟🧂';
      color = '#708090';
      imgSrc = 'images/salted-fish.avif';
      break;
    case 3:
      personality = 'Fiddlehead Ferns & Wild Mushrooms';
      description = "Hopeful and inventive, like foraged greens and mushrooms that filled cooking pots in scarcity.";
      emoji = '🥬🍄';
      color = '#228B22';
      imgSrc = 'images/fiddlehead-ferns.avif';
      break;
    default:
      personality = 'Mixed Survival Stew';
      description = "A blend of resilience, discipline, resourcefulness, and hope — just like wartime Singapore.";
      emoji = '🍲🇸🇬';
      color = '#4B0082';
      imgSrc = 'images/mixed-stew.avif';
  }

  // Update results display
  document.getElementById('score').textContent = personality;
  document.getElementById('total-score').textContent = 'Personality';
  const msg = document.getElementById('score-message');
  msg.textContent = description + ' ' + emoji;
  msg.style.color = color;

  const resultImg = document.getElementById('result-img');
  resultImg.src = imgSrc;
  resultImg.alt = personality;
}

function restartQuiz() {
  resultsScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
  // Optional: reset image and text
  document.getElementById('result-img').src = '';
  document.getElementById('result-img').alt = '';
  document.getElementById('score').textContent = 'Result';
  document.getElementById('total-score').textContent = 'Personality';
  document.getElementById('score-message').textContent = 'Your description will appear here.';
}