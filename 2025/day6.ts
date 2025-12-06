// Link to AoC: https://adventofcode.com/2025/day/6

import { parse } from 'path';

function puzzle1(data: String): Number {
	//Default variables
	let output = 0;

	//Input
	const input = data.split('\n');
	const lines = input.map((line) =>
		line
			.split(' ')
			.filter((ele) => ele.trim() !== '')
			.map((ele) => {
				const converted = parseInt(ele);
				return isNaN(converted) ? ele : converted;
			})
	);

	//Puzzle solving
	const solutions: number[] = [];
	const operations = lines.at(-1);
	if (!operations) return output;
	lines.pop();
	for (let column = 0; column < lines[0].length; column++) {
		const numbers: string[] = [];
		for (let row = 0; row < lines.length; row++) {
			numbers.push(`${lines[row][column]}`);
		}
		solutions.push(Number(eval(numbers.join(`${operations[column]}`))));
	}
	output = solutions.reduce((a, b) => a + b, 0);

	//Output of solution
	return output;
}

function puzzle2(data: String): Number {
	//Default variables
	let output = 0;

	//Input
	const input = data.split('\n');
	const lines = input.map((line) =>
		line
			.replace(/\s/g, '0')
			.split('')
			.map((ele) => {
				const converted = parseInt(ele);
				return isNaN(converted) ? ele : converted;
			})
	);

	//Puzzle solving
	const solutions: number[] = [];
	const operations = lines.at(-1)?.filter((ele) => ele !== 0);
	if (!operations) return output;
	lines.pop();
	let operationIndex = operations.length - 1;
	let numbers: string[] = [];
	for (let column = lines[0].length - 1; column >= 0; column--) {
		let numberString = '';
		for (let index = 0; index < lines.length; index++) {
			numberString += `${lines[index][column]}`;
		}
		if (parseInt(numberString) === 0) {
			solutions.push(Number(eval(numbers.join(`${operations[operationIndex]}`))));
			operationIndex--;
			numbers = [];
		} else {
			numbers.push(numberString.replace(/0+/, ''));
		}
	}
	solutions.push(Number(eval(numbers.join(`${operations[operationIndex]}`))));
	output = solutions.reduce((a, b) => a + b, 0);

	//Output of solution
	return output;
}

export { puzzle1, puzzle2 };
