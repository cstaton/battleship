const BaseView = require('./BaseView');


class GamePlayView extends BaseView {
	constructor(controller) {
		super(controller);
		this.controller = controller;
		this.validate = this.validate.bind(this);
	}

	validate(data) {
		const board = this.controller.currentPlayer.board;
		let boardCell = this.validateCoordinates(data, board.size);
		if (boardCell) {
			const playerWon = this.controller.attack(boardCell);
			if (playerWon) {
				console.log('Congratulations Player ' + this.controller.currentPlayer.number + '! You won the game!');
			} else {
				this.controller.setNextPLayer();
				this.render();
			}
		} else {
			return this.prompt(
				'Sorry but the input was not valid.\n' +
				'Example of correct format: 3-5',
				this.validate
			);
		}
	}

	render() {
		this.prompt(
			"Player " + this.controller.currentPlayer.number + ": It's your turn to Attack! " +
			"Enter Starting coordnates as such: 1-2",
			this.validate
		);
	}
}

module.exports = GamePlayView;
