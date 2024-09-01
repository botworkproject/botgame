const flags = [
    { src: 'path/to/flag1.png', name: 'Country1' },
    { src: 'path/to/flag2.png', name: 'Country2' },
    // Add more flags here
];

let score = 0;
let currentFlag = null;
let timer;
let timeLeft = 10;

function startGame() {
    loadFlag();
    startTimer();
}

function loadFlag() {
    const randomIndex = Math.floor(Math.random() * flags.length);
    currentFlag = flags[randomIndex];
    document.getElementById('flag').src = currentFlag.src;
    document.getElementById('feedback').innerText = '';
}

function startTimer() {
    timeLeft = 10;
    document.getElementById('timer').innerText = timeLeft;
    timer = setInterval(() => {
        timeLeft -= 1;
        document.getElementById('timer').innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer('');
        }
    }, 1000);
}

function submitAnswer() {
    clearInterval(timer);
    const userAnswer = document.getElementById('answer').value.trim();
    checkAnswer(userAnswer);
}

function checkAnswer(userAnswer) {
    if (userAnswer.toLowerCase() === currentFlag.name.toLowerCase()) {
        score += 50;
        document.getElementById('feedback').innerText = 'Correct! +50 points';
    } else {
        document.getElementById('feedback').innerText = `Wrong! The correct answer was ${currentFlag.name}`;
    }
    document.getElementById('score').innerText = `Score: ${score}`;
    setTimeout(startGame, 2000); // Wait 2 seconds before loading the next flag
}

// Start the game when the page loads
window.onload = startGame;
