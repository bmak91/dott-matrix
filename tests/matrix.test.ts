import { toMatrix } from "../src/matrix";

test("create matrix from string array", () => {
  let test = ["2 3", "010", "100"];
  let { columns, rows, hotspots } = toMatrix(test);

  expect(rows).toBe(2);
  expect(columns).toBe(3);
  expect(hotspots.length).toBe(2);
  expect(hotspots).toStrictEqual([
    [0, 1],
    [1, 0],
  ]);
});

test("handle invalid input", () => {
  let res = toMatrix([]);
  expect(res).toStrictEqual(undefined);

  res = toMatrix(["asfasfa"]);
  expect(res).toStrictEqual(undefined);
});

test("get distances to closest white", () => {
  let test = ["4 4", "0110", "1000", "0001", "1010"];
  let m = toMatrix(test);

  expect(m.getDistances()).toStrictEqual([
    [1, 0, 0, 1],
    [0, 1, 1, 1],
    [1, 2, 1, 0],
    [0, 1, 0, 1],
  ]);
});

test("get distances to closest white using BFS", () => {
  let test = ["4 4", "0110", "1000", "0001", "1010"];
  let m = toMatrix(test);

  expect(m.getDistancesBfs()).toStrictEqual([
    [1, 0, 0, 1],
    [0, 1, 1, 1],
    [1, 2, 1, 0],
    [0, 1, 0, 1],
  ]);
});

test("both distances methods return the same result", () => {
  let test = ["4 4", "0110", "1000", "0001", "1010"];
  let m = toMatrix(test);

  let expected = [
    [1, 0, 0, 1],
    [0, 1, 1, 1],
    [1, 2, 1, 0],
    [0, 1, 0, 1],
  ];

  expect(m.getDistances()).toStrictEqual(expected);

  expect(m.getDistancesBfs()).toStrictEqual(expected);
});
