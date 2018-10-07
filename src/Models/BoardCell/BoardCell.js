// import {BoardCellState} from "../../Enums/BoardCellState";
const BoardCellState = require("../../Enums/BoardCellState");


class BoardCell {
	constructor(column, row) {
		this.column = column;
		this.row = row;
		this.state = BoardCellState.empty;
	}
}

module.exports = BoardCell;
// export { BoardCell };