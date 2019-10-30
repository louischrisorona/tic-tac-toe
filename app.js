/* JavaScript for my tic tac toe game 
   created 10/28/2019 by Chris */
//variables for state management
let humanPlayer = "X"
let aiPlayer = "O"
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

const changePlayer = () => {
	//controls the player turn based on a BOOLEAN
	state.turn = !state.turn
}

const setTile = (target) => {
	//controls the mark for each square
	if (state['turn']) {
		target.innerHTML = state['player']
		state['board'][target.id - 1] = state['player']
	} else {
		target.innerHTML = state['npc']
		state['board'][target.id - 1] = state['npc']
	}
	changePlayer()
}

//collect all clickable elements on the table
const clickables = document.getElementsByTagName('td')
for(let i = 0; i < clickables.length; i++){
	clickables[i].addEventListener('click', (event) => {
		setTile(event.target)
	})
}

const resetGame = () => {
	const buttonReset = document.getElementById('resetButton')
	buttonReset.addEventListener('click', (e) => {
		e.preventDefault()
	})
}