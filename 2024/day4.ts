// Link to AoC: https://adventofcode.com/2024/day/4

// Modules
import * as helpers from '../helpers';

const input = helpers.fileHandler.getFileWithSplit('Day4.txt', '\n');

function puzzle1(): Number {
	//Default variables
	let output = 0;

	//Puzzle solving
	const searchWord = 'XMAS';
	const listLength = input.length;
	const rowLength = input[0].length;
	for (let i = 0; i < listLength; i++) {
		const row = input[i];
		for (let j = 0; j < rowLength; j++) {
			const sign = row[j];
			if (sign !== 'X') continue;

			if (j + 3 < rowLength) {
				const right =
					`${input[i][j]}${input[i][j + 1]}${input[i][j + 2]}${
						input[i][j + 3]
					}` === searchWord;
				if (right) output++;
			}
			if (j - 3 >= 0) {
				const left =
					`${input[i][j]}${input[i][j - 1]}${input[i][j - 2]}${
						input[i][j - 3]
					}` === searchWord;
				if (left) output++;
			}
			if (i + 3 < listLength) {
				const down =
					`${input[i][j]}${input[i + 1][j]}${input[i + 2][j]}${
						input[i + 3][j]
					}` === searchWord;
				if (down) output++;
			}
			if (i - 3 >= 0) {
				const up =
					`${input[i][j]}${input[i - 1][j]}${input[i - 2][j]}${
						input[i - 3][j]
					}` === searchWord;
				if (up) output++;
			}
			if (j + 3 < rowLength && i - 3 >= 0) {
				const rightUp =
					`${input[i][j]}${input[i - 1][j + 1]}${
						input[i - 2][j + 2]
					}${input[i - 3][j + 3]}` === searchWord;
				if (rightUp) output++;
			}
			if (j - 3 >= 0 && i - 3 >= 0) {
				const leftUp =
					`${input[i][j]}${input[i - 1][j - 1]}${
						input[i - 2][j - 2]
					}${input[i - 3][j - 3]}` === searchWord;
				if (leftUp) output++;
			}
			if (j + 3 < rowLength && i + 3 < listLength) {
				const rightDown =
					`${input[i][j]}${input[i + 1][j + 1]}${
						input[i + 2][j + 2]
					}${input[i + 3][j + 3]}` === searchWord;
				if (rightDown) output++;
			}
			if (j - 3 >= 0 && i + 3 < listLength) {
				const leftDown =
					`${input[i][j]}${input[i + 1][j - 1]}${
						input[i + 2][j - 2]
					}${input[i + 3][j - 3]}` === searchWord;
				if (leftDown) output++;
			}
		}
	}

	//Output of solution
	return output;
}

function puzzle2(): Number {
	//Default variables
	let output = 0;

	//Puzzle solving
	const searchWords = ['MASMAS', 'MASSAM', 'SAMMAS', 'SAMSAM'];
	const listLength = input.length;
	const rowLength = input[0].length;
	for (let i = 1; i < listLength - 1; i++) {
		const row = input[i];
		for (let j = 1; j < rowLength - 1; j++) {
			const sign = row[j];
			if (sign !== 'A') continue;
			const foundedWord = `${input[i - 1][j - 1]}${input[i][j]}${
				input[i + 1][j + 1]
			}${input[i - 1][j + 1]}${input[i][j]}${input[i + 1][j - 1]}`;
			if (searchWords.includes(foundedWord)) output++;
		}
	}

	//Output of solution
	return output;
}

export { puzzle1, puzzle2 };
