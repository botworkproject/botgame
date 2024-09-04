// script.js
document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-button");
    const gameBoard = document.getElementById("game-board");
    const key = document.getElementById("key");

    let isDragging = false;
    let draggedElement = null;

    // Initialize block positions
    const blockPositions = {
        block1: { top: 50, left: 50 },
        block2: { top: 150, left: 200 },
        block3: { top: 250, left: 50 },
        block4: { top: 200, left: 300 },
    };

    function updateBlockPositions() {
        Object.keys(blockPositions).forEach(blockId => {
            const block = document.getElementById(blockId);
            block.style.top = `${blockPositions[blockId].top}px`;
            block.style.left = `${blockPositions[blockId].left}px`;
        });
    }

    function startGame() {
        startButton.style.display = "none";
        key.style.top = "0px";
        key.style.left = "0px";
        updateBlockPositions();
    }

    function handleMouseDown(event) {
        if (event.target.classList.contains("block")) {
            isDragging = true;
            draggedElement = event.target;
            draggedElement.style.zIndex = 1000;
        }
    }

    function handleMouseMove(event) {
        if (isDragging && draggedElement) {
            const rect = gameBoard.getBoundingClientRect();
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;

            draggedElement.style.left = `${x - draggedElement.offsetWidth / 2}px`;
            draggedElement.style.top = `${y - draggedElement.offsetHeight / 2}px`;
        }
    }

    function handleMouseUp() {
        if (isDragging && draggedElement) {
            isDragging = false;
            draggedElement.style.zIndex = "";
            draggedElement = null;
        }
    }

    startButton.addEventListener("click", startGame);
    gameBoard.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
});
