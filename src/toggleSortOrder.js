export const ToggleSortOrder = ({isAscending, sortOrder}) => {
    return (
    <button onClick={() => sortOrder()}>
      {isAscending ? 'Trier par ordre décroissant'  : 'Trier par ordre croissant'}
    </button>)
}