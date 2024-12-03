// Link to AoC: https://adventofcode.com/&YEAR&/day/&DAY&

// Modules
import * as helpers from '../helpers';

const input = helpers.fileHandler.getFileWithSplit('Day&DAY&.txt', '\n');

function puzzle1(): Number {
    //Default variables
    let output = 0;

    //Puzzle solving
    output = input.length;

    //Output of solution
    return output;
}

function puzzle2(): Number {
    //Default variables
    let output = 0;

    //Puzzle solving
    output = input.length;

    //Output of solution
    return output;
}

export { puzzle1, puzzle2 };