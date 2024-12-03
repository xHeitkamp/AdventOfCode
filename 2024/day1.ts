// Link to AoC: https://adventofcode.com/2024/day/1

// Modules
import * as helpers from '../helpers';

type LocationLists = {
	left: Array<number>;
	right: Array<number>;
};

const input = helpers.fileHandler.getFileWithSplit('Day1.txt', '\n');

// Get lists for both puzzles
const lists: LocationLists = { left: [], right: [] };
for (let i = 0; i < input.length; i++) {
    const element = input[i];
    const inputs = element.split('   ');
    lists.left.push(Number(inputs[0]));
    lists.right.push(Number(inputs[1]));
}
lists.left.sort((a, b) => a - b);
lists.right.sort((a, b) => a - b);

function puzzle1(): Number {
	//Default variables
	let output = 0;

	//Puzzle solving
    for (let i = 0; i < lists.left.length; i++) {
        output += Math.abs(lists.left[i] - lists.right[i]);
    }

	//Output of solution
	return output;
}

function puzzle2(): Number {
	//Default variables
	let output = 0;

	//Puzzle solving
    const frequencyMap = lists.right.reduce<Record<string | number, number>>((obj, b) => {
        obj[b] = (obj[b] || 0) + 1;
        return obj;
      }, {});
    for (let i = 0; i < lists.left.length; i++) {
        const element = lists.left[i];
        const frequency = frequencyMap[element] || 0;
        output += element * frequency;
    }

	//Output of solution
	return output;
}

export { puzzle1, puzzle2 };
