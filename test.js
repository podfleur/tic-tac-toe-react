function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function toggleSortOrder() {
    setIsAscending(!isAscending);
  }

  const moves = history.map((squares, move) => {
    let description;
    const location = squares.location;
    const col = location % 3 + 1;
    const row = Math.floor(location / 3) + 1;

    if (move > 0) {
      description = `Aller au coup n°${move} (colonne : ${col}, ligne : ${row})`;
    } else {
      description = 'Revenir au début';
    }

    if (move === currentMove) {
      description = 'Tour actuel : ' + move;
      return (
        <p key={move}>{description}</p>
      );
    } else {
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      );
    }
  });

  if (!isAscending) {
    moves.reverse();
  }