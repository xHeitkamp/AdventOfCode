import { performance } from 'perf_hooks';
import * as helpers from '../helpers';

const valid_arguments = 3;
const args: string[] = process.argv.slice(2);
const year = helpers.getEnv.getYear();

// Check if the required number of arguments is provided
if (args.length === 0 || args.length > valid_arguments) {
	console.error(
		'Usage: npm run day <day[1-25]> <?puzzle[1|2]> <performance[true|false]'
	);
	process.exit(1);
}

// Extract the arguments
const dayArg = parseInt(args[0]);
const puzzleArg = parseInt(args[1]);
const performanceArg = Boolean(args[2]);

// Check if the arguments are valid numbers
if (isNaN(dayArg) || dayArg < 1 || dayArg > 25) {
	console.error('Invalid argument. Please set <day[1-25]> as a valid number.');
	process.exit(1);
}
if ((isNaN(puzzleArg) && args.length < 1) || puzzleArg < 1 || puzzleArg > 2) {
	console.error('Invalid argument. Please set <puzzle[1-2]> as a valid number.');
	process.exit(1);
}

runDay(year, dayArg);

async function runDay(year: string, day: Number): Promise<void> {
	const days = (await import(`../${year}`)).default;

	let outputString = '';
	const dayRequire = `day${day}`;
	const startTimer = performance.now();
	if (isNaN(puzzleArg)) {
		outputString += `Puzzle 1: ${days[dayRequire].puzzle1()}\n`;
		outputString += `Puzzle 2: ${days[dayRequire].puzzle2()}\n`;
	} else if (puzzleArg === 1) {
		outputString += `Puzzle 1: ${days[dayRequire].puzzle1()}\n`;
	} else if (puzzleArg === 2) {
		outputString += `Puzzle 2: ${days[dayRequire].puzzle2()}\n`;
	}
	const stopTimer = performance.now();

	if (performanceArg) {
		outputString += `Execution time: ${(stopTimer - startTimer).toFixed(
			4
		)}ms`;
	}
	console.log(outputString);
}
