import gameboard from '../Gameboard';
import shipFactory from '../Ship';

let newBoard;

beforeEach(() => {
   newBoard = gameboard();
});

test('creates a blank board', () => {
  
  expect(newBoard.board).toEqual({
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
  });

});

test('places ship on board vertically', () => {
  const cruiser = shipFactory(3);
  newBoard.placeShip(cruiser, [0, 1], [0, 3])
  
  expect(newBoard.board).toEqual({
    1: [ [cruiser, 0], null, null, null, null, null, null, null, null, null],
    2: [ [cruiser, 1], null, null, null, null, null, null, null, null, null],
    3: [ [cruiser, 2], null, null, null, null, null, null, null, null, null],
    4: [null, null, null, null, null, null, null, null, null, null],
    5: [null, null, null, null, null, null, null, null, null, null],
    6: [null, null, null, null, null, null, null, null, null, null],
    7: [null, null, null, null, null, null, null, null, null, null],
    8: [null, null, null, null, null, null, null, null, null, null],
    9: [null, null, null, null, null, null, null, null, null, null],
    10: [null, null, null, null, null, null, null, null, null, null]
  });

  const carrier = shipFactory(5);
  newBoard.placeShip(carrier, [4, 4], [4, 8]);
  
  expect(newBoard.board).toEqual({
    1: [ [cruiser, 0], null, null, null, null, null, null, null, null, null],
    2: [ [cruiser, 1], null, null, null, null, null, null, null, null, null],
    3: [ [cruiser, 2], null, null, null, null, null, null, null, null, null],
    4: [null, null, null, null, [carrier, 0], null, null, null, null, null],
    5: [null, null, null, null, [carrier, 1], null, null, null, null, null],
    6: [null, null, null, null, [carrier, 2], null, null, null, null, null],
    7: [null, null, null, null, [carrier, 3], null, null, null, null, null],
    8: [null, null, null, null, [carrier, 4], null, null, null, null, null],
    9: [null, null, null, null, null, null, null, null, null, null],
    10: [null, null, null, null, null, null, null, null, null, null]
  });

});

test('places ship on board horizontally', () => {

  const carrier = shipFactory(5);
  newBoard.placeShip(carrier, [1, 1], [5, 1]);

  expect(newBoard.board).toEqual({
    1: [null, [carrier, 0], [carrier, 1], [carrier, 2], [carrier, 3], [carrier, 4], null, null, null, null],
    2: [null, null, null, null, null, null, null, null, null, null],
    3: [null, null, null, null, null, null, null, null, null, null],
    4: [null, null, null, null, null, null, null, null, null, null],
    5: [null, null, null, null, null, null, null, null, null, null],
    6: [null, null, null, null, null, null, null, null, null, null],
    7: [null, null, null, null, null, null, null, null, null, null],
    8: [null, null, null, null, null, null, null, null, null, null],
    9: [null, null, null, null, null, null, null, null, null, null],
    10: [null, null, null, null, null, null, null, null, null, null]
  });

  const destroyer = shipFactory(2);
  newBoard.placeShip(destroyer, [2, 6], [3, 6]);

  expect(newBoard.board).toEqual({
    1: [null, [carrier, 0], [carrier, 1], [carrier, 2], [carrier, 3], [carrier, 4], null, null, null, null],
    2: [null, null, null, null, null, null, null, null, null, null],
    3: [null, null, null, null, null, null, null, null, null, null],
    4: [null, null, null, null, null, null, null, null, null, null],
    5: [null, null, null, null, null, null, null, null, null, null],
    6: [null, null, [destroyer, 0], [destroyer, 1], null, null, null, null, null, null],
    7: [null, null, null, null, null, null, null, null, null, null],
    8: [null, null, null, null, null, null, null, null, null, null],
    9: [null, null, null, null, null, null, null, null, null, null],
    10: [null, null, null, null, null, null, null, null, null, null]
  });
});

test('receiveAttack() will mark that section of ship hit', () => {
  const carrier = shipFactory(5);
  
  newBoard.placeShip(carrier, [1, 1], [5, 1]);

  expect(newBoard.receiveAttack(3, 1)).toEqual('hit');
  expect(newBoard.receiveAttack(3, 1)).toEqual('already guessed');
  let ship = newBoard.board[1][3][0];
  let shipSpot = newBoard.board[1][3][1];
  expect(ship.hitStatus[shipSpot]).toBeTruthy();
});

test('receiveAttack() will mark location on board as missed if attack misses', () => {
  const carrier = shipFactory(5);
  newBoard.placeShip(carrier, [1, 1], [5, 1]);

  expect(newBoard.receiveAttack(0, 1)).toEqual('miss');
  expect(newBoard.board[1][0]).toEqual('miss');
});

test('receiveAttack() will return "already guessed" if location already guessed', () => {
  const carrier = shipFactory(5);
  newBoard.placeShip(carrier, [1, 1], [5, 1]);

  expect(newBoard.receiveAttack(0, 1)).toEqual('miss');
  expect(newBoard.receiveAttack(0, 1)).toEqual('already guessed');

  expect(newBoard.receiveAttack(1, 1)).toEqual('hit');
  expect(newBoard.receiveAttack(1, 1)).toEqual('already guessed');
  
})

test('allShipsSunk() returns false if all ships are not sunk', () => {
  const carrier = shipFactory(5);
  newBoard.placeShip(carrier, [1, 1], [5, 1]);

  const destroyer = shipFactory(2);
  newBoard.placeShip(destroyer, [2, 6], [3, 6]);

  newBoard.receiveAttack(1, 1);
  newBoard.receiveAttack(2, 1);
  newBoard.receiveAttack(3, 1);
  newBoard.receiveAttack(4, 1);
  newBoard.receiveAttack(5, 1);

  expect(newBoard.allShipsSunk()).toBeFalsy();
});

test('allShipsSunk() returns true if all ships are sunk', () => {
  const carrier = shipFactory(5);
  newBoard.placeShip(carrier, [1, 1], [5, 1]);

  newBoard.receiveAttack(1, 1);
  newBoard.receiveAttack(2, 1);
  newBoard.receiveAttack(3, 1);
  newBoard.receiveAttack(4, 1);
  newBoard.receiveAttack(5, 1);

  const destroyer = shipFactory(2);
  newBoard.placeShip(destroyer, [2, 6], [3, 6]);

  newBoard.receiveAttack(2, 6);
  newBoard.receiveAttack(3, 6);


  expect(newBoard.allShipsSunk()).toBeTruthy();
})