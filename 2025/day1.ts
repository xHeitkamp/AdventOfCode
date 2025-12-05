// Link to AoC: https://adventofcode.com/2025/day/1

function puzzle1(data: String): Number {
	//Default variables
	let output = 0;

	//Input
	const sequences = data.split('\n').map((line) => {
		return {
			rotation: line.slice(0, 1),
			distance: Number(line.slice(1)),
		};
	});

	//Puzzle solving
	let dial = 50;
	for (let i = 0; i < sequences.length; i++) {
		const sequence = sequences[i];
		const distance = sequence.rotation === 'R' ? sequence.distance : -sequence.distance;
		dial = (dial + distance) % 100;
		if (dial < 0) dial += 100;
		if (dial === 0) output++;
	}

	//Output of solution
	return output;
}

function puzzle2(data: String): Number {
	//Default variables
	let output = 0;

	//Input
	const sequences = data.split('\n').map((line) => {
		return {
			rotation: line.slice(0, 1),
			distance: Number(line.slice(1)),
		};
	});

	//Puzzle solving
	let current = 50;
	for (let i = 0; i < sequences.length; i++) {
		const sequence = sequences[i];
		let distance = sequence.distance;

		// Count and reduce full rotations first
		if (distance >= 100) {
			output += Math.floor(distance / 100);
			distance -= 100 * Math.floor(distance / 100);
		}

		const previous = current;
		current += sequence.rotation === 'R' ? distance : distance * -1;
		// Over 99
		if (current > 99) {
			current -= 100;
			if (current != 0 && previous != 0) output += 1;
		}
		// Under 0
		if (current < 0) {
			current += 100;
			if (current != 0 && previous != 0) output += 1;
		}
		// Update equals
		if (current === 0) output += 1;
	}

	//Output of solution
	return output;
}

export { puzzle1, puzzle2 };
