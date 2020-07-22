'use strict'
const MINE = '@'
const FLAG = '$'
    // var gBoard = {
    //     minesAroundCount: 4,
    //     isShown: true,
    //     isMine: false,
    //     isMarked: true
    // }
var gBoard;
var gLevel = {
    size: 4,
    MINES: 2
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function init() {
    gBoard = buildBoard(4, 4);
    addMines(2);
    setMinesNegsCount(gBoard)
    renderBoard(gBoard, '.board');
    console.table(gBoard)
}



function buildBoard(ROWS, COLS) {
    var gBoard = []
    for (var i = 0; i < ROWS; i++) {
        var row = []
        for (var j = 0; j < COLS; j++) {
            row.push(0)
        }
        gBoard.push(row)
    }
    console.log(gBoard);
    return gBoard
}


function addMines(numOfMine) {
    var counter = 0
    while (numOfMine > counter) {
        var selectedCell = getRandomCell(gBoard);
        if (gBoard[selectedCell.i][selectedCell.j] === MINE) continue;
        gBoard[selectedCell.i][selectedCell.j] = MINE;
        counter++
    }
}

function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            if (board[i][j] === MINE) {
                setMineNegsCountByCell({ i: i, j: j }, board)
            }
        }
    }
}

function setMineNegsCountByCell(pos, board) {
    for (var i = pos.i - 1; i <= pos.i + 1; i++) {
        for (var j = pos.j - 1; j <= pos.j + 1; j++) {
            if (i < board.length && i >= 0 && j >= 0 && board[i][j] !== MINE && j < board.length) {

                board[i][j]++
            }
        }
    }
}

function cellClicked(elCell, i, j) {
    var dataSet = elCell.dataSet;
    var pos = { i: i, j: j };
    var cell = gBoard[pos.i][pos.j];
    if (cell === MINE) {
        console.log('GAME OVER');
    } else {
        var el = document.querySelector('elCell')
    }

    console.log(i, j);
}