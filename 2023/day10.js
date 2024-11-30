// Modules
const helpers = require('../helpers');

function puzzle1() {
	//Default variables
	const input = helpers.fileHandler.getFileWithSplit('Day10.txt', '\n');
	let output = 0;

	//Puzzle solving
	const map = input.map((ele) => ele.split(''));
	const startPipe = getStartPipe(map);
	const firstStep = goAfterStart(map, startPipe);
	let usedPipes = 1; //After start
	let position = {
		prev: {
			tile: 'S',
			row: startPipe.row,
			column: startPipe.column,
		},
		current: {
			tile: firstStep.tile,
			row: firstStep.row,
			column: firstStep.column,
		},
	};
	while (position.current.tile !== 'S') {
		//LOGIK
		next = getNextTile(position.prev, position.current);
		next.tile = map[next.row][next.column];

		//Change position
		position.prev.tile = position.current.tile;
		position.prev.row = position.current.row;
		position.prev.column = position.current.column;
		position.current.tile = next.tile;
		position.current.row = next.row;
		position.current.column = next.column;
		usedPipes++;
	}
	output = usedPipes / 2;

	//Output of solution
	return output;
}

function puzzle2() {
	//Default variables
	const input = helpers.fileHandler.getFileWithSplit('Day10.txt', '\n');
	let output = 0;

	//Puzzle solving
	const map = input.map((ele) => ele.split(''));
	const startPipe = getStartPipe(map);
	const firstStep = goAfterStart(map, startPipe);
	let positions = [{ row: startPipe.row, column: startPipe.column }];
	let position = {
		prev: {
			tile: 'S',
			row: startPipe.row,
			column: startPipe.column,
		},
		current: {
			tile: firstStep.tile,
			row: firstStep.row,
			column: firstStep.column,
		},
	};
	while (position.current.tile !== 'S') {
		//LOGIK
		next = getNextTile(position.prev, position.current);
		next.tile = map[next.row][next.column];

		//Change position
		position.prev.tile = position.current.tile;
		position.prev.row = position.current.row;
		position.prev.column = position.current.column;
		position.current.tile = next.tile;
		position.current.row = next.row;
		position.current.column = next.column;
		positions.push({
			row: position.prev.row,
			column: position.prev.column,
		});
	}

	//Sort by row column ASC
	positions.sort((a, b) => {
		if (a.row !== b.row) {
			return a.row - b.row;
		} else {
			return a.column - b.column;
		}
	});

	//Check rows for dots
	let countDots = 0;
	for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
		const row = map[rowIndex];
		const filtered = positions
			.filter((ele) => ele.row === rowIndex)
			.map((ele) => ele.column);
		if (filtered[0] === undefined || filtered.length < 2) continue;

		for (
			let columnIndex = 0;
			columnIndex < filtered.length - 1;
			columnIndex++
		) {
			for (
				let beginnIndex = filtered[columnIndex] + 1;
				beginnIndex < row.length;
				beginnIndex++
			) {
				if (row[beginnIndex] === '.') {
					countDots++;
				} else {
					break;
				}
			}
		}
	}
	output = countDots;

	//Output of solution
	return output;
}

function getStartPipe(map) {
	for (let rowIndex = 0; rowIndex < map.length; rowIndex++) {
		for (
			let columnIndex = 0;
			columnIndex < map[rowIndex].length;
			columnIndex++
		) {
			if (map[rowIndex][columnIndex] === 'S')
				return { row: rowIndex, column: columnIndex };
		}
	}
}

function goAfterStart(map, start) {
	row = start.row;
	column = start.column;

	//North
	if (checkNorth(map, row, column)) {
		return {
			tile: map[row - 1][column],
			row: row - 1,
			column: column,
		};
	}

	//East
	if (checkEast(map, row, column)) {
		return {
			tile: map[row][column + 1],
			row: row,
			column: column + 1,
		};
	}

	//South
	if (checkSouth(map, row, column)) {
		return {
			tile: map[row + 1][column],
			row: row + 1,
			column: column,
		};
	}

	//West
	if (checkWest(map, row, column)) {
		return {
			tile: map[row][column - 1],
			row: row,
			column: column - 1,
		};
	}
}

function getNextTile(prev, current) {
	let next = {
		tile: '',
		row: '',
		column: '',
	};

	switch (current.tile) {
		case '|':
			if (prev.row < current.row) {
				next.row = current.row + 1;
				next.column = current.column;
			} else {
				next.row = current.row - 1;
				next.column = current.column;
			}
			break;
		case '-':
			if (prev.column < current.column) {
				next.row = current.row;
				next.column = current.column + 1;
			} else {
				next.row = current.row;
				next.column = current.column - 1;
			}
			break;
		case 'L':
			if (prev.row === current.row) {
				next.row = current.row - 1;
				next.column = current.column;
			} else {
				next.row = current.row;
				next.column = current.column + 1;
			}
			break;
		case 'J':
			if (prev.row === current.row) {
				next.row = current.row - 1;
				next.column = current.column;
			} else {
				next.row = current.row;
				next.column = current.column - 1;
			}
			break;
		case '7':
			if (prev.row === current.row) {
				next.row = current.row + 1;
				next.column = current.column;
			} else {
				next.row = current.row;
				next.column = current.column - 1;
			}
			break;
		case 'F':
			if (prev.row === current.row) {
				next.row = current.row + 1;
				next.column = current.column;
			} else {
				next.row = current.row;
				next.column = current.column + 1;
			}
			break;
		default:
			break;
	}
	return next;
}

function checkNeighborPipes(checks, value) {
	checks.push('S');
	return checks.includes(value);
}

function checkNorth(map, row, column) {
	if (row === 1 && checkNeighborPipes(['7', 'F'], map[row - 1][column]))
		return true;
	return (
		row !== 0 && checkNeighborPipes(['7', 'F', '|'], map[row - 1][column])
	);
}

function checkSouth(map, row, column) {
	const mapMaxRow = map.length - 1;
	if (
		row === mapMaxRow - 1 &&
		checkNeighborPipes(['L', 'J'], map[row + 1][column])
	)
		return true;
	return (
		row !== mapMaxRow &&
		checkNeighborPipes(['L', 'J', '|'], map[row + 1][column])
	);
}

function checkWest(map, row, column) {
	if (row === 1 && checkNeighborPipes(['L', 'F'], map[row][column - 1]))
		return true;
	return (
		column !== 0 &&
		checkNeighborPipes(['L', 'F', '-'], map[row][column - 1])
	);
}

function checkEast(map, row, column) {
	const mapMaxColumn = map[row].length - 1;
	if (
		row === mapMaxColumn - 1 &&
		checkNeighborPipes(['7', 'J'], map[row][column + 1])
	)
		return true;
	return (
		column !== mapMaxColumn &&
		checkNeighborPipes(['7', 'J', '-'], map[row][column + 1])
	);
}

module.exports = { puzzle1, puzzle2 };
