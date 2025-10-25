// Quiz data - you can easily add more questions here
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correct: 1
    },
    {
        question: "Which ocean is the largest?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correct: 3
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correct: 2
    }
];

// Variables to track quiz state
let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// Get references to HTML elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultsScreen = document.getElementById('results-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');

// Start the quiz
startBtn.addEventListener('click', startQuiz);

// Next question button
nextBtn.addEventListener('click', nextQuestion);

// Submit quiz button
submitBtn.addEventListener('click', submitQuiz);

// Restart quiz button
restartBtn.addEventListener('click', restartQuiz);

function startQuiz() {
    // Hide start screen and show quiz screen
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    
    // Reset quiz state
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    
    // Show first question
    showQuestion();
}

function showQuestion() {
    const question = quizData[currentQuestion];
    
    // Update question text
    document.getElementById('question-text').textContent = question.question;
    
    // Update progress bar
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    document.getElementById('progress').style.width = progress + '%';
    
    // Update question counter
    document.getElementById('current-question').textContent = currentQuestion + 1;
    document.getElementById('total-questions').textContent = quizData.length;
    
    // Create option buttons
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionElement);
    });
    
    // Hide/show appropriate buttons
    nextBtn.classList.add('hidden');
    submitBtn.classList.add('hidden');
}

function selectOption(selectedIndex) {
    // Remove previous selection
    document.querySelectorAll('.option').forEach(option => {
        option.classList.remove('selected');
    });
    
    // Mark selected option
    document.querySelectorAll('.option')[selectedIndex].classList.add('selected');
    
    // Store user's answer
    userAnswers[currentQuestion] = selectedIndex;
    
    // Show next button or submit button
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
    // Calculate score
    score = 0;
    quizData.forEach((question, index) => {
        if (userAnswers[index] === question.correct) {
            score++;
        }
    });
    
    // Show results
    showResults();
}

function showResults() {
    // Hide quiz screen and show results screen
    quizScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    
    // Update score display
    document.getElementById('score').textContent = score;
    document.getElementById('total-score').textContent = quizData.length;
    
    // Update score message
    const percentage = (score / quizData.length) * 100;
    let message = '';
    
    if (percentage === 100) {
        message = 'Perfect! You got them all right! 🎉';
    } else if (percentage >= 80) {
        message = 'Excellent work! 🌟';
    } else if (percentage >= 60) {
        message = 'Good job! 👍';
    } else {
        message = 'Keep practicing! 💪';
    }
    
    document.getElementById('score-message').textContent = message;
}

function restartQuiz() {
    // Hide results screen and show start screen
    resultsScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
}