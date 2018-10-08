
class IntroController {
	constructor(router, implementation) {
		this.implementation = implementation;
		this.router = router;
	}

	setNumberOfHumanPlayers(data) {
		this.implementation.setupPlayers(data);
		this.router.goTo('setupShips');
	}
}

module.exports = IntroController;
