const API_URL = "https://9wg6k0fgrj.execute-api.us-west-1.amazonaws.com/Prod";

export async function getGameState() {
  const res = await fetch(`${API_URL}/getGameState`);
  return res.json();
}

export async function updateGameState(gameState) {
  const res = await fetch(`${API_URL}/updateGameState`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(gameState)
  });

  return res.json();
}

export async function resetGame() {
  const res = await fetch(`${API_URL}/resetGame`, {
    method: "POST"
  });

  return res.json();
}