// Link to AoC: https://adventofcode.com/2025/day/4

// Modules
import * as helpers from '../helpers';

const input = helpers.fileHandler.getFileWithSplit('Day4.txt', '\n');
const grid = input.map((line) => line.split(''));

function puzzle1(): Number {
	//Default variables
	let output = 0;

	//Puzzle solving
	for (let i = 0; i < grid.length; i++) {
		const line = grid[i];
		for (let j = 0; j < line.length; j++) {
			if (grid[i][j] !== '@') continue;
			const surrounding = [
				grid[i - 1]?.[j - 1],
				grid[i - 1]?.[j],
				grid[i - 1]?.[j + 1],
				grid[i]?.[j - 1],
				grid[i]?.[j + 1],
				grid[i + 1]?.[j - 1],
				grid[i + 1]?.[j],
				grid[i + 1]?.[j + 1],
			];
			const paperRollCount = surrounding.filter((char) => char === '@').length;
			if (paperRollCount < 4) output++;
		}
	}

	//Output of solution
	return output;
}

function puzzle2(): Number {
	//Default variables
	let output = 0;

	//Puzzle solving
	let loopOutput = -1;
	while (loopOutput !== 0) {
        loopOutput = 0;
		for (let i = 0; i < grid.length; i++) {
			const line = grid[i];
			for (let j = 0; j < line.length; j++) {
				if (grid[i][j] !== '@') continue;
				const surrounding = [
					grid[i - 1]?.[j - 1],
					grid[i - 1]?.[j],
					grid[i - 1]?.[j + 1],
					grid[i]?.[j - 1],
					grid[i]?.[j + 1],
					grid[i + 1]?.[j - 1],
					grid[i + 1]?.[j],
					grid[i + 1]?.[j + 1],
				];
				const paperRollCount = surrounding.filter((char) => char === '@').length;
				if (paperRollCount < 4) {
					loopOutput++;
					grid[i][j] = '.';
				}
			}
		}
        output += loopOutput;
	}

	//Output of solution
	return output;
}

export { puzzle1, puzzle2 };
