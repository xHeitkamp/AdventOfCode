// Modules
const helpers = require('../helpers');

function puzzle1() {
	//Default variables
	const input = helpers.fileHandler.getFileWithSplit('Day7.txt', '\n');
	let output = 0;

	//Puzzle solving
	const camelCards = input2CamelCard(input);
	const handsDistribution = camel2Hands(camelCards);
	for (const hand in handsDistribution) {
		handsDistribution[hand] = customSort(
			handsDistribution[hand],
			'AKQJT98765432'
		);
	}
	const hands = [
		...handsDistribution.high,
		...handsDistribution.one,
		...handsDistribution.two,
		...handsDistribution.three,
		...handsDistribution.fullHouse,
		...handsDistribution.four,
		...handsDistribution.five,
	];
	output = hands.reduce((acc, curr, index) => {
		return acc + curr.bid * (index + 1);
	}, 0);

	//Output of solution
	return output;
}

function puzzle2() {
	//Default variables
	const input = helpers.fileHandler.getFileWithSplit('Day7.txt', '\n');
	let output = 0;

	//Puzzle solving
	const camelCards = input2CamelCard(input);
	const handsDistribution = camel2Hands(camelCards, true);
	for (const hand in handsDistribution) {
		handsDistribution[hand] = customSort(
			handsDistribution[hand],
			'AKQT98765432J'
		);
	}
	const hands = [
		...handsDistribution.high,
		...handsDistribution.one,
		...handsDistribution.two,
		...handsDistribution.three,
		...handsDistribution.fullHouse,
		...handsDistribution.four,
		...handsDistribution.five,
	];
	output = hands.reduce((acc, curr, index) => {
		return acc + curr.bid * (index + 1);
	}, 0);

	//Output of solution
	return output;
}

function input2CamelCard(input) {
	return input.map((row) => {
		return {
			hand: row.split(' ')[0],
			bid: Number(row.split(' ')[1]),
		};
	});
}

function camel2Hands(camelCards, part2 = false) {
	const hands = {
		five: [],
		four: [],
		fullHouse: [],
		three: [],
		two: [],
		one: [],
		high: [],
	};
	for (let index = 0; index < camelCards.length; index++) {
		const game = camelCards[index];
		const chars = countCharacters(game.hand, part2);
		if (chars.includes(5)) {
			hands.five.push(game);
			continue;
		}
		if (chars.includes(4)) {
			hands.four.push(game);
			continue;
		}
		if (chars.includes(3) && chars.includes(2)) {
			hands.fullHouse.push(game);
			continue;
		}
		if (chars.includes(3)) {
			hands.three.push(game);
			continue;
		}
		if (chars.filter((number) => number === 2).length === 2) {
			hands.two.push(game);
			continue;
		}
		if (chars.includes(2)) {
			hands.one.push(game);
			continue;
		}
		hands.high.push(game);
	}
	return hands;
}

function countCharacters(inputString, part2 = false) {
	const charCount = {};
	for (let char of inputString) {
		if (!charCount[char]) {
			charCount[char] = 1;
		} else {
			charCount[char]++;
		}
	}

	if (part2 && charCount.hasOwnProperty('J')) {
		let highestKey;
		let highestValue = 0;
		for (const [key, value] of Object.entries(charCount)) {
			if (key === 'J') continue;
			if (value > highestValue) {
				highestValue = value;
				highestKey = key;
			}
		}
		charCount[highestKey] += charCount['J'];
		if (inputString.split('').filter((ele) => ele === 'J').length === 5)
			charCount['Y'] = 5;
		charCount['J'] *= -1;
	}
	return Object.values(charCount);
}

function customSort(array, order) {
	let sortedArray = array;

	for (let index = 4; index >= 0; index--) {
		sortedArray = sortedArray.sort((a, b) => {
			const handA = a.hand;
			const handB = b.hand;

			return (
				order.indexOf(handB.charAt(index)) -
				order.indexOf(handA.charAt(index))
			);
		});
	}

	return sortedArray;
}

module.exports = { puzzle1, puzzle2 };
