const gameboard = () => { 

  const board = {
    1: [null, null, null, null, null, null, null, null, null, null],
    2: [null, null, null, null, null, null, null, null, null, null],
    3: [null, null, null, null, null, null, null, null, null, null],
    4: [null, null, null, null, null, null, null, null, null, null],
    5: [null, null, null, null, null, null, null, null, null, null],
    6: [null, null, null, null, null, null, null, null, null, null],
    7: [null, null, null, null, null, null, null, null, null, null],
    8: [null, null, null, null, null, null, null, null, null, null],
    9: [null, null, null, null, null, null, null, null, null, null],
    10: [null, null, null, null, null, null, null, null, null, null]
  };

  const ships = [];

  const placeShip = (ship, start, finish) => {
    const startX = start[0];
    const startY = start[1];
    const endX = finish[0];
    const endY = finish[1];

    if (startX === endX) { // if vertical
      let shipLocation = 0;
      for (let y = startY; y <= endY; y++) {
        board[y][startX] = [ship, shipLocation];
        shipLocation++;
      };
      ships.push(ship);
    } else { // if horizontal
      let shipLocation = 0;
      for (let x = startX; x <= endX; x++) {
        board[startY][x] = [ship, shipLocation];
        shipLocation++;
      };
      ships.push(ship);
    };
    return board;
  };

  const randomlyPlaceShips = (shipArr, board) => {
    shipArr.forEach(x => {
      const orientation = Math.floor(Math.random() * 2);
      let xCoord;
      let yCoord;

      const checkBoard = () => {
        if (orientation === 0) {
          xCoord = Math.floor(Math.random() * 6);
          yCoord = Math.floor(Math.random() * 10) + 1;
          for (let i = 0; i < x.length; i++) {
            if (board.board[yCoord][xCoord + i]) {
              checkBoard();
            };
          };
        } else {
          xCoord = Math.floor(Math.random() * 9);
          yCoord = Math.floor(Math.random() * 6) + 1;
          for (let i = 0; i < x.length; i++) {
            if (board.board[yCoord + i][xCoord]) {
              checkBoard();
            };
          };
        };
        return [xCoord, yCoord];        
      };
      const start = checkBoard();
      if (orientation === 0) {
        board.placeShip(x, start, [start[0] + x.length - 1, start[1]]);  
      } else {
        board.placeShip(x, start, [start[0], start[1]+ x.length - 1]);  
      };  
    });
  };

  const receiveAttack = (x, y) => {
    if (board[y][x]) {
      let ship = board[y][x][0];
      let shipLocation = board[y][x][1];
      if (board[y][x] === 'miss' || ship.hitStatus[shipLocation] === true) {
        return 'already guessed'
      };
      ship.hit(shipLocation);
      return 'hit';
    } else {
      board[y][x] = 'miss';
      return 'miss';
    };
  };

  const allShipsSunk = () => {
    return ships.map(x => x.isSunk()).every(x => x === true)
  };

  return {
    board,
    placeShip,
    receiveAttack,
    allShipsSunk,
    randomlyPlaceShips
  };
};

export default gameboard;