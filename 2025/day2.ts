// Link to AoC: https://adventofcode.com/2025/day/2

// Modules
import * as helpers from '../helpers';

const input = helpers.fileHandler.getFileWithSplit('Day2.txt', '\n');
const ranges = input
	.flatMap((line) => line.split(','))
	.map((range) => {
		const [start, end] = range.split('-').map(Number);
		return { start, end };
	});

function puzzle1(): Number {
	//Default variables
	let output = 0;

	//Puzzle solving
	const invalidNumbers: number[] = [];
	for (let i = 0; i < ranges.length; i++) {
		const range = ranges[i];
		for (let index = range.start; index <= range.end; index++) {
			const newID = index;
			const stringNewId = newID.toString();
			if (stringNewId.length % 2 === 0) {
				if (
					stringNewId.substring(0, stringNewId.length / 2) ===
					stringNewId.substring(stringNewId.length / 2)
				) {
					invalidNumbers.push(newID);
				}
			}
		}
	}
	output = invalidNumbers.reduce((sum, num) => sum + num, 0);

	//Output of solution
	return output;
}

function puzzle2(): Number {
	//Default variables
	let output = 0;

	//Puzzle solving
	const regex = /^(\d+)\1+$/g;
	const invalidNumbers: number[] = [];
	for (let i = 0; i < ranges.length; i++) {
		const range = ranges[i];
		for (let index = range.start; index <= range.end; index++) {
			const newID = index;
			const stringNewId = newID.toString();
			if (regex.test(stringNewId)) {
				invalidNumbers.push(newID);
			}
		}
	}
	output = invalidNumbers.reduce((sum, num) => sum + num, 0);

	//Output of solution
	return output;
}

export { puzzle1, puzzle2 };
