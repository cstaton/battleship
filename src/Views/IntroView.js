const BaseView = require('./BaseView');


class IntroView extends BaseView {
	constructor(controller) {
		super(controller);
		this.introController = controller;
		this.validate = this.validate.bind(this);
	}

	validate(data) {
		if (isNaN(data) === false) data = +data;
		if (data === 1 || data === 2) {
			this.introController.setNumberOfHumanPlayers(data)
		} else {
			return this.prompt(
				'Were sorry but only 1 or 2 human players are allowed',
				this.validate
			);
		}
	}

	render() {
		return this.prompt(
			"How many human players will play?",
			this.validate
		);
	}
}

module.exports = IntroView;
