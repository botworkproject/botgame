document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-button");
    const gameContainer = document.getElementById("game");
    const keyElement = document.getElementById("key");
    const blocks = document.querySelectorAll(".block");

    let keyX = 0;
    let keyY = 0;

    startButton.addEventListener("click", function() {
        startButton.style.display = "none";
        gameContainer.classList.remove("hidden");
        startGame();
    });

    function startGame() {
        // Set up the initial game state
        keyX = 0;
        keyY = 0;
        keyElement.style.left = `${keyX}px`;
        keyElement.style.top = `${keyY}px`;

        blocks.forEach(block => {
            block.addEventListener("mousedown", function(e) {
                let shiftX = e.clientX - block.getBoundingClientRect().left;
                let shiftY = e.clientY - block.getBoundingClientRect().top;

                function moveAt(pageX, pageY) {
                    block.style.left = pageX - shiftX + 'px';
                    block.style.top = pageY - shiftY + 'px';
                }

                function onMouseMove(e) {
                    moveAt(e.pageX, e.pageY);
                }

                document.addEventListener('mousemove', onMouseMove);

                block.onmouseup = function() {
                    document.removeEventListener('mousemove', onMouseMove);
                    block.onmouseup = null;
                };
            });

            block.ondragstart = function() {
                return false;
            };
        });

        keyElement.addEventListener("dragstart", function(e) {
            e.preventDefault();
        });

        document.addEventListener("keydown", function(e) {
            switch(e.code) {
                case "ArrowLeft":
                    keyX = Math.max(0, keyX - 10);
                    break;
                case "ArrowRight":
                    keyX = Math.min(gameContainer.offsetWidth - keyElement.offsetWidth, keyX + 10);
                    break;
                case "ArrowUp":
                    keyY = Math.max(0, keyY - 10);
                    break;
                case "ArrowDown":
                    keyY = Math.min(gameContainer.offsetHeight - keyElement.offsetHeight, keyY + 10);
                    break;
            }
            keyElement.style.left = `${keyX}px`;
            keyElement.style.top = `${keyY}px`;
        });
    }
});
