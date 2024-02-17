document.addEventListener("DOMContentLoaded", function() {
    const cells = document.querySelectorAll(".cell");
    const status = document.getElementById("status");
    const resetButton = document.getElementById("reset");
    const endGameScreen = document.getElementById("end-game-screen");
    const endGameMessage = document.getElementById("end-game-message");
    const newGameButton = document.getElementById("new-game");
  
    let currentPlayer = "X";
    let moves = 0;
    let gameEnded = false;
  
    function checkWin() {
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
  
      for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
          return cells[a].innerText;
        }
      }
  
      return null;
    }
  
    function checkDraw() {
      return moves === 9;
    }
  
    function endGame(winner) {
      gameEnded = true;
      if (winner) {
        endGameMessage.textContent = `${winner} wins!`;
      } else {
        endGameMessage.textContent = "It's a draw!";
      }
      endGameScreen.style.display = "flex";
    }
  
    function handleClick(event) {
      if (gameEnded || event.target.textContent !== "") return;
  
      event.target.textContent = currentPlayer;
      moves++;
  
      const winner = checkWin();
      if (winner) {
        endGame(winner);
        return;
      }
  
      if (checkDraw()) {
        endGame(null);
        return;
      }
  
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      status.textContent = `Player ${currentPlayer}'s turn`;
    }
  
    function resetGame() {
      cells.forEach(cell => {
        cell.textContent = "";
      });
      currentPlayer = "X";
      moves = 0;
      gameEnded = false;
      status.textContent = `Player ${currentPlayer}'s turn`;
      endGameScreen.style.display = "none";
    }
  
    function startNewGame() {
      resetGame();
    }
  
    cells.forEach(cell => {
      cell.addEventListener("click", handleClick);
    });
  
    resetButton.addEventListener("click", resetGame);
    newGameButton.addEventListener("click", startNewGame);
  
    status.textContent = `Player ${currentPlayer}'s turn`;
  });
  
