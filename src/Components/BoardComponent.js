class BoardComponent {
	constructor(board) {
		this.board = board;
	}

	render() {
    let data = '\n\n  ';
		this.board.board.forEach((column, index) => {
			data = data + '  ' + (index + 1);
		});
		data = data + '\n';
		this.board.board.forEach((row, rowIndex) => {
			data = data + ' ' + (rowIndex + 1) + ' ';
			row.forEach((column, columnIndex) => {
				data = data + '|' + column.render() + '|';
			});
			data = data + "\n";
		});
		console.log(data)
	}

}

module.exports = BoardComponent;
