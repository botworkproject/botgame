document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-button");
    const gameContainer = document.getElementById("game");
    const keyElement = document.getElementById("key");
    const lockElement = document.getElementById("lock");
    const backgroundMusic = document.getElementById("background-music");
    const successSound = document.getElementById("success-sound");
    const timerElement = document.getElementById("time-left");
    const scoreElement = document.getElementById("current-score");

    let score = 0;
    let timeLeft = 30;
    let timer;

    startButton.addEventListener("click", function() {
        startButton.style.display = "none";
        gameContainer.classList.remove("hidden");
        startGame();
    });

    keyElement.addEventListener("dragstart", function(event) {
        event.dataTransfer.setData("text", "key");
    });

    lockElement.addEventListener("dragover", function(event) {
        event.preventDefault();
    });

    lockElement.addEventListener("drop", function(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData("text");
        if (data === "key") {
            score += 100;
            scoreElement.textContent = score;
            playSuccessSound();
            loadNewLevel();
        }
    });

    function startGame() {
        // Ensure background music starts and is not already playing
        if (backgroundMusic.paused) {
            backgroundMusic.play();
        }
        startTimer();
    }

    function playSuccessSound() {
        // Stop any playing background music before playing success sound
        if (!successSound.paused) {
            successSound.pause();
            successSound.currentTime = 0; // Reset to start
        }
        successSound.play();
    }

    function startTimer() {
        timerElement.textContent = timeLeft;
        timer = setInterval(function() {
            timeLeft--;
            timerElement.textContent = timeLeft;
            if (timeLeft === 0) {
                clearInterval(timer);
                endGame();
            }
        }, 1000);
    }

    function loadNewLevel() {
        // Logic to increase difficulty, move key and lock positions, etc.
    }

    function endGame() {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0; // Reset to start
        alert("Game over! Your score is " + score);
        location.reload();
    }
});
