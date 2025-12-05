import * as helpers from './helpers';
const year = helpers.getEnv.getYear();

console.log(helpers.texts.createASCII(`AoC ${year}`), '\n');
runYear(year);

async function runYear(year: string): Promise<void> {
	const days = (await import(`./${year}`)).default;

	for (let day in days) {
		const data = helpers.fileHandler.getFileInput(
			`${String(day).charAt(0).toUpperCase() + String(day).slice(1)}.txt`
		);
		console.log(`***** ${day[0].toUpperCase() + day.slice(1, 3)} ${day.slice(3)} *****`);
		console.log(`Puzzle 1: ${days[day].puzzle1(data)}`);
		console.log(`Puzzle 2: ${days[day].puzzle2(data)}\n`);
	}

	console.log(
		`🎄 Wishing you bug-free days and silent nights of code delight! Happy coding and Merry Christmas! 🎅🎁\n`
	);
}
