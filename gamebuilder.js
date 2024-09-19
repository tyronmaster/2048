import { SIZE } from "./env.js";
import { Grid } from "./grid.js";

export class GameBuilder {
  constructor(size = SIZE) {
    this.size = size;

    this.start();
  }

  start() {
    this.grid = new Grid(this.size);
    this.score = 0;
    this.gameOver = false;
    this.gameWon = false;

    this.addFirstTile();
  }

  addFirstTile() {
    console.log("add first 2");
  }
}
