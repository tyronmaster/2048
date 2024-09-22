import { Draw } from "./draw.js";
import { SIZE } from "./env.js";
import { Grid } from "./grid.js";
import { Tile } from "./tile.js";

export class GameBuilder {
  constructor(size = SIZE) {
    this.size = size;

    this.start();
  }

  start() {
    this.grid = new Grid(this.size);
    // console.log(this.grid.matrix);
    this.score = 0;
    this.gameOver = false;
    this.gameWon = false;

    this.addFirstTile();
    this.draw = new Draw();
    this.draw.drawInit(this.grid.matrix);

    this.listener();
  }

  addFirstTile() {
    const tile = new Tile(this.grid.availableRandomPosition(), 2);
    this.grid.insertTile(tile);
  }

  addTile() {
    if (this.grid.isPositionsAvailable()) {
      const value = Math.floor(Math.random() > 0.9 ? 4 : 2);
      const tile = new Tile(this.grid.availableRandomPosition(), value);

      this.grid.insertTile(tile);
    } else {
      window.alert("Game over!");
    }
  }

  move(direction) {
    //to left x: 0; to right x: -1; to up y: 0; to down: -1;
    let cells = [];
    for (let x = 0; x < this.size + direction.x; x++) {
      let row = this.grid.matrix[x].filter((el) => el !== null);
      if (!row.length) {
        cells.push(Array.from(new Array(this.size), () => null));
        continue;
      }
      for (let y = 0; y < this.size + direction.y; y++) {
        if (row[y] && row[y + 1] && row[y].value === row[y + 1].value) {
          const newValue = row[y].value * 2;
          row[y].value = newValue;
          row[y + 1] = null;
          console.log(row);
        }
      }
      row = row.filter((el) => el !== null);
      for (let y = 0; y < this.size; y++) {
        if (!row[y]) row[y] = null;
      }
      // console.log(row);
      cells.push(row);
    }
    this.grid.matrix = cells;
    this.addTile();
    this.draw.drawField(this.grid.matrix);

    // console.log(cells);
    // console.log(this.grid.matrix);
  }

  listener() {
    document.body.addEventListener("keydown", (e) => {
      e.preventDefault();
      console.log(e.key);
      if (e.key === "ArrowLeft") {
        this.move({ x: 0, y: -1 });
      }
    });
  }
}
