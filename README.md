# 🎄 AdventOfCode 🎄

These are my solutions in TypeScript/JavaScript of the Advent of Code in different years. Have a wonderful christmas! 🎄🎄🎄

## What is Advent of Code?

[Advent of Code](https://adventofcode.com/) is an Advent calendar of small programming puzzles for a variety of skill sets and skill levels that can be solved in any programming language you like. People use them as a speed contest, interview prep, company training, university coursework, practice problems, or to challenge each other.

You don't need a computer science background to participate - just a little programming knowledge and some problem solving skills will get you pretty far. Nor do you need a fancy computer; every problem has a solution that completes in at most 15 seconds on ten-year-old hardware.

## How to run my code?

In the [package.json](package.json) you can specify the year that you want to run

```json
{
	...
	"config": {
		"year": 2024
	},
	...
}
```

To get my solutions, just run following commands:

```bash
npm install
npm run start
```

If you want to run a specific day or a specific puzzle. In this example I want to see the solutions of day 2:

```bash
npm run day <day> <puzzle> <performance>

#Examples
npm run day 2           #Runs Day2 with both puzzles
npm run day 2 1         #Runs Day2 Puzzle1
npm run day 2 1 true    #Runs Day2 Puzzle1 and logs the time in ms
```

To initialize a new day, you can do that if just one line.
When you are in the advent you do not need to specify anything. But if you aren't you need to input your wished day.

```bash
npm run init <?day>

#Examples
npm run init       #Only in december 1-25
npm run init 14    #Creates the day 14 for you
```

## Years of Advent of Code

Each year of me participating in AoC you can find here

-   [AoC 2025](2025/README.md)
-   [AoC 2024](2024/README.md)
-   [AoC 2023](2023/README.md)

## License

For this project I am using the [MIT](LICENSE) license
