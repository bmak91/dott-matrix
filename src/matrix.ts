import { Cell } from "./types";
import { getDistance } from "./utils";

export default class Matrix {
  values: Array<Array<number>> = [];
  hotspots: Cell[] = [];
  constructor(readonly rows: number, readonly columns: number) {}

  getDistances = () => {
    let dist: Array<Array<number>> = [];
    for (let [i, r] of this.values.entries()) {
      dist[i] = [];
      for (let [j, c] of r.entries()) {
        if (c === 1) {
          dist[i].push(0);
        } else {
          let minDistance = Math.min(
            ...this.hotspots.map((h) => getDistance(h, [i, j]))
          );
          dist[i].push(minDistance);
        }
      }
    }
    return dist;
  };

  getDistancesBfs = () => {
    // if cell value is -1 we know it's not yet visited
    let dist = Array.from(Array(this.rows), () => Array(this.columns).fill(-1));
    let queue = [...this.hotspots];
    const isQueued = (x: number, y: number) =>
      queue.some(([a, b]) => x === a && y === b);

    let minDistance = 0;

    while (queue.length > 0) {
      // store value for each run as we're always updating the queue
      let l = queue.length;
      for (let i = 0; i < l; i++) {
        let [x, y] = queue.shift() as Cell;
        dist[x][y] = minDistance;

        if (x > 0) {
          // if already in queue we won't queue again
          if (dist[x - 1][y] === -1 && !isQueued(x - 1, y)) {
            dist[x - 1][y] = 1;
            queue.push([x - 1, y]);
          }
        }

        if (y > 0) {
          if (dist[x][y - 1] === -1 && !isQueued(x, y - 1)) {
            dist[x][y - 1] = 1;
            queue.push([x, y - 1]);
          }
        }

        if (x < this.rows - 1) {
          if (dist[x + 1][y] === -1 && !isQueued(x + 1, y)) {
            dist[x + 1][y] = 1;
            queue.push([x + 1, y]);
          }
        }

        if (y < this.columns - 1) {
          if (dist[x][y + 1] === -1 && !isQueued(x, y + 1)) {
            dist[x][y + 1] = 1;
            queue.push([x, y + 1]);
          }
        }
      }

      // as we move from queue to queue, we increment the min distance
      minDistance++;
    }

    return dist;
  };
}

export function toMatrix(value: string[]) {
  if (value.length === 0) return;

  let [rows, columns] = value[0]
    .split(" ")
    // parseInt takes a radix as second param, `.map(parseInt)` won't work
    .map((x) => parseInt(x));

  if (!rows || !columns) return;
  let matrix = new Matrix(rows, columns);

  // skip first row and start constructing our matrix
  for (let [i, row] of value.slice(1).entries()) {
    let r: number[] = [];
    let h: Array<[number, number]> = [];
    for (let [j, c] of [...row].map((x) => parseInt(x)).entries()) {
      r.push(c);
      if (c === 1) {
        // since we're already looping, we're storing the locations
        // of white cells as we're gonna use them later
        h.push([i, j]);
      }
    }

    matrix.values.push(r);
    matrix.hotspots = [...matrix.hotspots, ...h];
  }

  return matrix;
}
