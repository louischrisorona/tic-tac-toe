/* JavaScript for my tic tac toe game 
   created 10/28/2019 by Chris */
//variables for state management
let humanPlayer = "X"
let aiPlayer = "O"
let originalBoard

// this is the combinations array of winning board tiles
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
	document.querySelector('.endgame').style.display = 'none'
	originalBoard = Array.from(Array(9).keys())
	for (let i = 0; i < cells.length; i++) {
		cells[i].innerText = ''
		cells[i].style.removeProperty('background-color')
		cells[i].addEventListener('click', setClick, false)
	}
}

function setClick(square) {
	if (typeof originalBoard[square.target.id] == 'number') {
		turn(square.target.id, humanPlayer) //player's turn	
		if (!checkWinner(originalBoard, humanPlayer) || !checkTie()) turn(bestSpot(), aiPlayer)	
	}	
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
	declareWinner(game.player == humanPlayer ? "You win!" : "You lose...")
}

function bestSpot() {
	return minimax(originalBoard, aiPlayer).index
}

function emptySquares() {
	return originalBoard.filter(cell => typeof cell == 'number')
}

function checkTie() {
	if (emptySquares().length == 0) {
		for (let i = 0; i < cells.length; i++) {
			cells[i].style.backgroundColor = "yellow"
			cells[i].removeEventListener('click', setClick, false)
		}
		declareWinner("Tie Game!")
		return true
	}
	return false
}


function declareWinner(who) {
	document.querySelector('.endgame').style.display = "block"
	document.querySelector('.endgame .text').innerText = who
}

/* 
	algorithm for minimax
	this is an implementation of a well-known 
	minimax algorithm
*/
function minimax(newBoard, player) {
	let available = emptySquares(newBoard)

	if (checkWinner(newBoard, player)) {
		return {score: -10}
	} else if (checkWinner(newBoard, aiPlayer)) {
		return {score: 20}
	} else if (available.length === 0) {
		return {score: 0}
	}
	let moves = []
	for (let i = 0; i < available.length; i++) {
		let move = {}
		move.index = newBoard[available[i]]
		newBoard[available[i]] = player

		if (player == aiPlayer) {
			let result = minimax(newBoard, humanPlayer)
			move.score = result.score
		} else {
			let result = minimax(newBoard, aiPlayer)
			move.score = result.score
		}

		newBoard[available[i]] = move.index

		moves.push(move)
	}

	let bestMove
	if (player === aiPlayer) {
		let bestScore = -10000
		for (let i = 0; i < moves.length; i++) {
			if (moves[i].score > bestScore) {
				bestScore = moves[i].score
				bestMove = i
			}
		}
	} else {
		let bestScore = 10000
		for (let i = 0; i < moves.length; i++) {
			if (moves[i].score < bestScore) {
				bestScore = moves[i].score
				bestMove = i
			}
		}
	}

	return moves[bestMove]
}