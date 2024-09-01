let flags = [];
let score = 0;
let currentFlag = null;
let timer;
let timeLeft = 10;

// Load flag data from JSON file
fetch('countries.json')
    .then(response => response.json())
    .then(data => {
        // Convert JSON data to flag objects
        flags = Object.entries(data).map(([code, name]) => ({
            src: `png250px/${code}.png`,
            name: name.toLowerCase() // Convert country names to lowercase
        }));
        startGame();
    })
    .catch(error => console.error('Error loading flag data:', error));

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
    const userAnswer = document.getElementById('answer').value.trim().toLowerCase();
    checkAnswer(userAnswer);
}

function checkAnswer(userAnswer) {
    if (userAnswer === currentFlag.name) {
        score += 50;
        document.getElementById('feedback').innerText = 'Correct! +50 points';
    } else {
        document.getElementById('feedback').innerText = `Wrong! The correct answer was ${currentFlag.name.charAt(0).toUpperCase() + currentFlag.name.slice(1)}`;
    }
    document.getElementById('score').innerText = `Score: ${score}`;
    setTimeout(startGame, 2000); // Wait 2 seconds before loading the next flag
}
