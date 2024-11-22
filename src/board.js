import Square from './square';
import { useStatus } from './useStatus';


export default function Board({currentMove, squares, onPlay, line, winner}) {

    const size = Math.sqrt(squares.length);
    const xIsNext = currentMove % 2 === 0;
    const status = useStatus(squares, winner, xIsNext);

    function handleClick(i) {
      if (winner || squares[i]) {
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
                  isWinningSquare={line && line.includes(index)}
                />
              );
            })}
          </div>
        ))}
      </>
    );
  }