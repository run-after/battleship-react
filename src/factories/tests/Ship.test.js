import shipFactory from '../Ship';

let carrier;
let battleship;
let cruiser;
let destroyer;

beforeEach(() => {
  carrier = shipFactory(5);
  battleship = shipFactory(4);
  cruiser = shipFactory(3);
  destroyer = shipFactory(2);
});

test('creates a ship with length attribute', () => {
  expect(carrier.length).toBe(5);
  expect(battleship.length).toBe(4);
  expect(cruiser.length).toBe(3);
  expect(destroyer.length).toBe(2);
});

test('creates a ship with hitStatus', () => {
  expect(carrier.hitStatus).toEqual([false, false, false, false, false]);
  expect(battleship.hitStatus).toEqual([false, false, false, false]);
  expect(cruiser.hitStatus).toEqual([false, false, false]);
  expect(destroyer.hitStatus).toEqual([false, false]);
});

test('hit(x) will change hitStatus where hit', () => {
  carrier.hit(0);
  carrier.hit(1);
  expect(carrier.hitStatus).toEqual([true, true, false, false, false]);
  
  destroyer.hit(1);
  expect(destroyer.hitStatus).toEqual([false, true])
});

test('isSunk() will return true if hit in all positions is true', () => {
  expect(destroyer.isSunk()).toBeFalsy();
  destroyer.hit(0);
  expect(destroyer.isSunk()).toBeFalsy();
  destroyer.hit(1);
  expect(destroyer.isSunk()).toBeTruthy();

  expect(cruiser.isSunk()).toBeFalsy();
  cruiser.hit(0);
  expect(cruiser.isSunk()).toBeFalsy();
  cruiser.hit(2);
  expect(cruiser.isSunk()).toBeFalsy();
  cruiser.hit(1);
  expect(cruiser.isSunk()).toBeTruthy();
})