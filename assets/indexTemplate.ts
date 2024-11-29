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

const regex = /^day.*\.(ts|js)$/;

fs.readdirSync(dayPath).forEach((file: string) => {
	if (regex.test(file)) {
		const name = file.replace(/\..s$/, '');
		days[name] = require(`./${file}`);
	}
});

export default days;
