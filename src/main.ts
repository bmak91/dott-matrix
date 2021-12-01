import { getInput, parseInput } from "./parse";
import readline from "readline";
import { formatMatrix } from "./utils";
import chalk from "chalk";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export default async function main() {
  try {
    let input = await getInput(rl);

    if (input.length === 0) {
      console.log(chalk.red("no input detected. exiting.."));
    }

    let parsed = parseInput(input);
    console.log(chalk.gray("=============\n"));

    for (let m of parsed.tests) {
      console.log(chalk.greenBright(formatMatrix(m.getDistancesBfs())));
      console.log("\n");
    }
  } catch (e) {
    if (e) {
      console.error(chalk.redBright(`${(e as Error).message}\n`));
    }
  }
}

export async function perfTest() {
  let input = await getInput(rl);

  if (input.length === 0) return;
  console.log(chalk.gray("=============\n"));

  let parsed = parseInput(input);

  for (let m of parsed.tests) {
    let hrstart = process.hrtime();
    for (let i = 0; i < 100; i++) {
      formatMatrix(m.getDistancesBfs());
    }
    let hrend = process.hrtime(hrstart);
    console.info(
      "Execution time BFS (hr): %ds %dms",
      hrend[0],
      hrend[1] / 1000000
    );

    hrstart = process.hrtime();
    for (let i = 0; i < 100; i++) {
      formatMatrix(m.getDistances());
    }
    hrend = process.hrtime(hrstart);
    console.info("Execution time (hr): %ds %dms", hrend[0], hrend[1] / 1000000);
    console.log("\n");
  }
}
