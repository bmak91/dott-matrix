import { getDistance } from "../src/utils";

test("get distance between 2 cells", () => {
  expect(getDistance([0, 0], [1, 1])).toBe(2);
  expect(getDistance([50, 50], [49, 49])).toBe(2);
});
