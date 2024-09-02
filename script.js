document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-button");
    const gameContainer = document.getElementById("game");
    const startImage = document.getElementById("start-image");
    const backgroundMusic = document.getElementById("background-music");
    const flagElement = document.getElementById("flag");
    const optionButtons = document.querySelectorAll(".option-button");
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
        console.log("Start Button Clicked");
        startButton.style.display = "none";
        startImage.style.display = "none";
        gameContainer.classList.remove("hidden");
        startGame();
    });

    optionButtons.forEach(button => {
        button.addEventListener("click", checkAnswer);
    });

    function startGame() {
        console.log("Game Started");
        backgroundMusic.play();
        loadNewFlag();
        startTimer();
    }

    function loadNewFlag() {
        const countryCodes = Object.keys(countries);
        const randomIndex = Math.floor(Math.random() * countryCodes.length);
        currentCountry = countryCodes[randomIndex];
        flagElement.src = `png250px/${currentCountry}.png`;

        console.log("Loaded Flag:", flagElement.src);

        if (!flagElement.src || !flagElement.src.includes(currentCountry)) {
            console.error("Flag image not found for country code:", currentCountry);
        } else {
            console.log("Flag image loaded successfully:", currentCountry);
        }

        // Generate options
        const correctAnswer = countries[currentCountry];
        const options = [correctAnswer];
        while (options.length < 4) {
            const randomOption = countries[countryCodes[Math.floor(Math.random() * countryCodes.length)]];
            if (!options.includes(randomOption)) {
                options.push(randomOption);
            }
        }
        shuffleArray(options);
        optionButtons.forEach((button, index) => {
            button.textContent = options[index];
            button.style.display = "block"; // Ensure buttons are visible
            console.log(`Option ${index + 1}:`, options[index]);
        });
    }

    function startTimer() {
        console.log("Timer Started");
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

    function checkAnswer(event) {
        const userAnswer = event.target.textContent;
        console.log("User Answer:", userAnswer);
        if (userAnswer === countries[currentCountry]) {
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

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
});
