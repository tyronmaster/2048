import { Draw } from "./draw.js";
import { SIZE } from "./env.js";
import { GameBuilder } from "./gamebuilder.js";

requestAnimationFrame(() => {
  new GameBuilder(SIZE);
});
