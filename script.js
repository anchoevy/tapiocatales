// Singapore WWII Food Personality Quiz Data
const quizData = [
  {
    question: "During tough times, what do you prefer to do?",
    options: ["Make do with what you have", "Share with others", "Find creative solutions", "Wait for better times"]
  },
  {
    question: "What's your ideal meal situation?",
    options: ["Simple and filling", "Shared with family", "Whatever is available", "Traditional and comforting"]
  },
  {
    question: "How do you handle scarcity?",
    options: ["Adapt and improvise", "Help others first", "Stay positive", "Remember better times"]
  },
  {
    question: "What's most important to you?",
    options: ["Survival", "Community", "Tradition", "Hope"]
  },
  {
    question: "Your ideal cooking method?",
    options: ["One-pot meals", "Family recipes", "Whatever works", "Simple and fast"]
  },
  {
    question: "What motivates you most?",
    options: ["Practical needs", "Caring for others", "Cultural pride", "Future dreams"]
  },
  {
    question: "How do you see food?",
    options: ["Necessity for survival", "Way to bring people together", "Connection to home", "Source of comfort"]
  },
  {
    question: "What's your approach to challenges?",
    options: ["Face them head-on", "Work with others", "Draw on experience", "Stay optimistic"]
  }
];

// Quiz state
let currentQuestion = 0;
let userAnswers = [];

// DOM references
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');

// Event listeners
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', nextQuestion);
submitBtn.addEventListener('click', submitQuiz);
restartBtn.addEventListener('click', restartQuiz);

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

  // Progress bar
  const progress = ((currentQuestion + 1) / quizData.length) * 100;
  document.getElementById('progress').style.width = progress + '%';

  // Question counter
  document.getElementById('current-question').textContent = currentQuestion + 1;
  document.getElementById('total-questions').textContent = quizData.length;

  // Options
  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = '';
  question.options.forEach((option, index) => {
    const optionElement = document.createElement('div');
    optionElement.className = 'option';
    optionElement.textContent = option;
    optionElement.addEventListener('click', () => selectOption(index));
    optionsContainer.appendChild(optionElement);
  });

  // Hide buttons until an option is chosen
  nextBtn.classList.add('hidden');
  submitBtn.classList.add('hidden');
}

function selectOption(selectedIndex) {
  // Clear previous selection
  document.querySelectorAll('.option').forEach(opt => opt.classList.remove('selected'));
  // Highlight new selection
  document.querySelectorAll('.option')[selectedIndex].classList.add('selected');
  // Save answer
  userAnswers[currentQuestion] = selectedIndex;

  // Show appropriate button
  if (currentQuestion === quizData.length - 1) {
    submitBtn.classList.remove('hidden');
  } else {
    nextBtn.classList.remove('hidden');
  }
}

function nextQuestion() {
  currentQuestion++;
  showQuestion();
}

function submitQuiz() {
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

  // Personalities
  let personality, description, emoji, color;
  switch (maxIndex) {
    case 0:
      personality = 'Rice & Salt Fish';
      description = "You're practical and resilient, like the staple rice and preserved fish that sustained Singaporeans during the occupation.";
      emoji = '🍚🐟';
      color = '#8B4513';
      break;
    case 1:
      personality = 'Kopi & Kaya Toast';
      description = "You're social and community-minded, like the kopi shops that brought people together during difficult times.";
      emoji = '☕🍞';
      color = '#D2691E';
      break;
    case 2:
      personality = 'Sweet Potato & Cassava';
      description = "You're creative and resourceful, like the root vegetables that became survival foods.";
      emoji = '🍠🌿';
      color = '#228B22';
      break;
    case 3:
      personality = 'Teh Tarik & Curry';
      description = "You're traditional and hopeful, like the beloved local flavors that provided comfort.";
      emoji = '🧋🍛';
      color = '#FF6347';
      break;
    default:
      personality = 'Mixed Heritage Stew';
      description = "You're a blend of all Singaporean qualities — resilient, social, creative, and traditional.";
      emoji = '🍲🇸🇬';
      color = '#4B0082';
  }

  // Update results
  document.getElementById('score').textContent = personality;
  document.getElementById('total-score').textContent = 'Personality';
  const msg = document.getElementById('score-message');
  msg.textContent = description + ' ' + emoji;
  msg.style.color = color;
}

function restartQuiz() {
  resultsScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
}