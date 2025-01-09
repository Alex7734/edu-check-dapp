import MapSite from './MapSite.js';

class Room extends MapSite {
  private readonly roomNo: number;
  private sides: Map<string, MapSite>;

  constructor(roomNo: number) {
    super();
    this.roomNo = roomNo;
    this.sides = new Map();
  }

  setSide(direction: string, site: MapSite): void {
    this.sides.set(direction, site);
  }

  getSide(direction: string): MapSite | undefined {
    return this.sides.get(direction);
  }

  enter(): void {
    console.log(`You are in room number ${this.roomNo}.`);
  }

  getRoomNo(): number {
    return this.roomNo;
  }
}

export default Room;