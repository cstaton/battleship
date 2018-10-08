const BoardCell = require("../BoardCell/BoardCell");
const BoardCellState = require("../../Enums/BoardCellState");

class Ship {
	constructor(name, size, startingCell) {
		this.name = name;
		this.size = size;
		this.startingCell = null;
		this.direction = null;
		this.locationOnBoard = [];
	}

	isSunk() {
		return this.locationOnBoard.every((boardCell) => boardCell.state === BoardCellState.alreadyHit);
	}

	emptyLocation() {
		this.locationOnBoard = [];
	}

	addLocation(boardCell) {
		this.locationOnBoard.push(boardCell);
	}

	getLocationOnBoard() {
		return this.locationOnBoard;
	}

	setStartingCell(startingCell) {
		this.startingCell = startingCell;
	}

	getStartingCell() {
		return this.startingCell;
	}

	setDirection(direction) {
		this.direction = direction;
	}

	getDirection() {
		return this.direction;
	}

	moveDistance(diff) {
		const startingCell = this.getStartingCell();
		const direction = this.getDirection();

		let column = startingCell.column;
		let row = startingCell.row;

		if (direction === 'L') {
			column = startingCell.column - diff;
		} else if (direction === 'R') {
			column = startingCell.column + diff;
		} else if (direction === 'U') {
			row = startingCell.row - diff;
		} else if (direction === 'D') {
			row = startingCell.row + diff;
		}

		return new BoardCell(column, row, BoardCellState.shipExists);
	}
}

module.exports = Ship;
