const playerFactory = (name) => {
  const moves = [];

  const computerPlay = () => {
    const xCoord = Math.floor(Math.random() * 9);
    const yCoord = Math.floor(Math.random() * 10) + 1;
    let move = [xCoord, yCoord];
    // don't allow same move twice;
    if (moves.includes(`${xCoord},${yCoord}`)) {
      move = computerPlay();
    };
    moves.push(`${move[0]},${move[1]}`);
    return move;
  };

  return {
    name: name,
    playedMoves: moves,
    computerPlay: computerPlay
  };

};

export default playerFactory;