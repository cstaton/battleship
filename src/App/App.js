const Implementation = require('../Services/Implementation');
const Router = require('../Router/Router.js');

class App {
	constructor() {
		console.log('');
		console.log('*****************************');
		console.log('  Welcome to Battleship!');
		console.log('    By: Chris Staton');
		console.log('*****************************');
		console.log('');
	}

	start() {
		const implementation = new Implementation();
		const router = new Router(implementation);
		router.goTo('intro');
	}
}

module.exports = App;
