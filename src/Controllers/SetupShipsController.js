
class SetupShipsController {
	constructor(router, implementation) {
		this.implementation = implementation;
		this.router = router;
		this.queue = implementation.setupQueueToProcess();
		this.currentShip = null;
	}

	processQueueItem() {
		let queueItem = this.queue.shift();
		this.currentShip = queueItem['ship'];
		this.currentPlayer = queueItem['player'];
	}

	setRobotPlayerShip() {
		let boardCell = this.implementation.getRandomBoardCell(this.currentPlayer);
		this.currentShip.setStartingCell(boardCell);
		let randomDirection = this.implementation.getRandomDirection();
		this.currentShip.setDirection(randomDirection);
		this.implementation.addShipToBoard(this.currentPlayer, this.currentShip);
	}

	getPlayer(num) {
		return this.implementation.getPlayer(num);
	}

	addShipToBoard(player, ship) {
		this.implementation.addShipToBoard(player, ship);
	}

	goToGame() {
		this.router.goTo('gamePlay');
	}

}

module.exports = SetupShipsController;
