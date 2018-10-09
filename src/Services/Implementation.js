const Player = require('../Models/Player/Player');
const Board = require('../Models/Board/Board');
const Ship = require('../Models/Ship/Ship');
const BoardCell = require('../Models/BoardCell/BoardCell');


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

	setupQueueToProcess() {
		let player1QueueItems = this.getQueueItems(1);
		let player2QueueItems = this.getQueueItems(2);
		return player1QueueItems.concat(player2QueueItems);
	}

	getQueueItems(playerNumber) {
		const player = this.getPlayer(playerNumber);
		const playerShips = this.setupShips();

		return playerShips.map((ship) => {
			return {
				player: player,
				ship: ship,
			};
		});
	}

	addShipToBoard(player, ship) {
		const board = player.board;
		board.addShip(ship);
	}

	setupShips() {
		return this.shipsToAdd().map((ship) => {
			return new Ship(ship.name, ship.size);
		});
	}

	shipsToAdd() {
		return [
			{
				'name': 'Battleship',
				'size': 4
			},
			{
				'name': 'Destroyer',
				'size': 3
			},
			{
				'name': 'Submarine',
				'size': 2
			}
		];
	}

	getRandomDirection() {
		const directions = ['L', 'R', 'U', 'D'];
		const randomInt = this.generateRandomNumber(0, 3);
		return directions[randomInt];
	}

	getRandomBoardCell(player) {
		let column = this.generateRandomNumber(1, player.board.boardSize);
		let row = this.generateRandomNumber(1, player.board.boardSize);
		return new BoardCell(column, row);
	}

	generateRandomNumber(min, max) {
		return Math.floor(Math.random() * (max - min) + min);
	}
}

module.exports = Implementation;
