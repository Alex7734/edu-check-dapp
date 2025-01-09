import Room from "./Room.js";

class Maze {
  private rooms: Map<number, Room>;

  constructor() {
    this.rooms = new Map();
  }

  addRoom(room: Room): void {
    this.rooms.set(room["roomNo"], room);
  }

  getRoom(roomNo: number): Room | undefined {
    return this.rooms.get(roomNo);
  }
}

export default Maze;