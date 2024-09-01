let flags = [];
let score = 0;
let currentFlag = null;
let timer;
let timeLeft = 10;
let audio = document.getElementById('backgroundMusic');
let startButton = document.getElementById('startButton');

function startGame() {
    startButton.style.display = 'none'; // Hide the start button
    loadFlag();
    startTimer();
    playMusic();
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

function playMusic() {
    audio.play();
    audio.volume = 0.5; // Set volume level
    audio.playbackRate = 0.5; // Slow playback
}

function stopMusic() {
    audio.pause();
    audio.currentTime = 0; // Reset playback position
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
    setTimeout(() => {
        stopMusic();
        startButton.style.display = 'block'; // Show the start button again
    }, 2000); // Wait 2 seconds before showing the start button
}

// Attach event listener to start button
startButton.addEventListener('click', startGame);

// Load flag data from JSON file
fetch('countries.json')
    .then(response => response.json())
    .then(data => {
        flags = Object.entries(data).map(([code, name]) => ({
            src: `png250px/${code}.png`,
            name: name.toLowerCase()
        }));
    })
    .catch(error => console.error('Error loading flag data:', error));
