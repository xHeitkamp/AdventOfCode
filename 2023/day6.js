// Modules
const helpers = require('../helpers');

function puzzle1() {
	//Default variables
	const input = helpers.fileHandler.getFileWithSplit('Day6.txt', '\n');
	let output = 0;

	//Puzzle solving
	const ways2beat = [];
	const times = input[0].match(/[\d]+/g).map(Number);
	const distances = input[1].match(/[\d]+/g).map(Number);

	for (let index = 0; index < times.length; index++) {
		const p = times[index];
		const q = distances[index];
		const zeropoints = pqFormula(p,q);

		let win = Math.floor(zeropoints.x2) - Math.floor(zeropoints.x1);
		if (zeropoints.x2 % 1 === 0 ) win -= 1

		ways2beat.push(win);
	}

	//Output of solution
	output = ways2beat.reduce((acc, cur) => acc * cur, 1);
	return output;
}

function puzzle2() {
	//Default variables
	const input = helpers.fileHandler.getFileWithSplit('Day6.txt', '\n');
	let output = 1;

	//Puzzle solving
	const p = Number(input[0].match(/[\d]+/g).join(''));
	const q = Number(input[1].match(/[\d]+/g).join(''));
	const zeropoints = pqFormula(p,q);
	
	output = Math.floor(zeropoints.x2) - Math.floor(zeropoints.x1);

	//Output of solution
	return output;
}


function pqFormula(p,q) {
	const x1 = p / 2 - Math.sqrt(Math.pow(p / 2, 2) - q);
	const x2 = p / 2 + Math.sqrt(Math.pow(p / 2, 2) - q);
	return {x1,x2};
}

module.exports = { puzzle1, puzzle2 };
