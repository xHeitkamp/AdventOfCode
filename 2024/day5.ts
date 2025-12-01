// Link to AoC: https://adventofcode.com/2024/day/5

// Modules
import * as helpers from '../helpers';

type OrderingRules = {
	x: number;
	y: number;
};
type Input = {
	rules: Array<OrderingRules>;
	updates: Array<Array<number>>;
};

//Create input files
const input = helpers.fileHandler.getFileWithSplit('Day5.txt', '\n');
let changeInput = false;
const inputs: Input = { rules: [], updates: [] };
for (let index = 0; index < input.length; index++) {
	if (input[index] === '') {
		changeInput = true;
		continue;
	}
	if (changeInput === false) {
		const element = input[index].split('|').map(Number);
		inputs.rules.push({ x: element[0], y: element[1] });
	} else {
		const element = input[index].split(',').map(Number);
		inputs.updates.push(element);
	}
}

function puzzle1(): Number {
	//Default variables
	let output = 0;

	//Puzzle solving
	for (let index = 0; index < inputs.updates.length; index++) {
		const update = inputs.updates[index];
		for (let j = 0; j < update.length - 1; j++) {
			const checkOrder: OrderingRules = { x: update[j], y: update[j + 1] };
			if (inputs.rules.includes(checkOrder)) {
				output++;
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
	output = input.length;

	//Output of solution
	return output;
}

export { puzzle1, puzzle2 };
