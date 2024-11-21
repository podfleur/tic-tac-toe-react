export const useStatus = (squares, winner, xIsNext) => {
  switch (true) {
    case squares.every(Boolean) && !winner:
      return 'Match nul';
    case winner:
      return winner + ' a gagné';
    default:
      return 'Prochain tour : ' + (xIsNext ? 'X' : 'O');
  }
}