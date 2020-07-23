'use strict'

function renderBoard(board, selector) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j];
            var className = 'cell' + i + '-' + j;
            console.log("cell:", cell);
            if (!cell.isShown) {
                cell = '';
            } else if (cell.isMine) {
                cell = MINE;
            } else {
                cell = cell.minesAroundCount
            }
            strHTML += `<td class="cell ${className}" onClick="cellClicked(this,${i},${j})" oncontextmenu="cellRightClicked(this,${i},${j}); return false;"> ${cell} </td>`
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}

function getRandomCell(board) {
    var selectedCell = {
        i: getRandomIntInclusive(0, board.length - 1),
        j: getRandomIntInclusive(0, board.length - 1)
    }
    return selectedCell
}



function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}