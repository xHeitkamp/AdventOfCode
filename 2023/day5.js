// Modules
const helpers = require('../helpers');

function puzzle1() {
	//Default variables
	const input = helpers.fileHandler.getFileWithSplit('Day5.txt', '\n');
	let output = 0;

	//Puzzle solving
	const { seeds, maps } = input2values(input);

	const locations = [];
	for (let index = 0; index < seeds.length; index++) {
		let seedToGrow = seeds[index];
		seedToGrow = growSeedWithMap(seedToGrow, maps.seed2soil);
		seedToGrow = growSeedWithMap(seedToGrow, maps.soil2fertilizer);
		seedToGrow = growSeedWithMap(seedToGrow, maps.fertilizer2water);
		seedToGrow = growSeedWithMap(seedToGrow, maps.water2light);
		seedToGrow = growSeedWithMap(seedToGrow, maps.light2temperatuer);
		seedToGrow = growSeedWithMap(seedToGrow, maps.temperature2humidity);
		seedToGrow = growSeedWithMap(seedToGrow, maps.humidity2location);
		locations.push(seedToGrow);
	}

	//Output of solution
	output = Math.min(...locations);
	return output;
}

function puzzle2() {
	//Default variables
	const input = helpers.fileHandler.getFileWithSplit('Day5.txt', '\n');
	let output = 0;

	//Puzzle solving

	//Output of solution
	return output;
}

function input2values(input) {
	//Get seeds
	const seeds = input[0]
		.split(':')[1]
		.split(' ')
		.map(Number)
		.filter((x) => x !== 0);

	//Get maps
	//Skip first 2 lines to jump to map
	const maps = [];
	let map = [];
	for (let i = 2; i < input.length; i++) {
		const row = input[i];
		if (row.includes('map:')) continue;
		if (row === '') {
			maps.push(map);
			map = [];
			continue;
		}
		map.push(row.split(' ').map(Number));
	}
	maps.push(map);

	const mapObject = {
		seed2soil: maps[0],
		soil2fertilizer: maps[1],
		fertilizer2water: maps[2],
		water2light: maps[3],
		light2temperatuer: maps[4],
		temperature2humidity: maps[5],
		humidity2location: maps[6],
	};

	return { seeds, maps: mapObject };
}

function mapNumber2New(number, sourceStart, destinationStart, rangeLength) {
	const sourceRange = sourceStart + rangeLength - 1;
	const mapDifference = destinationStart - sourceStart;
	if (sourceStart <= number && number <= sourceRange) {
		//If number in source range than map to destination map
		return number + mapDifference;
	}
	return number;
}

function growSeedWithMap(number, maps) {
	for (let index = 0; index < maps.length; index++) {
		const map = maps[index];
		const mappendNumber = mapNumber2New(number, map[1], map[0], map[2]);
		if (number !== mappendNumber) return mappendNumber;
	}
	return number;
}

module.exports = { puzzle1, puzzle2 };
