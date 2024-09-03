document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-button");
    const keyElement = document.getElementById("key");
    const targetElement = document.getElementById("target");
    const scoreElement = document.getElementById("current-score");
    const timerElement = document.getElementById("time-left");

    let score = 0;
    let timeLeft = 30;
    let timer;

    startButton.addEventListener("click", function() {
        startButton.style.display = "none";
        startGame();
    });

    keyElement.addEventListener("mousedown", function(event) {
        const initialX = event.clientX;
        const initialY = event.clientY;
        const initialLeft = keyElement.offsetLeft;
        const initialTop = keyElement.offsetTop;

        function onMouseMove(event) {
            const deltaX = event.clientX - initialX;
            const deltaY = event.clientY - initialY;
            keyElement.style.left = `${initialLeft + deltaX}px`;
            keyElement.style.top = `${initialTop + deltaY}px`;
        }

        function onMouseUp() {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseup", onMouseUp);
            checkCollision();
        }

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
    });

    function checkCollision() {
        const keyRect = keyElement.getBoundingClientRect();
        const targetRect = targetElement.getBoundingClientRect();
        
        if (
            keyRect.left < targetRect.left + targetRect.width &&
            keyRect.left + keyRect.width > targetRect.left &&
            keyRect.top < targetRect.top + targetRect.height &&
            keyRect.top + keyRect.height > targetRect.top
        ) {
            score += 100;
            scoreElement.textContent = score;
            // Move target to a new position or handle level completion
        }
    }

    function startGame() {
        timerElement.textContent = timeLeft;
        timer = setInterval(function() {
            timeLeft--;
            timerElement.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                endGame();
            }
        }, 1000);
    }

    function endGame() {
        alert("Game over! Your score is " + score);
        location.reload();
    }
});
