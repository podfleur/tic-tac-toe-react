import Square from './square';
import { useStatus } from './useStatus';

export function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}   

export default function Board({ xIsNext, squares, onPlay, winningSquares, winnerInfo}) {

    const size = Math.sqrt(squares.length);
    const winner = winnerInfo ? winnerInfo.winner : null;
    const status = useStatus(squares, winner, xIsNext);

    function handleClick(i) {
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      const nextSquares = squares.slice();
      if (xIsNext) {
        nextSquares[i] = 'X';
      } else {
        nextSquares[i] = 'O';
      }
      onPlay(nextSquares, i);
    } 
  
    return (
      <>
        <div className="status">{status}</div>
        {Array.from({ length: size }).map((_, row) => (
          <div key={row} className="board-row">
            {Array.from({ length: size }).map((_, col) => {
              const index = row * size + col;
              return (
                <Square
                  key={index}
                  value={squares[index]}
                  onSquareClick={() => handleClick(index)}
                  isWinningSquare={winningSquares && winningSquares.includes(index)}
                  
                />
              );
            })}
          </div>
        ))}
      </>
    );
  }