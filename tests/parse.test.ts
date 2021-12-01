import readline from "readline";
import { getInput, getTests, parseInput } from "../src/parse";
import { Readable } from "stream";

test("create an input object from the string array", () => {
  let input = parseInput([
    "2",
    "2 3",
    "010",
    "001",
    "",
    "4 4",
    "0110",
    "1000",
    "0001",
    "1010",
  ]);

  expect(input.numTests).toBe(2);
  expect(input.tests.length).toBe(2);
});

test("create an input object from the string array", () => {
  let input = parseInput([
    "2",
    "2 3",
    "010",
    "001",
    "",
    "4 4",
    "0110",
    "1000",
    "0001",
    "1010",
  ]);

  expect(input.numTests).toBe(2);
  expect(input.tests.length).toBe(2);
});

test("get stdin input as string array", async () => {
  let t = `2
2 3
010
001

4 4
0110
1000
0001
1010
`;

  const s = new Readable();
  s._read = () => {};

  let rl = readline.createInterface({
    input: s,
    output: process.stdout,
  });

  let task = getInput(rl);
  s.push(`${t}\n\n`);

  let parsed = await task;
  expect(parsed).toStrictEqual([
    "2",
    "2 3",
    "010",
    "001",
    "",
    "4 4",
    "0110",
    "1000",
    "0001",
    "1010",
  ]);
});

test("2 newlines end the input", async () => {
  let t = `2
2 3
010
001


4 4
0110
1000
0001
1010
`;
  const s = new Readable();
  s._read = () => {};

  let rl = readline.createInterface({
    input: s,
    output: process.stdout,
  });

  let task = getInput(rl);
  s.push(`${t}\n\n`);

  let parsed = await task;
  expect(parsed).toStrictEqual(["2", "2 3", "010", "001"]);
});

test("generator splits the tests properly", () => {
  let iter = getTests(["abc", "def", "", "lmn", "opq", ""]);

  expect(iter.next().value).toStrictEqual(["abc", "def"]);
  expect(iter.next().value).toStrictEqual(["lmn", "opq"]);
});
