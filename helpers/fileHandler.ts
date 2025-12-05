// Modules
import fs from 'fs';
import * as helpers from '../helpers';

function getFileInput(filename: String): string {
	const year = helpers.getEnv.getYear();
	//Read file
	const data = fs.readFileSync(`./${year}/inputs/${filename}`, 'utf8');
	return data;
}

function getFileWithSplit(filename: String, split: String): Array<string> {
	const data = getFileInput(filename);
	return data.split(`${split}`);
}

export { getFileInput, getFileWithSplit };
