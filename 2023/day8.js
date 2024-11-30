// Modules
const helpers = require('../helpers');
const lcm = require('compute-lcm');

function puzzle1() {
	//Default variables
	const input = helpers.fileHandler.getFileWithSplit('Day8.txt', '\n');
	let output = 0;

	//Puzzle solving
	const { instructions, documents } = inputParser(input);
	let steps = 0;
	let currentNode = 'AAA';
	while (currentNode !== 'ZZZ') {
		const navigation = instructions[steps % instructions.length];
		currentNode = documents[currentNode][navigation];
		steps++;
	}
	output = steps;

	//Output of solution
	return output;
}

function puzzle2() {
	//Default variables
	const input = helpers.fileHandler.getFileWithSplit('Day8.txt', '\n');
	let output = 0;

	//Puzzle solving
	const { instructions, documents } = inputParser(input);
	const startingNodes = Object.keys(documents).filter((ele) =>
		ele.endsWith('A')
	);
	const steps = [];
	for (let index = 0; index < startingNodes.length; index++) {
		let step = 0;
		let currentNode = startingNodes[index];
		while (!currentNode.endsWith('Z')) {
			const instruction = instructions[step % instructions.length];
			currentNode = documents[currentNode][instruction];
			step++;
		}
		steps.push(step);
	}
	output = lcm(...steps);

	//Output of solution
	return output;
}

function inputParser(input) {
	const instructions = input[0].split('');
	const documents = {};

	for (let index = 2; index < input.length; index++) {
		const row = input[index];
		const matches = row.match(/[A-Z\d]+/g);
		documents[matches[0]] = { L: matches[1], R: matches[2] };
	}

	return { instructions, documents };
}

module.exports = { puzzle1, puzzle2 };
