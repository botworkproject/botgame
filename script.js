let flags = [];
let currentFlag = null;
let score = 0;
let timerInterval;
let timeLeft = 10;

function startGame() {
    document.getElementById('background-music').play();
    loadFlag();
    timeLeft = 10;
    document.getElementById('timer').innerText = `Time Left: ${timeLeft}s`;

    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `Time Left: ${timeLeft}s`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            document.getElementById('background-music').pause();
            document.getElementById('feedback').innerText = `Time's up! The correct answer was ${currentFlag.name}.`;
            document.getElementById('feedback').style.color = 'red';
        }
    }, 1000);
}

function loadFlag() {
    fetch('countries.json')
        .then(response => response.json())
        .then(data => {
            flags = Object.entries(data).map(([code, name]) => ({
                src: `png250px/${code.toLowerCase()}.png`,
                name: name.toLowerCase()
            }));
            showRandomFlag();
        })
        .catch(error => console.error('Error loading flag data:', error));
}

function showRandomFlag() {
    const randomIndex = Math.floor(Math.random() * flags.length);
    currentFlag = flags[randomIndex];
    document.getElementById('flag').src = currentFlag.src;
    document.getElementById('feedback').innerText = '';
}

function checkAnswer() {
    const userAnswer = document.getElementById('answer').value.toLowerCase();
    if (userAnswer === currentFlag.name) {
        score += 50;
        document.getElementById('feedback').innerText = 'Correct!';
        document.getElementById('feedback').style.color = 'green';
        document.getElementById('score').innerText = `Score: ${score}`;
        clearInterval(timerInterval);
        document.getElementById('background-music').pause();
        loadFlag();
    } else {
        document.getElementById('feedback').innerText = `Incorrect. The correct answer was ${currentFlag.name}.`;
        document.getElementById('feedback').style.color = 'red';
    }
}
