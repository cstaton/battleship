const BaseView = require('./BaseView');
const BoardComponent = require('../Components/BoardComponent');


class SetupShipsView extends BaseView {
	constructor(controller) {
		super(controller);
		this.controller = controller;
		this.state = {
			currentPlayer: null,
			currentShip: null,
		};
		this.validateStartingCoordinates = this.validateStartingCoordinates.bind(this);
		this.validateDirection = this.validateDirection.bind(this);
		this.addShip = this.addShip.bind(this);
		this.validNumber = this.validNumber.bind(this);
	}

	validateDirection(data) {
		if (data === 'L' || data === 'R' || data === 'U' || data === 'D' ) {
			try {
				this.state.currentShip.setDirection(data);
				this.controller.addShipToBoard(this.state.currentPlayer, this.state.currentShip);
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
		let boardCell = this.validateCoordinates(data, this.state.currentPlayer.board.boardSize);

		if (boardCell) {
			this.state.currentShip.setStartingCell(boardCell);
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
		if (this.state.currentPlayer.isHuman) {
			// const Board = new BoardComponent(this.state.currentPlayer.board);
			// Board.render();
			this.prompt(
				"Player " + this.state.currentPlayer.number + ": Please add your " +
				this.state.currentShip.name + " to the board. column-row\n" +
				"Enter Starting coordnates as such: 1-2",
				this.validateStartingCoordinates
			);
		} else {
			//Robot Player adding ships
			console.log('Computer Player is setting ship!\n');
			try {
				let boardCell = this.controller.getRandomBoardCell(this.state.currentPlayer);
				this.state.currentShip.setStartingCell(boardCell);
				let randomDirection = this.controller.getRandomDirection();
				this.state.currentShip.setDirection(randomDirection);
				this.controller.addShipToBoard(this.state.currentPlayer, this.state.currentShip);
				this.render();
			} catch (error) {
				console.log(error);
				this.addShip();
			}
		}
	}

	render() {
		if (this.controller.queue.length) {
			let queueItem = this.controller.queue.shift();
			this.state.currentShip = queueItem['ship'];
			this.state.currentPlayer = queueItem['player'];
			const Board = new BoardComponent(this.state.currentPlayer.board);
			Board.render();
			this.addShip();
		} else {
			const Board = new BoardComponent(this.state.currentPlayer.board);
			Board.render();
			console.log("Let's Begin the Game!");
			console.log('Player 1 Goes first');
			this.controller.goToGame();
		}
	}
}

module.exports = SetupShipsView;
