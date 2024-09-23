import {
  CANVAS_BCKGRND,
  CANVAS_DARK,
  MAX_VALUE,
  SIZE,
  TILE_SIZE,
  TILE_STROKE_COLOR,
  TILE_STROKE_COLOR_LIGHT,
  TILE_STROKE_WIDTH,
  TILES_COLOR,
} from "./env.js";

export class Draw {
  constructor() {
    document.body.innerHTML = "";
    this.container = document.createElement("div");
    this.container.classList.add("container");

    this.scoreCanvas = document.createElement("canvas");
    this.scoreCtx = this.scoreCanvas.getContext("2d");
    this.scoreCtx.canvas.width = SIZE * TILE_SIZE;
    this.scoreCtx.canvas.height = TILE_SIZE;
    this.container.appendChild(this.scoreCanvas);

    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.ctx.canvas.width = SIZE * TILE_SIZE;
    this.ctx.canvas.height = SIZE * TILE_SIZE;
    this.container.appendChild(this.canvas);

    this.body = document.body;
    this.body.append(this.container);
  }

  drawInit(grid) {
    requestAnimationFrame(() => {
      this.clearField();
      for (let x = 0; x < SIZE; x++) {
        for (let y = 0; y < SIZE; y++) {
          this.drawTile(grid[x][y]);
        }
      }
    });
  }

  drawTile(tile) {
    if (tile) {
      this.ctx.fillStyle = tile.value
        ? TILES_COLOR[tile.value]
        : TILES_COLOR["default"];

      this.ctx.fillRect(
        tile.y * TILE_SIZE,
        tile.x * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE
      );

      this.ctx.strokeStyle = TILE_STROKE_COLOR;
      this.ctx.lineWidth = TILE_STROKE_WIDTH;
      this.ctx.strokeRect(
        tile.y * TILE_SIZE,
        tile.x * TILE_SIZE,
        TILE_SIZE,
        TILE_SIZE
      );

      this.ctx.font = TILE_SIZE / 3 + "px Arial";
      this.ctx.fillStyle = "black";
      this.ctx.textBaseline = "middle";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        tile.value,
        tile.y * TILE_SIZE + TILE_SIZE / 2,
        tile.x * TILE_SIZE + TILE_SIZE / 2
      );
    }
  }

  clearField() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = CANVAS_BCKGRND;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    for (let x = 0; x < SIZE; x++) {
      for (let y = 0; y < SIZE; y++) {
        this.ctx.strokeStyle = TILE_STROKE_COLOR_LIGHT;
        this.ctx.lineWidth = TILE_STROKE_WIDTH;
        this.ctx.strokeRect(y * TILE_SIZE, x * TILE_SIZE, TILE_SIZE, TILE_SIZE);
      }
    }
  }

  clearScore() {
    this.scoreCtx.clearRect(
      0,
      0,
      this.scoreCanvas.width,
      this.scoreCanvas.height
    );
    this.scoreCtx.fillStyle = CANVAS_DARK;
    this.scoreCtx.fillRect(
      0,
      0,
      this.scoreCtx.canvas.width,
      this.scoreCtx.canvas.height
    );
  }

  drawScore(score) {
    this.clearScore();
    this.scoreCtx.font = TILE_SIZE / 3 + "px Arial";
    const color = Math.pow(2, Math.floor(score / MAX_VALUE));
    this.scoreCtx.fillStyle =
      color < 2
        ? TILES_COLOR[2]
        : color <= MAX_VALUE
        ? TILES_COLOR[color]
        : "black";
    this.scoreCtx.textBaseline = "middle";
    this.scoreCtx.textAlign = "center";
    this.scoreCtx.fillText(
      "Score: " + score,
      this.scoreCanvas.width / 2,
      this.scoreCanvas.height / 2
    );
  }

  drawField(grid) {
    this.clearField();
    this.drawInit(grid);
  }

  victory() {
    window.alert("Win!");
  }

  gameOver() {
    window.alert("Game over!");
  }
}
