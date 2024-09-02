document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-button");
    const gameContainer = document.getElementById("game");
    const startImage = document.getElementById("start-image");
    const backgroundMusic = document.getElementById("background-music");
    const flagElement = document.getElementById("flag");
    const answerInput = document.getElementById("answer");
    const submitButton = document.getElementById("submit-answer");
    const timerElement = document.getElementById("time-left");
    const scoreElement = document.getElementById("current-score");

    let currentCountry = '';
    let score = 0;
    let timeLeft = 10;
    let timer;

    const countries = {
        "ad": "Andorra",
        "ae": "United Arab Emirates",
        "af": "Afghanistan",
        // Add more countries as needed
    };

    startButton.addEventListener("click", function() {
        startButton.style.display = "none";
        startImage.style.display = "none";
        gameContainer.classList.remove("hidden");
        startGame();
    });

    submitButton.addEventListener("click", checkAnswer);

    function startGame() {
        backgroundMusic.play();
        loadNewFlag();
        startTimer();
    }

    function loadNewFlag() {
        const countryCodes = Object.keys(countries);
        const randomIndex = Math.floor(Math.random() * countryCodes.length);
        currentCountry = countryCodes[randomIndex];
        flagElement.src = `png250px/${currentCountry}.png`;
        answerInput.value = '';
    }

    function startTimer() {
        timeLeft = 10;
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

    function checkAnswer() {
        const userAnswer = answerInput.value.trim().toLowerCase();
        if (userAnswer === countries[currentCountry].toLowerCase()) {
            score += 50;
            scoreElement.textContent = score;
            loadNewFlag();
            clearInterval(timer);
            startTimer();
        } else {
            endGame();
        }
    }

    function endGame() {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0;
        alert("Game over! Your score is " + score);
        location.reload();
    }
});
