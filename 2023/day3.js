// Modules
const helpers = require('../helpers');

function puzzle1() {
	//Default variables
	const input = helpers.fileHandler.getFileWithSplit('Day3.txt', '\n');
	const numberOfRows = input.length;
	let output = 0;

	//Puzzle solving
	const regexFindNumber = /\d+/g;
	const regexFindSymbol = /[^.\d]/;
	for (let rowIndex = 0; rowIndex < input.length; rowIndex++) {
		const row = input[rowIndex];
		//Get all numbers
		while ((match = regexFindNumber.exec(row)) !== null) {
			const numberFound = Number(match[0]);
			const numberStartIndex = match.index;
			const numberEndIndex = regexFindNumber.lastIndex;

			//Check in above row
			if (rowIndex > 0) {
				const startIndex =
					numberStartIndex === 0 ? 0 : numberStartIndex - 1;
				const endIndex =
					numberEndIndex >= row.length ? row.length : numberEndIndex;
				const checkingArray = input[rowIndex - 1].slice(
					startIndex,
					endIndex + 1
				);
				if (regexFindSymbol.test(checkingArray)) {
					output += numberFound;
					continue;
				}
			}

			//Check in current row
			if (numberStartIndex !== 0) {
				if (regexFindSymbol.test(row[numberStartIndex - 1])) {
					output += numberFound;
					continue;
				}
			}
			if (numberEndIndex !== row.length) {
				if (regexFindSymbol.test(row[numberEndIndex])) {
					output += numberFound;
					continue;
				}
			}

			//Check in below row
			if (rowIndex < numberOfRows - 1) {
				const startIndex =
					numberStartIndex === 0 ? 0 : numberStartIndex - 1;
				const endIndex =
					numberEndIndex >= row.length ? row.length : numberEndIndex;
				const checkingArray = input[rowIndex + 1].slice(
					startIndex,
					endIndex + 1
				);
				if (regexFindSymbol.test(checkingArray)) {
					output += numberFound;
					continue;
				}
			}
		}
	}

	//Output of solution
	return output;
}

function puzzle2() {
	//Default variables
	const input = helpers.fileHandler.getFileWithSplit('Day3.txt', '\n');
	let output = 0;

	// Puzzle solving
	for (let row = 0; row < input.length; row++) {
		const line = input[row];
		for (let col = 0; col < line.length; col++) {
			if (line[col] === '*') {
				const neighbors = [];
				const condensedLines = input
					.slice(row - 1, row + 2)
					.map((line) => line.slice(col - 3, col + 4));
				for (const condensedLine of condensedLines) {
					const matches = matchAll(condensedLine);
					for (const { 0: m, index } of matches) {
						if (
							(index < 3 && index + m.length >= 3) ||
							(index + m.length > 3 && index <= 4)
						) {
							neighbors.push(Number(m));
						}
					}
				}
				if (neighbors.length === 2)
					output += neighbors[0] * neighbors[1];
			}
		}
	}

	//Output of solution
	return output;
}

function matchAll(row) {
	return [...row.matchAll(/\d+/g)] || [];
}

module.exports = { puzzle1, puzzle2 };
