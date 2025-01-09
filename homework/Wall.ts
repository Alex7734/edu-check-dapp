import MapSite from "./MapSite.js";

class Wall extends MapSite {
  enter(): void {
    console.log("You hit a wall!");
  }
}

export default Wall;