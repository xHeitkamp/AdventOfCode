// Link to AoC: https://adventofcode.com/2025/day/3

// Modules
import * as helpers from '../helpers';

const input = helpers.fileHandler.getFileWithSplit('Day3.txt', '\n');
const banks = input.map((bank) => bank.split('').map(Number));

function puzzle1(): Number {
	//Default variables
	let output = 0;

	//Puzzle solving
	const joltages: number[] = [];
	for (let i = 0; i < banks.length; i++) {
		const bank = banks[i];
		const highestNumbers: number[] = [];
		findHighestRecurse(0, bank, highestNumbers, 2);
		joltages.push(Number(`${highestNumbers.join('')}`));
	}
	output = joltages.reduce((a, b) => a + b, 0);

	//Output of solution
	return output;
}

function puzzle2(): Number {
	//Default variables
	let output = 0;

	//Puzzle solving
	const joltages: number[] = [];
	for (let i = 0; i < banks.length; i++) {
		const bank = banks[i];
		const highestNumbers: number[] = [];
		findHighestRecurse(0, bank, highestNumbers, 12);
		joltages.push(Number(`${highestNumbers.join('')}`));
	}
	output = joltages.reduce((a, b) => a + b, 0);

	//Output of solution
	return output;
}

function findHighestRecurse(
	startNumber: number,
	bank: number[],
	highestNumbers: number[],
	digits: number
) {
	let highest = 0;
	for (let i = startNumber; i < bank.length - (digits - 1 - highestNumbers.length); i++) {
		const currentNumber = bank[i];
		if (currentNumber > highest) {
			highest = currentNumber;
			startNumber = i;
		}
	}
	highestNumbers.push(highest);
	if (highestNumbers.length < digits) {
		findHighestRecurse(startNumber + 1, bank, highestNumbers, digits);
	}
}

export { puzzle1, puzzle2 };
