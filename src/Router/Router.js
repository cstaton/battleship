const introView = require('../Views/IntroView');
const introController = require('../Controllers/IntroController');
const setupShipsView = require('../Views/SetupShipsView');
const setupShipsController = require('../Controllers/SetupShipsController');
const gamePlayView = require('../Views/GamePlayView');
const gamePlayeController = require('../Controllers/GamePlayController');


class Router {
	constructor(implementation) {
		this.implementation = implementation
	}

	goTo(routeName) {
		let route = this.routes().find((route) => route.name === routeName);
		if (!route) {
			throw "Error: Route does not exist";
		}
		let loadedRoute = this._loadRoute(route.view, route.controller);
		loadedRoute.render();
	}

	routes() {
		return [
			{
				name: 'intro',
				view: introView,
				controller: introController
			},
			{
				name: 'setupShips',
				view: setupShipsView,
				controller: setupShipsController
			},
			{
				name: 'gamePlay',
				view: gamePlayView,
				controller: gamePlayeController
			}
		];
	}

	_loadRoute(view, controller) {
		return new view(new controller(this, this.implementation))
	}
}

module.exports = Router;
