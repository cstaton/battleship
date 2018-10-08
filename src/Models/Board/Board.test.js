
const Board = require('./Board');

const assert = (message, callback) => {
	if (callback()) {
		console.log('Success! ' + message);
	} else {
		console.log('Failed: ', message);
	}
};


assert('Should have 4 rows', () => {
	let board = new Board(4);
	return board.board.length === 4;
});


assert('Should have 4 columns', () => {
	let board = new Board(4);
	return board.board[0].length === 4;
});