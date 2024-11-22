import { useEffect, useState } from 'react';
import Board from './board.js';
import { Move } from './move.js';
import { ToggleSortOrder } from './toggleSortOrder.js';

export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), location: 0 }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const currentSquares = history[currentMove].squares;

  const [winner, setWinner] = useState(null);
  const [line, setLine] = useState([]);

  useEffect(() => {
    const calcul = calculateWinner(currentSquares);
    setWinner(calcul.winner);
    setLine(calcul.line);
  }, [currentSquares]);

  const indexes = history.map(({location}, historyIndex) => (
    <Move key={`move-${historyIndex}`} jumpTo={jumpTo} location={location} historyIndex={historyIndex} currentMove={currentMove} />
  ));

  function handlePlay(squares, location) {
    const newHistory = history.slice(0, currentMove + 1);
    setHistory([...newHistory, { squares, location }]);
    setCurrentMove(newHistory.length);
  }
  
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function sortOrder() {
    setIsAscending(!isAscending);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board currentMove={currentMove} squares={currentSquares} onPlay={handlePlay} line={line} winner={winner} />
      </div>
      <div className="game-info">
        <ToggleSortOrder isAscending={isAscending} sortOrder={sortOrder} />
        <p> Tour actuel : {currentMove}</p>
        <ol> 
          {isAscending ? indexes : indexes.reverse()}
        </ol>
      </div>
    </div>
  );
}

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
  return { winner: null, line: [] };
}
