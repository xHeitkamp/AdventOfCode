// Link to AoC: https://adventofcode.com/2025/day/5

function puzzle1(data: String): Number {
	//Default variables
	let output = 0;

	//Input
	const input = data.split('\n\n');
	const ranges = input[0]
		.split('\n')
		.map((range) => range.split('-').map(Number));
	const ingredients = input[1].split('\n').map((ingredient) => Number(ingredient));

	//Puzzle solving
	for (let i = 0; i < ingredients.length; i++) {
		const ingredient = ingredients[i];
		for (let j = 0; j < ranges.length; j++) {
			const range = ranges[j];
			if (ingredient >= range[0] && ingredient <= range[1]) {
				output++;
				break;
			}
		}
	}

	//Output of solution
	return output;
}

function puzzle2(data: String): Number {
	//Default variables
	let output = 0;

	//Input
	const input = data.split('\n\n');
	const ranges = input[0]
		.split('\n')
		.map((range) => range.split('-').map(Number))
		.sort((a, b) => a[0] - b[0]);

	//Puzzle solving
	const freshRanges: number[][] = [];
	for (let i = 0; i < ranges.length; i++) {
		if (freshRanges.length === 0) {
			freshRanges.push(ranges[i]);
			continue;
		}
		if (freshRanges.at(-1)![1] >= ranges[i][0]) {
			freshRanges.at(-1)![1] = Math.max(freshRanges.at(-1)![1], ranges[i][1]);
			continue;
		}
		freshRanges.push(ranges[i]);
	}
	output = freshRanges.reduce((sum, range) => sum + (range[1] - range[0] + 1), 0);

	//Output of solution
	return output;
}

export { puzzle1, puzzle2 };
