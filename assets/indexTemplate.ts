type DayModule = {
	puzzle1: () => Number;
	puzzle2: () => Number;
};
type DaysModule = {
	[key: string]: DayModule;
};

// Modules
import fs from 'fs';
const dayPath = require('path').join(__dirname);

const days: DaysModule = {};

fs.readdirSync(dayPath).forEach((file: String) => {
	const name = file.replace(/\..s$/, '');
	if (name === 'index' || name === 'inputs' ||name.includes('template')) return;
	days[name] = require(`./${file}`);
});

export default days;
