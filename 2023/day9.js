// Modules
const helpers = require('../helpers');

function puzzle1() {
	//Default variables
	const input = helpers.fileHandler.getFileWithSplit('Day9.txt', '\n');
	let output = 0;

	//Puzzle solving
	const results = [];
	const datasets = input.map((ele) => ele.split(' ').map(Number));
	for (let index = 0; index < datasets.length; index++) {
		const steps = [datasets[index]];

		while (!steps[steps.length - 1].every((ele) => ele === 0)) {
			const prevStep = steps[steps.length - 1];
			const step = [];
			for (let indexRow = 0; indexRow < prevStep.length - 1; indexRow++) {
				step.push(prevStep[indexRow + 1] - prevStep[indexRow]);
			}
			steps.push(step);
		}

		for (let indexStep = steps.length - 2; indexStep >= 0; indexStep--) {
			const newNumber =
				steps[indexStep + 1].at(-1) + steps[indexStep].at(-1);
			steps[indexStep].push(newNumber);
		}

		results.push(steps[0].at(-1));
	}

	output = results.reduce((acc, cur) => acc + cur, 0);

	//Output of solution
	return output;
}

function puzzle2() {
	//Default variables
	const input = helpers.fileHandler.getFileWithSplit('Day9.txt', '\n');
	let output = 0;

	//Puzzle solving
	const results = [];
	const datasets = input.map((ele) => ele.split(' ').map(Number));
	for (let index = 0; index < datasets.length; index++) {
		const steps = [datasets[index]];

		while (!steps[steps.length - 1].every((ele) => ele === 0)) {
			const prevStep = steps[steps.length - 1];
			const step = [];
			for (let indexRow = 0; indexRow < prevStep.length - 1; indexRow++) {
				step.push(prevStep[indexRow + 1] - prevStep[indexRow]);
			}
			steps.push(step);
		}

		for (let indexStep = steps.length - 2; indexStep >= 0; indexStep--) {
			const newNumber =
				-1 * Number(steps[indexStep + 1][0]) +
				Number(steps[indexStep][0]);
			steps[indexStep].unshift(newNumber);
		}

		results.push(steps[0][0]);
	}

	output = results.reduce((acc, cur) => {
		return Number(acc) + Number(cur);
	}, 0);

	//Output of solution
	return output;
}

module.exports = { puzzle1, puzzle2 };
