const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Rome", "Berlin"],
        answer: "Paris"
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: "4"
    }
];

let currentQuestionIndex = 0;
const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-button');

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
    optionsElement.innerHTML = '';
    question.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'option';
        button.onclick = () => checkAnswer(option);
        optionsElement.appendChild(button);
    });
    nextButton.style.display = 'none';
}

function checkAnswer(selectedOption) {
    const question = questions[currentQuestionIndex];
    if (selectedOption === question.answer) {
        alert('Correct!');
    } else {
        alert('Wrong!');
    }
    nextButton.style.display = 'block';
}

nextButton.onclick = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        questionElement.textContent = 'Quiz completed!';
        optionsElement.innerHTML = '';
        nextButton.style.display = 'none';
    }
};

loadQuestion();
