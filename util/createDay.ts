import axios, { isAxiosError } from 'axios';
import {
	readFileSync,
	writeFileSync,
	existsSync,
	mkdirSync,
	copyFileSync,
} from 'fs';
import { join } from 'path';
import * as helpers from '../helpers';

const valid_arguments = 1;
const args: string[] = process.argv.slice(2); // Get the command-line arguments
const year = helpers.getEnv.getYear();
const sessionCookie = helpers.getEnv.getSessionCookie();

// Check if the required number of arguments is provided

const currentDay = new Date().getDate();
const currentMonth = new Date().getMonth() + 1;
if (
	args.length === 0 &&
	currentMonth === 12 &&
	(currentDay >= 1 || currentDay <= 25)
) {
	args.push(new Date().getDate().toString());
} else if (args.length === valid_arguments) {
} else {
	console.error('Usage: npm run init <?day[1-25]>');
	process.exit(1);
}

// Extract the arguments
const dayArg = parseInt(args[0]);

// Check if the arguments are valid numbers
if (isNaN(dayArg) || dayArg < 1 || dayArg > 25) {
	console.error(
		`Invalid argument (Day: ${dayArg}). Please set <day[1-25]> as a valid number.`
	);
	process.exit(1);
}

const directoryPath = join('.', year);

writeDayFile(dayArg);
getAoCInput(dayArg);

function writeDayFile(day: number): void {
	const templateDayFile = join('.', 'assets', 'dayTemplate.ts');
	const templateIndexFile = join('.', 'assets', 'indexTemplate.ts');
	const templateReadmeFile = join('.', 'assets', 'READMETemplate.md');

	//Create directory
	const dayPath = join(directoryPath, `day${day}.ts`);
	if (!existsSync(directoryPath)) {
		mkdirSync(directoryPath, { recursive: true });
		copyFileSync(templateIndexFile, join(directoryPath, 'index.ts'));
		//Readme
		const template = readFileSync(templateReadmeFile, 'utf8');
		let newReadme = template
		newReadme = newReadme.replace(/&YEAR&/g, `${year}`);
		newReadme = newReadme.replace(/&DAY&/g, `${day}`);
		if (!existsSync(dayPath)) {
			writeFileSync(join(directoryPath, 'README.md'), newReadme);
		}
	}

	//Create day file
	const template = readFileSync(templateDayFile, 'utf8');
	let newDayFile = template;
	newDayFile = newDayFile.replace(/&YEAR&/g, `${year}`);
	newDayFile = newDayFile.replace(/&DAY&/g, `${day}`);
	if (!existsSync(dayPath)) {
		writeFileSync(dayPath, newDayFile);
	}
}

async function getAoCInput(day: number): Promise<void> {
	const url = `https://adventofcode.com/${year}/day/${day}/input`;

	//Check if directory exists or file already exists
	const inputDirectory = join(directoryPath, 'inputs');
	const filePath = join(inputDirectory, `Day${day}.txt`);
	if (!existsSync(inputDirectory)) {
		mkdirSync(inputDirectory, { recursive: true });
	}
	if (existsSync(filePath)) {
		return;
	}

	//Download input
	try {
		const response = await axios.get(url, {
			headers: {
				Cookie: `session=${sessionCookie}`,
				'User-Agent': 'typescript-axios-client',
			},
			responseType: 'text',
		});
		const data = String(response.data);

		//Remove last line if empty
		const lines: string[] = data.split('\n');
		while (lines.length > 0 && lines[lines.length - 1].trim() === '') {
			lines.pop();
		}
		const input = lines.join('\n');

		try {
			writeFileSync(filePath, input);
		} catch (error) {
			console.error(error);
		}
	} catch (error) {
		if (isAxiosError(error) && error.response) {
			console.error(
				`Fehler (${error.response.status}): ${error.response.data}`
			);
		} else {
			console.error(`Fehler: ${error}`);
		}
	}
}
