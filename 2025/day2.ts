// Link to AoC: https://adventofcode.com/2025/day/2

function puzzle1(data: String): Number {
	//Default variables
	let output = 0;

	//Input
	const ranges = data
		.split('\n')
		.flatMap((line) => line.split(','))
		.map((range) => {
			const [start, end] = range.split('-').map(Number);
			return { start, end };
		});

	//Puzzle solving
	const invalidNumbers: number[] = [];
	for (let i = 0; i < ranges.length; i++) {
		const range = ranges[i];
		for (let index = range.start; index <= range.end; index++) {
			const newID = index;
			const stringNewId = newID.toString();
			if (stringNewId.length % 2 === 0) {
				if (
					stringNewId.substring(0, stringNewId.length / 2) ===
					stringNewId.substring(stringNewId.length / 2)
				) {
					invalidNumbers.push(newID);
				}
			}
		}
	}
	output = invalidNumbers.reduce((sum, num) => sum + num, 0);

	//Output of solution
	return output;
}

function puzzle2(data: String): Number {
	//Default variables
	let output = 0;

	//Input
	const ranges = data
		.split('\n')
		.flatMap((line) => line.split(','))
		.map((range) => {
			const [start, end] = range.split('-').map(Number);
			return { start, end };
		});

	//Puzzle solving
	const regex = /^(\d+)\1+$/g;
	const invalidNumbers: number[] = [];
	for (let i = 0; i < ranges.length; i++) {
		const range = ranges[i];
		for (let index = range.start; index <= range.end; index++) {
			const newID = index;
			const stringNewId = newID.toString();
			if (regex.test(stringNewId)) {
				invalidNumbers.push(newID);
			}
		}
	}
	output = invalidNumbers.reduce((sum, num) => sum + num, 0);

	//Output of solution
	return output;
}

export { puzzle1, puzzle2 };
