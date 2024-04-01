let x_win = 0;
let o_win = 0;
function generateBoard() {
  let table = document.createElement('table');
  table.className = 'tic-tac-toe';
  let currentPlayer = 'X';
  let boardSizeInput = Number(document.getElementById("boardSize").value);
  let moveCount = 0;
  let totalMove = boardSizeInput*boardSizeInput;

  let board = Array.from({length: boardSizeInput }, () =>
    Array(boardSizeInput).fill('.')
  );

  for (let i = 0; i < boardSizeInput; i++) {
    let tr = document.createElement('tr');    
    for (let j = 0; j < boardSizeInput; j++) {
      let td = document.createElement('td');
      let button = document.createElement('button');
      
      button.textContent =`+`;
      button.addEventListener('click', () => {
        
        button.textContent = currentPlayer;
        
        currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
        if (board[i][j] === '.') {
          board[i][j] = currentPlayer;
        } else {
          alert("Already marked. Try again.");
        }
        checkWinner(board, currentPlayer, boardSizeInput, x_win, o_win);

        button.textContent = currentPlayer;
        
        button.disabled = true;
        moveCount++;
        if (moveCount === totalMove) {
          alert("Tie game")
        }
      });
      td.appendChild(button);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  document.getElementById("board").appendChild(table);
}

function checkRows(board, currentPlayer, boardSizeInput, x_win, o_win) {
  var countWin = boardSizeInput;
  for (let i = 0; i < boardSizeInput; i++) {
    var count = 0;
    var winArray = []  
    for (let j = 0; j < boardSizeInput; j++) {
      if (board[i][j] === currentPlayer) {
        count++;
        if (count === countWin) {
          alert("Player " + currentPlayer + " has won in row");
          console.log(count + " : " + countWin)
          addScore(currentPlayer);
        }
        
        winArray.push(Array(i,j));

      } else {
        count = 0;
        winArray = [];
      }
      
    }
  }
  
}

function checkCols(board, currentPlayer, boardSizeInput, x_win, o_win) {
  var countWin = boardSizeInput;
  for (let j = 0; j < boardSizeInput; j++) {
    var count = 0;
    var winArray = []  
    for (let i = 0; i < boardSizeInput; i++) {
      if (board[i][j] === currentPlayer) {
        count++;
        if (count === countWin) {
          alert("Player " + currentPlayer + " has won in col");
          console.log(count + " : " + countWin)
          addScore(currentPlayer);
        }
        
        winArray.push(Array(i,j));

      } else {
        count = 0;
        winArray = [];
      }
    }
  }
}

function checkDiagLR(board, currentPlayer, boardSizeInput, x_win, o_win) {
  var count = 0;
  var countWin = boardSizeInput;
  var winArray = [];
  var maxLength = boardSizeInput - countWin + 1;

  // Check winer from top left to bottom right by diagonal
  for (let rowStart = 0; rowStart < maxLength; rowStart++) {
    for (let i = rowStart, j =0; i < boardSizeInput && j < boardSizeInput; i++, j++) {
      if (board[i][j] === currentPlayer) {
        count++;
        if (count === countWin) {
          alert("Player " + currentPlayer + " has won diagonal R to L");
          console.log(count + " : " + countWin)
          addScore(currentPlayer);
        }
        
        winArray.push(Array(i,j));

      } else {
        count = 0;
        winArray = [];
      }
    }
  }
}

function checkDiagRL(board, currentPlayer, boardSizeInput, x_win, o_win) {
  var count = 0;
  var countWin = boardSizeInput;
  var winArray = [];
  var maxLength = boardSizeInput - countWin + 1;

  // Check winer from top right to bottom left by diagonal
  for (let rowStart = 0; rowStart < maxLength; rowStart++) {
    for (let i = rowStart, j = (boardSizeInput - 1); i < boardSizeInput && j >= 0; i++, j--) {
      if (board[i][j] === currentPlayer) {
        count++;
        if (count === countWin) {
          alert("Player " + currentPlayer + " has won diagonal R to L");
          console.log(count + " : " + countWin)
          addScore(currentPlayer);
        }
        
        winArray.push(Array(i,j));

      } else {
        count = 0;
        winArray = [];
      }
    }
  }
}

function checkWinner(board, currentPlayer, boardSizeInput) {
  if (checkRows (board, currentPlayer, boardSizeInput)) {
    return true;
  }
  if (checkCols(board, currentPlayer, boardSizeInput)) {
    return true;
  }
  if (checkDiagLR(board, currentPlayer, boardSizeInput)) {
    return true;
  }
  if (checkDiagRL(board, currentPlayer, boardSizeInput)) {
    return true;
  }
}

function addScore (currentPlayer) {
  if (currentPlayer === "X") {
    x_win++
    $('#x_win').text(x_win)
  } else if (currentPlayer === "O") {
    o_win++
    $('#o_win').text(o_win)
  }
}