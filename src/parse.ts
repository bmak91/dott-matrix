import { Interface as RLInterface } from "readline";
import { toMatrix } from "./matrix";
import { Input } from "./types";
import chalk from "chalk";

// passing the rl as a dependency allows us to test this with custom input
export const getInput = (rl: RLInterface): Promise<string[]> =>
  new Promise((res, rej) => {
    let input: string[] = [];
    let forcedExit = true;

    rl.on("line", (l) => {
      // treat 2 empty lines as end of input
      if (input[input.length - 1] === "" && l === "") {
        input = input.slice(0, -1);
        forcedExit = false;
        rl.close();
        return;
      }
      input.push(l);
    });

    rl.on("close", () => {
      // reject if user quitting program
      if (forcedExit) rej();
      res([...input]);
    });

    console.log(chalk.greenBright("Please input the matrix description: "));
    rl.prompt();
  });

export const parseInput = (input: string[]): Input => {
  let parsed: Input = {
    numTests: 0,
    tests: [],
  };

  parsed.numTests = parseInt(input[0]);
  if (!Number.isInteger(parsed.numTests)) {
    throw new Error(`Malformed input: expected number of tests on first line`);
  }

  // get our tests one by one and create matrices
  for (let value of getTests(input.slice(1))) {
    let test = toMatrix(value);
    if (test) {
      parsed.tests.push(test);
    }
  }

  if (parsed.tests.length !== parsed.numTests) {
    throw new Error(
      `Malformed input: expected ${parsed.numTests} test(s) but got ${parsed.tests.length}`
    );
  }

  return parsed;
};

/** A great way of getting tests one by one is to use a generator */
export function* getTests(
  input: string[]
): Generator<string[], void, undefined> {
  let test: string[] = [];
  for (let line of input) {
    // when we reach an empty line we can return the section
    if (line === "") {
      yield test;
      test = [];
    } else {
      test.push(line);
    }
  }
  yield test;
}
