import { Cell } from "./types";

export const getDistance = (a: Cell, b: Cell) =>
  Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);

export const formatMatrix = (matrix: Array<number[]>, glue: string = " ") =>
  matrix.map((r) => r.join(glue)).join("\n");
