import test from 'node:test';
import assert from 'node:assert';
import * as helpers from '../helpers';

const valid_arguments = 2;
const args: string[] = process.argv.slice(2); // Get the command-line arguments

const year = helpers.getEnv.getYear();

// Check if the required number of arguments is provided
if (args.length === 0 || args.length > valid_arguments) {
	console.error('Usage: npm run test <day[1-25]> <?puzzle[1|2]>');
	process.exit(1);
}

// Extract the arguments
const dayArg = parseInt(args[0]);
const puzzleArg = parseInt(args[1]);

// Check if the arguments are valid numbers
if (isNaN(dayArg) || dayArg < 1 || dayArg > 25) {
	console.error('Invalid argument. Please set <day[1-25]> as a valid number.');
	process.exit(1);
}
if ((isNaN(puzzleArg) && args.length < 1) || puzzleArg < 1 || puzzleArg > 2) {
	console.error('Invalid argument. Please set <puzzle[1-2]> as a valid number.');
	process.exit(1);
}

testDay(year, dayArg, puzzleArg);

async function testDay(year: string, day: number, puzzle: number): Promise<void> {
	const days = (await import(`../${year}`)).default;

	const dayRequire = `day${day}`;
	try {
		const { inputs } = JSON.parse(helpers.fileHandler.getFileInput(`Day${day}-test.json`));
		for (let index = 0; index < inputs.length; index++) {
			const input = inputs[index];
			if (puzzle === 1 || isNaN(puzzle)) {
				test(`Puzzle 1: ${input.name}`, () => {
					assert.strictEqual(days[dayRequire].puzzle1(input.data), input.puzzle1);
				});
			}
			if (puzzle === 2 || isNaN(puzzle)) {
				test(`Puzzle 2: ${input.name}`, () => {
					assert.strictEqual(days[dayRequire].puzzle2(input.data), input.puzzle2);
				});
			}
		}
	} catch (error) {
		console.error(`Test for Day ${day} is not implemented yet.`);
	}
}
