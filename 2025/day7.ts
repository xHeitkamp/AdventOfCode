// Link to AoC: https://adventofcode.com/2025/day/7

function puzzle1(data: String): Number {
	//Default variables
	let output = 0;

	//Input
	const input = data.split('\n');
	const manifold = input.map((line) => line.split(''));

	//Puzzle solving
	const start = manifold[0].indexOf('S');
	let beams: number[] = [start];
	for (let i = 2; i < manifold.length; i = i + 2) {
		const row = manifold[i];
		const newBeams: number[] = [];
		for (let j = 0; j < beams.length; j++) {
			const beam = beams[j];
			if (row[beam] === '^') {
				output++;
				newBeams.push(beam - 1);
				newBeams.push(beam + 1);
			} else {
				newBeams.push(beam);
			}
		}
		beams = Array.from(new Set(newBeams));
	}

	//Output of solution
	return output;
}

function puzzle2(data: String): Number {
	//Default variables
	let output = 0;

	//Input
	const input = data.split('\n');
	const manifold = input.map((line) => line.split(''));

	//Puzzle solving
	const start = manifold[0].indexOf('S');
	const beams: number[] = new Array(manifold[0].length).fill(0);
	beams[start] = 1;
	for (let i = 2; i < manifold.length; i = i + 2) {
		const row = manifold[i];
		let split = row.indexOf('^', 0);
		while (split != -1) {
			if (beams[split] > 0) {
				beams[split - 1] += beams[split];
				beams[split + 1] += beams[split];
				beams[split] = 0;
			}
			split = row.indexOf('^', split + 1);
		}
	}
	output = beams.reduce((a, b) => a + b, 0);

	//Output of solution
	return output;
}

export { puzzle1, puzzle2 };
