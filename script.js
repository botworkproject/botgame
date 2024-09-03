body {
    margin: 0;
    padding: 0;
    font-family: Arial, sans-serif;
    background: url('https://raw.githubusercontent.com/botworkproject/botgame/main/background.jpg') no-repeat center center fixed;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

#game-container {
    text-align: center;
    background: rgba(255, 255, 255, 0.8);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
}

h1 {
    margin-bottom: 20px;
}

#game-board {
    position: relative;
    width: 600px; /* Adjust as needed */
    height: 400px; /* Adjust as needed */
    background: #f0f0f0; /* Game background color */
    border: 2px solid #000; /* Border for the game area */
    margin: 0 auto;
}

#key {
    width: 50px;
    position: absolute;
    cursor: pointer;
}

#lock {
    width: 50px;
    position: absolute;
}

button {
    padding: 10px 20px;
    margin-top: 20px;
    font-size: 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #45a049;
}
