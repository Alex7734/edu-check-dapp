import MapSite from './MapSite.js';
import Room from './Room.js';

class Door extends MapSite {
  private isOpen: boolean;
  private readonly room1: Room;
  private readonly room2: Room;

  constructor(room1: Room, room2: Room) {
    super();
    this.room1 = room1;
    this.room2 = room2;
    this.isOpen = false;
  }

  enter(): void {
    if (this.isOpen) {
      console.log("You pass through the door.");
    } else {
      console.log("The door is closed.");
    }
  }

  open(): void {
    this.isOpen = true;
    console.log("The door is now open.");
  }

  close(): void {
    this.isOpen = false;
    console.log("The door is now closed.");
  }

  getRoom1(): Room {
    return this.room1;
  }

  getRoom2(): Room {
    return this.room2;
  }
}

export default Door;