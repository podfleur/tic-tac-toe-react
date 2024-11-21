import { useState } from 'react';
import Board from './board.js';
import { calculateWinner } from './board.js';
import { Move } from './move.js';
import { ToggleSortOrder } from './toggleSortOrder.js';


export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), location: 0 }]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;

  const winnerInfo = calculateWinner(currentSquares);
  const winningSquares = winnerInfo ? winnerInfo.line : null;

  const indexes = history.map(({location}, historyIndex) => (
    <Move key={`move-${historyIndex}`} jumpTo={jumpTo} location={location} historyIndex={historyIndex} currentMove={currentMove} />
  ))

  function handlePlay(nextSquares, location) {
    const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, location }];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
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
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} winningSquares={winningSquares} winnerInfo={winnerInfo} />
      </div>
      <div className="game-info">
        <ToggleSortOrder isAscending={isAscending} sortOrder={sortOrder} />
        <ol> 
          {isAscending ? indexes : indexes.reverse()}
        </ol>
      </div>
    </div>
  );
}

