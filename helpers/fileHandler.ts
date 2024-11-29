// Modules
import fs from 'fs';
import * as helpers from '../helpers';

function getFileWithSplit(filename: String, split: String): Array<String> {
	const year = helpers.getEnv.getYear();
	//Read file
	const data = fs.readFileSync(`./${year}/inputs/${filename}`, 'utf8');
	const stream = data.split(`${split}`);

	return stream;
}

export { getFileWithSplit };
