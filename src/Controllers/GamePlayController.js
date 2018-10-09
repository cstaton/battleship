
class GamePlayController {
	constructor(router, implementation) {
		this.implementation = implementation;
		this.router = router;
		this.currentPlayer = this.getPlayer(1);
	}

	getPlayer(num) {
		return this.implementation.getPlayer(num);
	}

	setNextPLayer() {
		this.currentPlayer = this.getOtherPlayer();
	}

	attack(boardCell) {
		const otherPlayer = this.getOtherPlayer();
		this.currentPlayer.attack(otherPlayer, boardCell);

		if (this.currentPlayer.won(otherPlayer)) {
			return true;
		} else {
			return false;
		}
	}

	robotAttack() {
		const randomBoardCell = this.implementation.getRandomBoardCell(this.currentPlayer);
		return this.attack(randomBoardCell);
	}

	getOtherPlayer() {
		if (this.currentPlayer.number === 1) {
			return this.getPlayer(2);
		}  else {
			return this.getPlayer(1);
		}
	}
}

module.exports = GamePlayController;
