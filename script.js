document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("start-button");
    const gameBoard = document.getElementById("game-board");
    const scoreElement = document.getElementById("current-score");
    
    let score = 0;
    let blocks = [];
    
    startButton.addEventListener("click", startGame);

    function startGame() {
        score = 0;
        scoreElement.textContent = score;
        gameBoard.innerHTML = ''; // Clear previous game content
        createBlocks();
    }

    function createBlocks() {
        // Example blocks for demonstration
        for (let i = 0; i < 5; i++) {
            const block = document.createElement('div');
            block.className = 'block';
            block.style.width = '50px';
            block.style.height = '50px';
            block.style.background = 'red';
            block.style.position = 'absolute';
            block.style.left = `${Math.random() * (gameBoard.offsetWidth - 50)}px`;
            block.style.top = `${Math.random() * (gameBoard.offsetHeight - 50)}px`;
            gameBoard.appendChild(block);
            blocks.push(block);
        }
    }

    // Add more game logic here
});
