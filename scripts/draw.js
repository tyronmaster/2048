import { MAX, SIZE } from "./env.js";

export class Draw {
  constructor() {
    this.container = document.createElement("div");
    this.container.classList.add("container");
    this.container.style.display = "flex";
    this.container.style.flexWrap = "wrap";
    this.container.style.maxWidth = SIZE * 50 + "px";
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
    if (tile && tile.value === MAX) {
      this.victory();
      return;
    }
    const tileElement = document.createElement("div");
    tileElement.style.width = "50px";
    tileElement.style.height = "50px";
    tileElement.style.background = "grey";
    tileElement.style.border = "solid 1px black";
    tileElement.style.padding = " 5px";
    if (tile) {
      switch (tile.value) {
        case 2: {
          tileElement.style.background = "yellow";
          break;
        }
        case 4: {
          tileElement.style.background = "orange";
          break;
        }
        case 8: {
          tileElement.style.background = "green";
          break;
        }
        case 16: {
          tileElement.style.background = "blue";
          break;
        }
        case 32: {
          tileElement.style.background = "red";
          break;
        }
        case 64: {
          tileElement.style.background = "pink";
          break;
        }
        default: {
          tileElement.style.background = "grey";
          break;
        }
      }

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

  victory() {
    window.alert("Win!");
  }

  gameOver() {
    window.alert("Game over!");
  }
}
