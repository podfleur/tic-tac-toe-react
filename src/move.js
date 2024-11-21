import { useDescription } from "./useDescription";

export const Move = ({ location, historyIndex, jumpTo, currentMove}) => {
    const description = useDescription(location, historyIndex, currentMove);
    return (
        <li key={historyIndex}>
          {historyIndex === currentMove ? ( <p>{description}</p>) : (<button onClick={() => jumpTo(location)}>{description}</button>)}
        </li>
      );
}