// Link to AoC: https://adventofcode.com/2024/day/2

// Modules
import * as helpers from '../helpers';

const input = helpers.fileHandler.getFileWithSplit('Day2.txt', '\n');

function puzzle1(): Number {
	//Default variables
	let output = 0;

	//Puzzle solving
	for (const report of input) {
		const levels = report.split(' ').map(Number);
		if (isReportSafe(levels)) output++;
	}

	//Output of solution
	return output;
}

function puzzle2(): Number {
	//Default variables
	let output = 0;

	//Puzzle solving
	for (const report of input) {
		const levels = report.split(' ').map(Number);

		let tolerate = false;
		for (let i = 0; i < levels.length; i++) {
			const removed = [...levels.slice(0, i), ...levels.slice(i + 1)];

			if (isReportSafe(removed)) {
				tolerate = true;
				break;
			}
		}
		if (isReportSafe(levels) || tolerate) output++;
	}

	//Output of solution
	return output;
}

function isReportSafe(levels: number[]): boolean {
	const differences: number[] = [];

	for (let i = 1; i < levels.length; i++) {
		differences.push(levels[i] - levels[i - 1]);
	}

	const increasing = differences.every((d) => d >= 1 && d <= 3);
	const decreasing = differences.every((d) => d <= -1 && d >= -3);

	return increasing || decreasing;
}

export { puzzle1, puzzle2 };
