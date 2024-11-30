// Modules
const helpers = require('../helpers');

function puzzle1() {
	//Default variables
	const input = helpers.fileHandler.getFileWithSplit('Day4.txt', '\n');
	let output = 0;

	//Puzzle solving
	for (let i = 0; i < input.length; i++) {
		const row = input[i];
		const numbers = row
			.split(':')[1]
			.split(' ')
			.map(Number)
			.filter((x) => x !== 0 && !Number.isNaN(x));
		const duplicates = numbers.filter(
			(item, index) => numbers.indexOf(item) !== index
		);
		const duplicatesCount = duplicates.length - 1;
		if (duplicatesCount >= 0) output += Math.pow(2, duplicatesCount);
	}

	//Output of solution
	return output;
}

function puzzle2() {
	//Default variables
	const input = helpers.fileHandler.getFileWithSplit('Day4.txt', '\n');
	let output = 0;

	//Puzzle solving
	//Create games
	const games = [];
	for (let i = 0; i < input.length; i++) {
		const row = input[i];
		const numbers = row
			.split(':')[1]
			.split(' ')
			.map(Number)
			.filter((x) => x !== 0 && !Number.isNaN(x));
		const duplicates = numbers.filter(
			(item, index) => numbers.indexOf(item) !== index
		);
		const duplicatesCount = duplicates.length;
		const game = {
			id: Number(row.split(':')[0].split(' ')[1]),
			copies: 1,
			numbers: numbers,
			winnings: duplicatesCount,
		};
		games.push(game);
	}

	//Logic for scratchcards
	for (let i = 0; i < games.length; i++) {
		const game = games[i];
		if (game.winnings === 0) continue;
		for (let j = 1; j <= game.winnings; j++) {
			games[i + j].copies += game.copies;
		}
	}

	//Get output
	output = games.reduce((acc, curr) => acc + curr.copies, 0);

	//Output of solution
	return output;
}

module.exports = { puzzle1, puzzle2 };
