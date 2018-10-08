const BoardCell = require("../BoardCell/BoardCell");
const BoardCellState = require("../../Enums/BoardCellState");

class Board {
	constructor(boardSize) {
		this.boardSize = boardSize;
		this.board = this.build();
		this.ships = [];
		this.getBoardCell = this.getBoardCell.bind(this);
	}

	hasManyShips() {
		return this.ships;
	}

	addShip(ship) {
		// and marks them as occoupied
		// gets the cells chosen by user
		try {
			this.getCellsToMark(ship)
				.forEach((shipBoardCell) => {

					if (!shipBoardCell.withinBoundaries(this.boardSize)) {
						throw 'The ship does not fit on the board. Please try placing it in a different location';
					}

					const currentBoardCell = this.getBoardCell(shipBoardCell);

					if (currentBoardCell.isAlreadyOccupied()) {
						throw 'That cell is already occupied by a ship! Please try again.';
					} else if (currentBoardCell) {
						shipBoardCell.setShip(ship);
						this.setBoardCell(shipBoardCell);
						ship.addLocation(shipBoardCell);
						this.ships.push(ship);
					}
				})
		} catch (error) {
			//Unset spaces if ship is
			//not set on board correctly
			ship.getLocationOnBoard()
				.forEach((shipBoardCell) => {
					if (shipBoardCell.withinBoundaries(this.boardSize)) {
						const currentBoardCell = this.getBoardCell(shipBoardCell);
						currentBoardCell.mark(BoardCellState.empty);
					}
				});
			ship.emptyLocation();
			throw error;
		}
	}

	setBoardCell(boardCell) {
		this.board[boardCell.row][boardCell.column] = boardCell;
	}

	getBoardCell(boardCell) {
		return this.board[boardCell.row][boardCell.column];
	}

	getCellsToMark(ship) {
		return this._repeat(ship.size, (index) => {
			return ship.moveDistance(index);
		});
	}

	build() {
		if (!Number.isInteger(this.boardSize)) {
			throw 'Board Size must be an int';
		}

		return this._repeat(this.boardSize, (rowIndex) => {
			return this.buildRow(rowIndex);
		});
	}

	buildRow(rowIndex) {
		return this._repeat(this.boardSize, (columnIndex) => {
			return new BoardCell(columnIndex, rowIndex, BoardCellState.empty);
		});
	}

	_repeat(x, callback) {
		if (!Number.isInteger(x)) {
			throw 'x must be an int';
		}
		let result = [];
		for (let i = 0; i < x; i++) {
			result.push(callback(i));
		}
		return result;
	}
}

module.exports = Board;
