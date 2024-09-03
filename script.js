document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-button");
    const keyElement = document.getElementById("key");
    const lockElement = document.getElementById("lock");
    const gameBoard = document.getElementById("game-board");
    const gameOverScreen = document.getElementById("game-over");
    const finalScoreElement = document.getElementById("final-score");
    const restartButton = document.getElementById("restart-button");
    const scoreElement = document.getElementById("current-score");
    const timerElement = document.getElementById("time-left");

    let score = 0;
    let timeLeft = 30;
    let timer;
    let isDragging = false;

    startButton.addEventListener("click", function() {
        startButton.style.display = "none";
        gameOverScreen.classList.add("hidden");
        gameBoard.style.cursor = "move";

        // Make the key draggable
        keyElement.addEventListener("mousedown", function(event) {
            isDragging = true;
            document.addEventListener("mousemove", moveKey);
            document.addEventListener("mouseup", function() {
                isDragging = false;
                document.removeEventListener("mousemove", moveKey);
            });
        });

        function moveKey(event) {
            if (isDragging) {
                keyElement.style.left = `${event.clientX - gameBoard.offsetLeft - keyElement.offsetWidth / 2}px`;
                keyElement.style.top = `${event.clientY - gameBoard.offsetTop - keyElement.offsetHeight / 2}px`;

                // Check for collision with the lock
                if (checkCollision(keyElement, lockElement)) {
                    score += 100;
                    scoreElement.textContent = score;
                    alert("Congratulations! You found the lock!");
                    endGame();
                }
            }
        }

        function checkCollision(element1, element2) {
            const rect1 = element1.getBoundingClientRect();
            const rect2 = element2.getBoundingClientRect();

            return !(rect1.right < rect2.left ||
                     rect1.left > rect2.right ||
                     rect1.bottom < rect2.top ||
                     rect1.top > rect2.bottom);
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
            clearInterval(timer);
            gameBoard.style.cursor = "default";
            gameOverScreen.classList.remove("hidden");
            finalScoreElement.textContent = score;
        }

        startTimer();
    });

    restartButton.addEventListener("click", function() {
        location.reload();
    });
});
