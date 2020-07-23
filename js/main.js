'use strict'
const MINE = '💣'
const FLAG = '🚩'
var gBoard;
var gLevels = [{
        size: 4,
        mines: 2
    },
    {
        size: 8,
        mines: 12
    },
    {
        size: 12,
        mines: 30
    }
]

var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

var timeInterval;
var gElTimer = document.querySelector('.timer');
var gElPopup = document.querySelector('.popup');
var gElPopupText = document.querySelector('.popup-text');

var gCurrentlevel = 0;

function init() {}

function desplayBoard(level) {
    gBoard = buildBoard(gLevels[level].size);
    renderBoard(gBoard, '.board');
}

function playGame(firstCell) {
    gElTimer.innerText = gGame.secsPassed;
    gGame.isOn = true;
    gGame.secsPassed = 0;
    startTimer();
}

function startGame(level) {
    gCurrentlevel = level;
    desplayBoard(gCurrentlevel);

}

function buildBoard(size) {
    var board = []
    for (var i = 0; i < size; i++) {
        var row = []
        for (var j = 0; j < size; j++) {
            var newCell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false
            }

            row.push(newCell)
        }
        board.push(row)
    }
    return board
}


function addMines(numOfMine, board, firstCell) {
    var counter = 0
    while (numOfMine > counter) {
        var selectedCell = getRandomCell(board);
        if (!(selectedCell.i === firstCell.i && selectedCell.j === firstCell.j) &&
            !board[selectedCell.i][selectedCell.j].isMine) {
            board[selectedCell.i][selectedCell.j].isMine = true;
            counter++
        }
    }
    console.log(board);
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            if (board[i][j].isMine) {
                setMineNegsCountByCell({ i: i, j: j }, board)
            }
        }
    }
}

function setMineNegsCountByCell(pos, board) {
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (i < board.length && i >= 0 && j >= 0 && j < board.length && !board[i][j].isMine) {

                board[i][j].minesAroundCount++
            }
        }
    }
}

function cellClicked(elCell, i, j) {
    var pos = { i: i, j: j };
    var cell = gBoard[pos.i][pos.j];
    if (!gGame.isOn) {
        addMines(gLevels[gCurrentlevel].mines, gBoard, pos);
        setMinesNegsCount(gBoard)
        playGame();
        elCell.innerText = cell.minesAroundCount;
        elCell.classList.add('show');
        gGame.shownCount++;
        return;
    };
    console.log(elCell, i, j);
    console.log("gBoard:", gBoard);
    if (cell.isMine) {
        elCell.innerText = MINE;
        elCell.classList.add('boom')
        console.log('GAME OVER');
        stopGame();
        setTimeout(() => desplayPopup('GAME OVER'), 700)
    } else {
        elCell.innerText = cell.minesAroundCount;
        if (!cell.isShown) {
            cell.isShown = true
            elCell.classList.add('show');
            gGame.shownCount++;
            checkWin();
        }
    }
}


function playNextLevel() {
    gCurrentlevel++;
    playGame()
}

function startTimer() {
    stopTimer();
    timeInterval = setInterval(() => {
        gGame.secsPassed++;
        gElTimer.innerText = gGame.secsPassed;
    }, 1000)
}

function stopGame() {
    gGame.isOn = false;
    stopTimer();
}

function stopTimer() {
    clearInterval(timeInterval)
}

function desplayPopup(text) {
    gElPopup.classList.remove('hiden');
    gElPopupText.innerText = text;

}

function restartGame() {
    gGame.secsPassed = 0;
    gElTimer.innerText = gGame.secsPassed;
    gGame.isOn = false;
    gGame.shownCount = 0;
    desplayBoard(gCurrentlevel);
    gElPopup.classList.add('hiden');
}

function cellRightClicked(elCell, i, j) {
    console.log("elCell:", elCell);
    if (!gGame.isOn) return;
    var pos = { i: i, j: j };
    var cell = gBoard[pos.i][pos.j];
    cell.isMarked = !cell.isMarked;

    elCell.innerText = cell.isMarked ? FLAG : '';

}

function checkWin() {
    console.log("gGame.shownCount:", gGame.shownCount);
    var level = gLevels[gCurrentlevel];
    if (gGame.shownCount === (level.size * level.size - level.mines)) {
        console.log("Win!!!");
        desplayPopup('YOU WIN!');
        stopGame();
    }
}