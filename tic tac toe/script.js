const cells = document.querySelectorAll('[data-cell]');
const statusDisplay = document.querySelector('.status');
const resetButton = document.querySelector('.reset-button');

// Get the score elements
const scoreXDisplay = document.getElementById('scoreX');
const scoreODisplay = document.getElementById('scoreO');

// Initialize score variables
let scoreX = 0;
let scoreO = 0;

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

// Winning combinations
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle cell click
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    checkWinner();
    if (gameActive) {
        switchPlayer();
    }
}

// Function to switch the current player
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = `Player ${currentPlayer}'s turn`;
}

// Function to check if there is a winner
function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winPatterns.length; i++) {
        const winCondition = winPatterns[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        
        if (a === '' || b === '' || c === '') {
            continue;
        }
        
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `🎉 Player ${currentPlayer} has won! 🎉`;

        // Trigger confetti after showing the winning message
        launchConfetti();

        // Update score
        if (currentPlayer === 'X') {
            scoreX++;
            scoreXDisplay.innerHTML = scoreX;
        } else {
            scoreO++;
            scoreODisplay.innerHTML = scoreO;
        }

        gameActive = false;

        // Automatically reset the game after 3 seconds
        setTimeout(resetGame, 3000);
        return;
    }

    if (!gameState.includes("")) {
        statusDisplay.innerHTML = "It's a tie! 😐";
        gameActive = false;

        // Automatically reset the game after 3 seconds
        setTimeout(resetGame, 3000);
        return;
    }
}

// Function to trigger confetti animation
function launchConfetti() {
    var duration = 3 * 1000; // Duration of 3 seconds
    var end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// Function to reset the game
function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = `Player X's turn`;
    cells.forEach(cell => {
        cell.innerHTML = "";
    });
}

// Add event listeners
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
