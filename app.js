/* JavaScript for my tic tac toe game 
   created 10/28/2019 by Chris */
//variables for state management
let humanPlayer = "X"
let aiPlayer = "O"
let originalBoard
const winCombinations = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[6, 4, 2]
]

//collect all clickable elements on the table
const cells = document.getElementsByTagName('td')
startGame()

function startGame() {
	originalBoard = Array.from(Array(9).keys())
	for (let i = 0; i < cells.length; i++) {
		cells[i].innerText = ''
		cells[i].style.removeProperty('background-color')
		cells[i].addEventListener('click', setClick, false)
	}
}

function setClick(square) {
	turn(square.target.id, humanPlayer)
}

function turn(squareId, player) {
	originalBoard[squareId] = player
	document.getElementById(squareId).innerText = player
	let gameWin = checkWinner(originalBoard, player)
	if (gameWin) gameOver(gameWin)
}

function checkWinner(board, player) {
	let played = board.reduce((a, e, i) =>
			(e === player) ? a.concat(i) : a, [])
	let gameWin = null
	for (let [index, win] of winCombinations.entries()) {
		if (win.every(el => played.indexOf(el) > -1)) {
			gameWin = {index: index, player: player}
			console.log(gameWin)
			break
		}
	}
	return gameWin
}

function gameOver(game) {
	for (let index of winCombinations[game.index]) {
		document.getElementById(index).style.backgroundColor = 
			game.player == humanPlayer ? "green" : "red"
	}

	for (let i = 0; i < cells.length; i++) {
		cells[i].removeEventListener('click', setClick, false)
	}
}
