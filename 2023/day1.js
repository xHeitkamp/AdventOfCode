// Modules
const helpers = require('../helpers');

function puzzle1() {
	//Default variables
	const input = helpers.fileHandler.getFileWithSplit('Day1.txt', '\n');
	let output = 0;

	//Puzzle solving
	for (let i = 0; i < input.length; i++) {
		let row = input[i];

		//Remove characters in row
		const replacements = [{ original: /[a-z]/gi, replace: '' }];
		row = replaceStrings(row, replacements);

		output += Number(`${row[0]}${row[row.length - 1]}`); //Add the first number and last number togehter together
	}

	//Output of solution
	return output;
}

function puzzle2() {
	//Default variables
	const input = helpers.fileHandler.getFileWithSplit('Day1.txt', '\n');
	let output = 0;

	//Puzzle solving
	for (let i = 0; i < input.length; i++) {
		let row = input[i];

		//Replace findings in row and remove characters
		const replacements = [
			{ original: 'one', replace: 'one1one' },
			{ original: 'two', replace: 'two2two' },
			{ original: 'three', replace: 'three3three' },
			{ original: 'four', replace: 'four4four' },
			{ original: 'five', replace: 'five5five' },
			{ original: 'six', replace: 'six6six' },
			{ original: 'seven', replace: 'seven7seven' },
			{ original: 'eight', replace: 'eight8eight' },
			{ original: 'nine', replace: 'nine9nine' },
			{ original: /[a-z]/gi, replace: '' },
		];
		row = replaceStrings(row, replacements);

		output += Number(`${row[0]}${row[row.length - 1]}`); //Add the first number and last number togehter together
	}

	//Output of solution
	return output;
}

function replaceStrings(input, cases) {
	for (let i = 0; i < cases.length; i++) {
		input = input.replaceAll(cases[i].original, cases[i].replace);
	}
	return input;
}

module.exports = { puzzle1, puzzle2 };
