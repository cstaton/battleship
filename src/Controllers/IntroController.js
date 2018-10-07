
class IntroController {
	constructor(router, implementation) {
		this.implementation = implementation;
		this.router = router;
	}

	setNumberOfHumanPlayers(data) {
		this.implementation.setupPlayers(data);
		console.log(this.implementation);
	}
}

module.exports = IntroController;
