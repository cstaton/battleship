const BoardComponent = require('../Components/BoardComponent');
const Ship = require('../Models/Ship/Ship');
const BoardCell = require('../Models/BoardCell/BoardCell');

class SetupShipsController {
	constructor(router, implementation) {
		this.implementation = implementation;
		this.router = router;
		this.queue = this.setupQueueToProcess();
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

	getPlayer(num) {
		return this.implementation.getPlayer(num);
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

	addShipToBoard(player, ship) {
		this.implementation.addShipToBoard(player, ship);
	}

	goToGame() {
		this.router.goTo('gamePlay');
	}

}

module.exports = SetupShipsController;
