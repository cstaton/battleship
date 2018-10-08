// import {BoardCellState} from "../../Enums/BoardCellState";
const BoardCellState = require("../../Enums/BoardCellState");


class BoardCell {
	constructor(column, row, state) {
		this.column = column;
		this.row = row;
		this.state = state;
		this.ship = null;
	}

	setShip(ship) {
		this.ship = ship;
	}

	getShip() {
		return this.ship;
	}

	isAlreadyOccupied() {
		return this.state === BoardCellState.shipExists;
	}

	withinBoundaries(boardSize) {
		return this.validBoardBoundaries(this.row, boardSize) &&
			this.validBoardBoundaries(this.column, boardSize);
	}

	validBoardBoundaries(value, boardSize) {
		return value >= 0 && value < boardSize;
	}

	render() {
		if (this.state === BoardCellState.empty) {
			return ' ';
		} else if (this.state === BoardCellState.hit) {
			return 'X';
		} else if (this.state === BoardCellState.shipExists) {
			return 'O';
		}
	}

	mark(state) {
		this.state = state;
	}
}

module.exports = BoardCell;
