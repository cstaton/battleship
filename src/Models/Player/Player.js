const Board = require('../Board/Board');
const BoardCellState = require("../../Enums/BoardCellState");
const AttackResult = require('../../Enums/AttackResult');

class Player {
	constructor(isHuman, number) {
		this.isHuman = isHuman;
		this.board = null;
		this.number = number;
	}

	won(otherPlayer) {
		if (otherPlayer.board) {
			return otherPlayer.board.hasManyShips()
				.every((ship) => ship.isSunk());
		}
		return false;
	}

	setBoard(board) {
		this.board = board;
	}

	attack(otherPlayer, boardCellInput) {
		const board = otherPlayer.board;
		let boardCell = board.getBoardCell(boardCellInput);
		let result = '';
		let nextState = '';

		if (boardCell.state === BoardCellState.shipExists) {
			result = AttackResult.hit;
			nextState = BoardCellState.alreadyHit;
		} else if (boardCell.state === BoardCellState.empty) {
			result = AttackResult.miss;
			nextState = BoardCellState.alreadyMiss;
		} else if (boardCell.state === BoardCellState.alreadyMiss) {
			result = AttackResult.alreadyMiss;
			nextState = BoardCellState.alreadyMiss;
		} else if (boardCell.state === BoardCellState.alreadyHit) {
			result = AttackResult.alreadyHit;
			nextState = BoardCellState.alreadyHit;
		}

		boardCell.mark(nextState);

		let ship = boardCell.getShip();
		if (ship && ship.isSunk()) {
			result = AttackResult.sunk;
		}

		console.log('Player ' + this.number + ' ' + result );
	}
}

module.exports = Player;
