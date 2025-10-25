// Singapore WWII Food Personality Quiz Data
const quizData = [
    {
        question: "During tough times, what do you prefer to do?",
        options: ["Make do with what you have", "Share with others", "Find creative solutions", "Wait for better times"],
        correct: 0 // All answers are valid for personality
    },
    {
        question: "What's your ideal meal situation?",
        options: ["Simple and filling", "Shared with family", "Whatever is available", "Traditional and comforting"],
        correct: 0
    },
    {
        question: "How do you handle scarcity?",
        options: ["Adapt and improvise", "Help others first", "Stay positive", "Remember better times"],
        correct: 0
    },
    {
        question: "What's most important to you?",
        options: ["Survival", "Community", "Tradition", "Hope"],
        correct: 0
    },
    {
        question: "Your ideal cooking method?",
        options: ["One-pot meals", "Family recipes", "Whatever works", "Simple and fast"],
        correct: 0
    },
    {
        question: "What motivates you most?",
        options: ["Practical needs", "Caring for others", "Cultural pride", "Future dreams"],
        correct: 0
    },
    {
        question: "How do you see food?",
        options: ["Necessity for survival", "Way to bring people together", "Connection to home", "Source of comfort"],
        correct: 0
    },
    {
        question: "What's your approach to challenges?",
        options: ["Face them head-on", "Work with others", "Draw on experience", "Stay optimistic"],
        correct: 0
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
    // Calculate personality based on answers
    showResults();
}

function showResults() {
    // Hide quiz screen and show results screen
    quizScreen.classList.add('hidden');
    resultsScreen.classList.remove('hidden');
    
    // Calculate personality based on answers
    const answers = userAnswers;
    let personality = '';
    let description = '';
    let emoji = '';
    let color = '';
    
    // Simple personality calculation based on answer patterns
    const answerCounts = [0, 0, 0, 0];
    answers.forEach(answer => {
        if (answer !== undefined) answerCounts[answer]++;
    });
    
    const maxIndex = answerCounts.indexOf(Math.max(...answerCounts));
    
    // Singapore WWII Food Personalities
    switch(maxIndex) {
        case 0: // Mostly A answers
            personality = 'Rice & Salt Fish';
            description = 'You\'re practical and resilient, like the staple rice and preserved fish that sustained Singaporeans during the occupation. You adapt to any situation and make the most of what you have.';
            emoji = '🍚🐟';
            color = '#8B4513';
            break;
        case 1: // Mostly B answers
            personality = 'Kopi & Kaya Toast';
            description = 'You\'re social and community-minded, like the kopi shops that brought people together during difficult times. You value relationships and sharing with others.';
            emoji = '☕🍞';
            color = '#D2691E';
            break;
        case 2: // Mostly C answers
            personality = 'Sweet Potato & Cassava';
            description = 'You\'re creative and resourceful, like the root vegetables that became survival foods. You find innovative solutions and stay positive even in tough times.';
            emoji = '🍠🌿';
            color = '#228B22';
            break;
        case 3: // Mostly D answers
            personality = 'Teh Tarik & Curry';
            description = 'You\'re traditional and hopeful, like the beloved local flavors that provided comfort. You draw strength from culture and look forward to better times.';
            emoji = '🧋🍛';
            color = '#FF6347';
            break;
        default:
            personality = 'Mixed Heritage Stew';
            description = 'You\'re a blend of all Singaporean qualities - resilient, social, creative, and traditional. You represent the diverse spirit of Singapore during WWII.';
            emoji = '🍲🇸🇬';
            color = '#4B0082';
    }
    
    // Update the display
    document.getElementById('score').textContent = personality;
    document.getElementById('total-score').textContent = 'Personality';
    document.getElementById('score-message').textContent = description + ' ' + emoji;
    document.getElementById('score-message').style.color = color;
}

function restartQuiz() {
    // Hide results screen and show start screen
    resultsScreen.classList.add('hidden');
    startScreen.classList.remove('hidden');
}