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

    console.log("Start Button:", startButton);
    console.log("Game Container:", gameContainer);
    console.log("Key Element:", keyElement);
    console.log("Lock Element:", lockElement);
    console.log("Background Music:", backgroundMusic);
    console.log("Success Sound:", successSound);

    startButton.addEventListener("click", function() {
        console.log("Start Button Clicked");
        startButton.style.display = "none";
        gameContainer.classList.remove("hidden");
        startGame();
    });

    keyElement.addEventListener("dragstart", function(event) {
        console.log("Key Drag Started");
        event.dataTransfer.setData("text", "key");
    });

    lockElement.addEventListener("dragover", function(event) {
        event.preventDefault();
    });

    lockElement.addEventListener("drop", function(event) {
        event.preventDefault();
        const data = event.dataTransfer.getData("text");
        console.log("Dropped Data:", data);
        if (data === "key") {
            score += 100;
            scoreElement.textContent = score;
            successSound.play();
            loadNewLevel();
        }
    });

    function startGame() {
        console.log("Game Started");
        backgroundMusic.play();
        startTimer();
    }

    function loadNewLevel() {
        // Logic to increase difficulty, move key and lock positions, etc.
        console.log("New Level Loaded");
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

    function endGame() {
        backgroundMusic.pause();
        alert("Game over! Your score is " + score);
        location.reload();
    }
});
