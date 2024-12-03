// Link to AoC: https://adventofcode.com/2024/day/3

// Modules
import * as helpers from '../helpers';

const input = helpers.fileHandler.getFileWithSplit('Day3.txt', '\n');
const corruptedMemory = input.join('');

function puzzle1(): Number {
	//Default variables
	let output = 0;

	//Puzzle solving
	const findMul = /mul\((\d{1,3}),(\d{1,3})\)/g;
	const finds = corruptedMemory.matchAll(findMul);
	for (const find of finds) {
		const [mul, x, y] = find;
		output += Number(x) * Number(y);
	}

	//Output of solution
	return output;
}

function puzzle2(): Number {
	//Default variables
	let output = 0;

	//Puzzle solving
	const findValidMul = /(do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\))/g;
	const finds = corruptedMemory.matchAll(findValidMul);
	let valid = true;
	for (const find of finds) {
		const [mul, mul2, x, y] = find;
		if (mul === 'do()') {
			valid = true;
			continue;
		}
		if (mul === "don't()") {
			valid = false;
			continue;
		}
		if (valid) output += Number(x) * Number(y);
	}

	//Output of solution
	return output;
}

export { puzzle1, puzzle2 };
