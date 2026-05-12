import board from "../data/board.json";
import "../styles/board.css";
import { PORTAGES } from "../data/portages";

export default function Board({ gameState, setGameState }) {

  const isConnected = (team, target) => {
    const owned = Object.keys(gameState.portages).filter(
      (p) => gameState.portages[p].owner === team
    );

    if (owned.length === 0) return true;

    return owned.some((p) =>
      board.portages[p]?.connections?.includes(target)
    );
  };

  const handleClick = (id) => {
    setGameState((prev) => {

      const newState = {
        ...prev,
        portages: { ...prev.portages },
        teams: { ...prev.teams }
      };

      let actionSucceeded = false;

      const currentTeam = prev.currentTeam;
      const action = prev.action;

      const portage = newState.portages[id];
      const owner = portage?.owner;

      // DISCOVER
      if (action === "discover") {
        if (owner) return prev;
        if (!isConnected(currentTeam, id)) return prev;

        newState.portages[id] = {
          ...portage,
          owner: currentTeam,
          locked: false,
          status: "normal"
        };

        actionSucceeded = true;
      }

      // STEAL
      if (action === "steal") {
        if (!owner || owner === currentTeam) return prev;
        if (portage?.locked) return prev;

        const opponentCount = Object.values(prev.portages).filter(
          (p) => p.owner === owner
        ).length;

        if (opponentCount <= 3) return prev;
        if (!isConnected(currentTeam, id)) return prev;

        newState.portages[id] = {
          ...portage,
          owner: currentTeam,
          locked: false,
          status: "normal"
        };

        actionSucceeded = true;
      }

      // SAVE
      if (action === "save") {
        const team = newState.teams[currentTeam];

        if (team.savedThisRound) return prev;
        if (!portage || portage.owner !== currentTeam) return prev;

        newState.teams[currentTeam] = {
          ...team,
          savedThisRound: true
        };

        newState.portages[id] = {
          ...portage,
          status: "saved",
          locked: true
        };

        actionSucceeded = true;
      }

      if (actionSucceeded) {
        newState.movesLeft -= 1;

        if (newState.movesLeft <= 0) {
          const nextIndex =
            (newState.turnIndex + 1) % newState.turnOrder.length;

          newState.turnIndex = nextIndex;
          newState.currentTeam = newState.turnOrder[nextIndex];
          newState.movesLeft = newState.movesPerTurn;
        }
      }

      return newState;
    });
  };

  return (
    <div className="board-container">
      <img src="/map.png" className="board-map" />

      {PORTAGES.map((p) => {
        const pState = gameState.portages[p.id];

        return (
          <div
            key={p.id}
            className={`portage ${pState?.status === "saved" ? "saved" : ""}`}
            style={{
              left: p.x,
              top: p.y,
              backgroundColor:
                pState?.owner === "red"
                  ? "red"
                  : pState?.owner === "blue"
                  ? "lightblue"
                  : pState?.owner === "green"
                  ? "darkgreen"
                  : pState?.owner === "yellow"
                  ? "goldenrod"
                  : "gray"
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleClick(p.id);
            }}
          />
        );
      })}
    </div>
  );
}