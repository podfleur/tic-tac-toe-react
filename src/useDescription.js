export const useDescription = (location, move, currentMove) => {
    const col = location % 3 + 1;
    const row = Math.floor(location / 3) + 1;

    switch (move) {
        case currentMove:
            return ('Tour actuel : ' + move);
        case 0:
            return ('Revenir au début');
        default:
            return (`Aller au coup n°${move} (colonne : ${col}, ligne : ${row})`);
    }
}
