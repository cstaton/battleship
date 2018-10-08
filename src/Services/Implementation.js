const Player = require('../Models/Player/Player');
const Board = require('../Models/Board/Board');


class Implementation {
	constructor() {
		this.player1 = null;
		this.player2 = null;
	}

	getPlayer(num) {
		if (num === 1) {
			return this.player1;
		} else if (num === 2) {
			return this.player2;
		}
	}

	setupPlayers(humanPlayerCount) {
		const boardSize = 6;

		this.player1 = new Player(true, 1);
		this.player1.setBoard(new Board(boardSize));

		if (humanPlayerCount === 1) {
			this.player2 = new Player(false, 2);
		} else if (humanPlayerCount === 2) {
			this.player2 = new Player(true, 2);
		}

		this.player2.setBoard(new Board(boardSize));
	}

	addShipToBoard(player, ship) {
		const board = player.board;
		board.addShip(ship);
	}

}

module.exports = Implementation;
