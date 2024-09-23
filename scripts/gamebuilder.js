import { Draw } from "./draw.js";
import { SIZE } from "./env.js";
import { Grid } from "./grid.js";
import { EventsInterceptor } from "./interceptor.js";
import { Tile } from "./tile.js";

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
      this.draw.gameOver();
    }
  }

  move(direction) {
    //direction to left x: 1, y: 0; to right x: -1, y: 0; to up y: 1, x: 0; to down y: -1, x: 0;
    let cells = [];
    if (direction.y === 0) {
      cells = this.summatorRow(this.grid.matrix, direction);
    }

    if (direction.x === 0) {
      cells = this.grid.matrix;
      cells = cells.map((el, x) => el.map((_el, y) => cells[y][x]));
      cells = this.summatorRow(cells, direction);
      cells = cells.map((el, y) => el.map((_el, x) => cells[x][y]));
    }

    this.grid.matrix = cells;
    this.addTile();
    this.grid.actuate();
    this.draw.drawField(this.grid.matrix);
  }

  listener() {
    document.body.addEventListener("keydown", (e) => {
      e.preventDefault();
      if (e.key === "ArrowLeft") {
        this.move({ x: 1, y: 0 });
      }
      if (e.key === "ArrowRight") {
        this.move({ x: -1, y: 0 });
      }
      if (e.key === "ArrowUp") {
        this.move({ x: 0, y: 1 });
      }
      if (e.key === "ArrowDown") {
        this.move({ x: 0, y: -1 });
      }
    });

    let touchStartX, touchstartY;
    const container = document.querySelector(".container");
    document.body.addEventListener("touchstart", (e) => {
      if (e.touches.length > 1) return;
      ({ pointX: touchStartX, pointY: touchstartY } = EventsInterceptor.pointXY(
        container,
        e
      ));
    });

    document.body.addEventListener("touchend", (e) => {
      let { pointX: touchEndX, pointY: touchEndY } = EventsInterceptor.pointXY(
        container,
        e
      );
      let directionX = touchEndX - touchStartX;
      let directionY = touchEndY - touchstartY;
      let absX = Math.abs(directionX);
      let absY = Math.abs(directionY);
      if (Math.max(absX, absY) > 5) {
        this.move(
          absX > absY
            ? directionX > 0
              ? { x: 1, y: 0 }
              : { x: -1, y: 0 }
            : directionY > 0
            ? { x: 0, y: 1 }
            : { x: 0, y: -1 }
        );
      }
      // console.log({ directionX, directionY });
    });
  }

  summatorRow(matrix, direction) {
    let cells = [];
    for (let x = 0; x < SIZE; x++) {
      let row = matrix[x].filter((el) => el !== null);
      if (!row.length) {
        cells.push(Array.from(new Array(SIZE), () => null));
        continue;
      }
      if (direction.x < 0 || direction.y < 0) row = row.reverse();
      for (let y = 0; y < SIZE - 1; y++) {
        if (row[y] && row[y + 1] && row[y].value === row[y + 1].value) {
          const newValue = row[y].value * 2;
          row[y].value = newValue;
          row[y + 1] = null;
        }
      }
      row = row.filter((el) => el !== null);
      for (let y = 0; y < SIZE; y++) {
        if (!row[y]) row[y] = null;
      }
      if (direction.x < 0 || direction.y < 0) row = row.reverse();
      cells.push(row);
    }
    return cells;
  }
}
