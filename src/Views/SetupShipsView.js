const BaseView = require('./BaseView');
const BoardComponent = require('../Components/BoardComponent');


class SetupShipsView extends BaseView {
	constructor(controller) {
		super(controller);
		this.controller = controller;
		this.validateStartingCoordinates = this.validateStartingCoordinates.bind(this);
		this.validateDirection = this.validateDirection.bind(this);
		this.addShip = this.addShip.bind(this);
		this.validNumber = this.validNumber.bind(this);
	}

	validateDirection(data) {
		if (data === 'L' || data === 'R' || data === 'U' || data === 'D' ) {
			try {
				this.controller.currentShip.setDirection(data);
				this.controller.addShipToBoard(this.controller.currentPlayer, this.controller.currentShip);
				this.render();
			} catch (error) {
				console.log('\n\n\n\n');
				console.log(error);
				this.addShip();
			}
		} else {
			return this.prompt(
				'Sorry but the input was not formatted correctly.\n' +
				'Please enter a direction: \n L = Left \n R = Right \n U = Up \n D = Down',
				this.validateDirection
			);
		}
	}

	validateStartingCoordinates(data) {
		let boardCell = this.validateCoordinates(data, this.controller.currentPlayer.board.boardSize);

		if (boardCell) {
			this.controller.currentShip.setStartingCell(boardCell);
			return this.prompt(
				'Please enter a direction for your ship: \n L = Left \n R = Right \n U = Up \n D = Down',
				this.validateDirection
			)
		} else {
			return this.prompt(
				'Sorry but the input was not valid.\n' +
				'Example of correct format: 3-5',
				this.validateStartingCoordinates
			);
		}
	}

	addShip() {
		if (this.controller.currentPlayer.isHuman) {
			this.prompt(
				"Player " + this.controller.currentPlayer.number + ": Please add your " +
				this.controller.currentShip.name + " to the board. column-row\n" +
				"Enter Starting coordnates as such: 1-2",
				this.validateStartingCoordinates
			);
		} else {
			//Robot Player adding ships
			console.log('Computer Player is setting ship!\n');
			try {
				this.controller.setRobotPlayerShip();
				this.render();
			} catch (error) {
				console.log(error);
				this.addShip();
			}
		}
	}

	render() {
		if (this.controller.queue.length) {
			this.controller.processQueueItem();
			const boardComponent = new BoardComponent(this.controller.currentPlayer.board);
			boardComponent.render();
			this.addShip();
		} else {
			const boardComponent = new BoardComponent(this.controller.currentPlayer.board);
			boardComponent.render();
			console.log("Let's Begin the Game!");
			console.log('Player 1 Goes first');
			this.controller.goToGame();
		}
	}
}

module.exports = SetupShipsView;
