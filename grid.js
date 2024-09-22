import { SIZE } from "./env.js";

export class Grid {
  constructor(size) {
    this.size = SIZE;
    this.matrix = this.emptyMatrix();
  }

  emptyMatrix() {
    const matrix = Array.from(new Array(this.size), () =>
      Array.from(new Array(this.size), () => null)
    );
    return matrix;
  }

  availableRandomPosition() {
    const availablePositions = this.availablePositions();
    if (availablePositions.length)
      return availablePositions[
        Math.floor(Math.random() * availablePositions.length)
      ];
  }

  availablePositions() {
    const availablePositions = [];
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        if (this.matrix[x][y] === null) availablePositions.push({ x: x, y: y });
      }
    }
    return availablePositions;
  }

  isPositionsAvailable() {
    return !!this.availablePositions().length;
  }

  insertTile(tile) {
    this.matrix[tile.x][tile.y] = tile;
  }

  removeTile(tile) {
    this.matrix[tile.x][tile.y] = null;
  }
}
