import playerFactory from '../Player';

test('computerPlay() to return 2 coordanates on the board', () => {
  const bill = playerFactory();
  const move = bill.computerPlay();
  expect(Number(move[0])).toBeLessThan(10);
  expect(Number(move[0])).toBeGreaterThan(-1)
  expect(Number(move[1])).toBeLessThan(11);
  expect(Number(move[1])).toBeGreaterThan(0);
});

test('computerPlay() adds move to list of played moves', () => {
  const bill = playerFactory();
  let tempMove = bill.computerPlay();
  const move = `${tempMove[0]},${tempMove[1]}`
  

  expect(bill.playedMoves.includes(move)).toBeTruthy();

  tempMove = bill.computerPlay();
  const move2 = `${tempMove[0]},${tempMove[1]}`
  expect(bill.playedMoves.includes(move2)).toBeTruthy();

  tempMove = bill.computerPlay();
  const move3 = `${tempMove[0]},${tempMove[1]}`
  expect(bill.playedMoves.includes(move3)).toBeTruthy();
});