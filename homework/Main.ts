import Direction from './DirectionEnum.js';
import MazeFactory from './MazeFactory.js';
import Door from './Door.js';
import Room from './Room.js';
import Wall from './Wall.js';
import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});

function main(): void {
  console.log("Welcome to the Maze Game!");
  console.log("1. Test the maze");
  console.log("2. Play the maze");
  console.log("Enter your choice (1 or 2):");

  rl.question("Your choice: ", (choice) => {
    if (choice === "1") {
      console.log("\nStarting test mode...");
      const N = 4;
      createMazeWithRooms(N, true);
    } else if (choice === "2") {
      console.log("\nStarting play mode...");
      const N = 4;
      createMazeWithRooms(N, false);
    } else {
      console.log("Invalid choice. Exiting.");
    }
  });
}

function createMazeWithRooms(n: number, testMode: boolean): void {
  const mazeFactory = new MazeFactory();
  const maze = mazeFactory.createMaze();

  const rooms: Room[] = [];
  for (let i = 1; i <= n; i++) {
    const room = new Room(i);
    maze.addRoom(room);
    rooms.push(room);
  }

  for (let i = 0; i < rooms.length; i++) {
    const currentRoom = rooms[i];

    currentRoom.setSide(Direction.North, new Wall());
    currentRoom.setSide(Direction.South, new Wall());
    currentRoom.setSide(
      Direction.West,
      i === 0 ? new Wall() : new Door(rooms[i - 1], currentRoom)
    );
    currentRoom.setSide(
      Direction.East,
      i === rooms.length - 1 ? new Wall() : new Door(currentRoom, rooms[i + 1])
    );
  }

  if (testMode) {
    console.log("\nTesting the maze:");
    testMaze(rooms);
  } else {
    console.log("\nPlaying the maze:");
    playMaze(rooms);
  }
}

function testMaze(rooms: Room[]): void {
  for (let i = 0; i < rooms.length; i++) {
    const room = rooms[i];
    console.log(`\nEntering Room ${room.getRoomNo()}:`);
    room.enter();

    console.log("Trying to go east:");
    const eastSide = room.getSide(Direction.East);
    if (eastSide) {
      eastSide.enter();
      if (eastSide instanceof Door) {
        eastSide.open();
        eastSide.enter();
      }
    }

    console.log("Trying to go west:");
    const westSide = room.getSide(Direction.West);
    if (westSide) {
      westSide.enter();
      if (westSide instanceof Door) {
        westSide.close();
        westSide.enter();
      }
    }
  }
  rl.close();
}

function playMaze(rooms: Room[]): void {
  let currentRoom = rooms[0];

  const askQuestion = (query: string): Promise<string> => {
    console.log("Waiting for user input...");
    return new Promise((resolve) => {
      rl.question(query, (answer) => {
        console.log("Received input:", answer);
        resolve(answer);
      });
    });
  };

  const play = async () => {
    while (true) {
      console.log(`\nYou are in Room ${currentRoom.getRoomNo()}.`);
      console.log("Available directions: North, South, East, West.");

      const input = (await askQuestion("Which direction do you want to go? ")).trim().toLowerCase();

      let directionEnum: Direction | null = null;
      if (input === "north") directionEnum = Direction.North;
      else if (input === "south") directionEnum = Direction.South;
      else if (input === "east") directionEnum = Direction.East;
      else if (input === "west") directionEnum = Direction.West;

      if (directionEnum !== null) {
        const side = currentRoom.getSide(directionEnum);

        if (side) {
          side.enter();

          if (side instanceof Door) {
            currentRoom = side.getRoom1() === currentRoom ? side.getRoom2() : side.getRoom1();
          }
        } else {
          console.log("You can't go that way!");
        }
      } else {
        console.log("Invalid input. Please enter North, South, East, or West.");
      }
    }
  };

  play().catch((err) => {
    console.error("An error occurred:", err);
  }).finally(() => {
    rl.close();
  });
}

main();
