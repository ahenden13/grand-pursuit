import { useState } from "react";
import Board from "./components/Board";
import board from "./data/board.json";
import "./App.css";
import { useEffect } from "react";
import { getGameState, updateGameState } from "./api/gameApi";

const API_URL = "https://9wg6k0fgrj.execute-api.us-west-1.amazonaws.com/Prod";

const initialState = {
  teams: {
    red: { pelts: 1000, savedThisRound: false },
    blue: { pelts: 1000, savedThisRound: false },
    green: { pelts: 1000, savedThisRound: false },
    yellow: { pelts: 1000, savedThisRound: false },
  },

  turnOrder: ["red", "yellow", "green", "blue"],
  turnIndex: 0,
  movesPerTurn: 1,
  movesLeft: 1,
  round: 1,

  currentTeam: "red",
  action: "discover",

  portages: Object.fromEntries(
    Object.keys(board.portages).map((p) => [
      p,
      { owner: null, locked: false, status: "normal" }
    ])
  )
};

const teamMeta = {
  red: {
    name: "Lac du Flambeau",
    color: "red"
  },
  blue: {
    name: "Hudson Bay",
    color: "blue"
  },
  green: {
    name: "Prairie du Chien",
    color: "darkgreen"
  },
  yellow: {
    name: "Northwest",
    color: "goldenrod"
  }
};

export default function App() {

  const [loaded, setLoaded] = useState(false);

  const [gameState, setGameState] = useState(initialState);

  const syncToServer = async (newState) => {
    await updateGameState(newState);
  };

  useEffect(() => {
    const load = async () => {
      const data = await getGameState();

      if (data.gameState) {
        setGameState(JSON.parse(data.gameState));
      }

      setLoaded(true);
    };

    load();
  }, []);

  useEffect(() => {
    if (!loaded) return;

    syncToServer(gameState);
  }, [gameState, loaded]);

  const endRound = () => {
    setGameState((prev) => {
      const newState = {
        ...prev,
        round: prev.round + 1,
        movesLeft: prev.movesPerTurn,
        turnIndex: 0,
        currentTeam: prev.turnOrder[0],
        teams: Object.fromEntries(
          Object.entries(prev.teams).map(([k, v]) => [
            k,
            { ...v, savedThisRound: false }
          ])
        ),
        portages: Object.fromEntries(
          Object.entries(prev.portages).map(([k, v]) => [
            k,
            { ...v, locked: false, status: "normal" }
          ])
        )
      };

      return newState;
    });
  };

  const resetGame = async () => {
    await fetch(`${API_URL}/resetGame`, {
      method: "POST",
    });

    const data = await getGameState();
    setGameState(JSON.parse(data.gameState));
  };
  
  const calculateScore = (team) => {
    const owned = Object.values(gameState.portages).filter(
      (p) => p.owner === team
    ).length;

    const saved = gameState.teams[team].savedThisRound ? 1 : 0;

    return owned * 10 + saved * 20;
  };

  return (
    <div className="app-layout" style={{backgroundColor: "rgba(224, 220, 199, 0.79)"}}>

      {/* HEADER */}
      <header className="header" style={{fontFamily: "papyrus", fontSize: "42px", color: "black", textDecoration: "underline", textShadow: "2px 2px 4px rgba(0,0,0,0.5)"}}>
        The Grand Pursuit
      </header>

      {/* MAIN */}
      <div className="main">

        {/* SIDEBAR */}
        <div className="sidebar">

          {/* GAME STATE */}
          
          <div className="panel" style={{textAlign: "center"}}>
            <b style={{fontFamily: "papyrus", fontSize: "24px"}}>Round {gameState.round}</b>
            <hr></hr>
            <div style={{fontFamily: "Georgia", fontSize: "18px"}}>
              <p>
                <b>Current Team:</b>{" "}
                <br></br>
                <span style={{ color: teamMeta[gameState.currentTeam].color }}>
                  {teamMeta[gameState.currentTeam].name}
                </span>
              </p>

              <p>
                <b>Action:</b> 
                <br></br>
                {gameState.action.toUpperCase()}
              </p>
            </div>
          </div>

          {/* CONTROLS */}
          <div className="panel">
            <button
              className="control-btn"
              onClick={() => setGameState(p => ({ ...p, action: "discover" }))}
            >
              Discover
            </button>

            <button
              className="control-btn"
              onClick={() => setGameState(p => ({ ...p, action: "steal" }))}
            >
              Steal
            </button>

            <button
              className="control-btn"
              onClick={() => setGameState(p => ({ ...p, action: "save" }))}
            >
              Save
            </button>

            <button
              className="control-btn end-round"
              onClick={endRound}
            >
              End Round
            </button>

            <button 
              className="control-btn"
              onClick={resetGame}>
              Reset Game
            </button>
          </div>

          {/* SCOREBOARD */}
          <div className="panel">

            {["red", "yellow", "green", "blue"].map((team) => (
              <div key={team} className="score-row" style={{fontFamily: "Georgia", fontSize: "18px"}}>

                <img
                  src={`/assets/${team}.png`}
                  className="team-logo"
                  alt={team}
                />

                <span
                  className="team-name"
                  style={{ color: teamMeta[team].color }}
                >
                  {teamMeta[team].name}
                </span>

                <span className="score">
                  {calculateScore(team)}
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* MAP */}
        
        <div className="map-area">
          <Board gameState={gameState} setGameState={setGameState} />
        </div>

      </div>
    </div>
  );
}