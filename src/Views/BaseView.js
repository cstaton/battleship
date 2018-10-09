const BoardCell = require('../Models/BoardCell/BoardCell');

class BaseView {
	constructor(controller) {
		this.controller = controller;
	}

	clearPrompt() {
		try {
			var lines = process.stdout.getWindowSize()[1];
			for(var i = 0; i < lines; i++) {
				console.log('\r\n');
			}
		} catch (error) {
			// try clearing prompt but not a big deal if it fails
		}
	}

	prompt(question, callback) {
		var stdin = process.stdin,
			stdout = process.stdout;

		stdin.resume();
		stdout.write(question);
		console.log('\r\n');
		stdin.once('data', (data) => {
			this.clearPrompt();
			callback(data.toString().trim());
		});
	}

	validNumber(num, boardSize) {
		const mustBeANumber = isNaN(num) === false;
		num = +num;
		const mustBeOnBoard = num <= boardSize;
		const mustBePositive = num >= 1;
		if (mustBeOnBoard && mustBePositive && mustBeANumber) {
			return true;
		}
		return false
	}

	validateCoordinates(data, boardSize) {
		let valid = true;
		if (data.length !== 3) {
			valid = false
		}
		const split = data.split('-');
		if (split.length !== 2) {
			valid = false
		}
		if (this.validNumber(split[0], boardSize) === false) {
			valid = false;
		}
		if (this.validNumber(split[1], boardSize) === false) {
			valid = false;
		}
		let column = +split[0] - 1;
		let row = +split[1] - 1;
		if (valid) {
			return new BoardCell(column, row);
		} else {
			return valid;
		}
	}

}

module.exports = BaseView;
