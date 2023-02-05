const box = document.querySelectorAll(".box");
const win = document.querySelector("#player-win");
const winsX = document.querySelector("#wins-X");
const winsO = document.querySelector("#wins-O");
const buttonNext = document.querySelector("#next")
const buttonReset = document.querySelector("#reset-game")

let gameOver = false;
let currentPlayer = "X";
let playerX = 0;
let playerO = 0;


const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const board = Array(9).fill(null);



function checkWin(player) {
 
  for (const condition of winConditions) {
    if (condition.every(i => board[i] === player)) {
      return true;

    } else {
      const BoardFull = board.every(element => element !== null);
      if (BoardFull) {
        win.innerHTML = "Nobody wins =(";
        let audioNoWin = new Audio("./audio/nobody_win.mp3");
        audioNoWin.play();
        return;
      }
    }
  }
  return false;

}


box.forEach((boxs, index) => {

  boxs.addEventListener('mouseover', function() {
    if (!board[index] && !gameOver) {
      this.style.color = currentPlayer === "X" ? "#000B30" : "#4F4400";
      this.style.backgroundColor = currentPlayer === "X" ? "#132B79" : "#A79000";
      this.innerHTML = currentPlayer;
    }
  });
  boxs.addEventListener('mouseout', function() {
    if (!board[index] && !gameOver) {
      this.style.backgroundColor = "";
      this.style.color = "#000";
      this.innerHTML = "";
    }
  });

  boxs.addEventListener('click', function() {
    let audioClick = new Audio("./audio/click.mp3")
    audioClick.play();
    if (!board[index] && !gameOver) {
      this.innerHTML = currentPlayer;
      board[index] = currentPlayer;
      if (checkWin(currentPlayer)) {
        win.innerHTML = `Player ${currentPlayer} wins!`;
        let audioWin = new Audio("./audio/win.mp3") 
        audioWin.play();
        if (currentPlayer === "X") {
          playerX++;
          winsX.textContent = "Wins X: " + playerX;
        } else {
          playerO++;
          winsO.textContent = "Wins O: " + playerO;
        }
        gameOver = true;
        // board.fill(null);
      }
      currentPlayer = (currentPlayer === "X") ? "O" : "X";
      this.style.backgroundColor = currentPlayer === "X" ? "#F8DD36" : "#2B5BFF";
      this.style.color = "#000";
    } 
  });

 
});

buttonNext.addEventListener('click', function() {
  let audioNext = new Audio("./audio/next.mp3");
  audioNext.play();
  board.fill(null);
  gameOver = false;
  box.forEach(boxs => {
    boxs.innerHTML = "";
    boxs.style.backgroundColor = "";
  });
});

buttonReset.addEventListener('click', function(){
  let audioResetGame = new Audio("./audio/reset.mp3");
  audioResetGame.play();
  board.fill(null);
  gameOver = false;
  winsX.innerHTML = "Wins X: ";
  winsO.innerHTML = "Wins O: ";
  win.innerHTML = "";

  box.forEach(boxs => {
    boxs.innerHTML = "";
    boxs.style.backgroundColor = "";
  });
});