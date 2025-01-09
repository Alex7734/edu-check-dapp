import Maze from './Maze.js';
import Door from './Door.js';
import Room from './Room.js';
import Wall from './Wall.js';

class MazeFactory {
  createMaze(): Maze {
    const maze = new Maze();
    const room1 = new Room(1);
    const room2 = new Room(2);
    const door = new Door(room1, room2);

    room1.setSide("north", new Wall());
    room1.setSide("east", door);
    room1.setSide("south", new Wall());
    room1.setSide("west", new Wall());

    room2.setSide("north", new Wall());
    room2.setSide("east", new Wall());
    room2.setSide("south", new Wall());
    room2.setSide("west", door);

    maze.addRoom(room1);
    maze.addRoom(room2);

    return maze;
  }
}

export default MazeFactory;