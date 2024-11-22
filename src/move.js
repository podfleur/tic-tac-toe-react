import { useDescription } from "./useDescription";

export const Move = ({ location, historyIndex, jumpTo, currentMove}) => {
    const description = useDescription(location, historyIndex, currentMove);
    return (
        <li key={`move-${historyIndex}`}>
          {historyIndex === currentMove ? ( <p>{description}</p>) : (<button onClick={() => jumpTo(historyIndex)}>{description}</button>)}
        </li>
      );
}