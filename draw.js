import { SIZE } from "./env.js";

export class Draw {
  constructor() {
    this.container = document.createElement("div");
    this.container.style.display = "flex";
    this.container.style.flexWrap = "wrap";
    this.container.style.maxWidth = "220px";
    this.body = document.body;
  }

  drawInit(grid) {
    this.clearField();

    for (let x = 0; x < SIZE; x++) {
      for (let y = 0; y < SIZE; y++) {
        this.container.appendChild(this.drawTile(grid[x][y]));
      }
    }
    this.body.append(this.container);
  }

  drawTile(tile) {
    const tileElement = document.createElement("div");
    tileElement.style.width = "50px";
    tileElement.style.height = "50px";
    tileElement.style.background = "grey";
    tileElement.style.border = "solid 1px black";
    tileElement.style.padding = " 5px";
    if (tile) {
      tileElement.style.background = "yellow";
      tileElement.innerText = tile.value;
      tileElement.style.textAlign = "center";
      tileElement.style.verticalAlign = "middle";
    }
    return tileElement;
  }

  clearField() {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild);
    }
  }

  drawField(grid) {
    this.clearField();
    this.drawInit(grid);
  }
}
