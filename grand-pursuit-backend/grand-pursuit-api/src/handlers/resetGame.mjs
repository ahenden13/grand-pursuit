import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

export const handler = async () => {
    try {
        const emptyState = {
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
                Array.from({ length: 65 }, (_, i) => {
                    const id = `P${i + 1}`;
                    return [
                        id,
                        { owner: null, locked: false, status: "normal" }
                    ];
                })
            )
        };

        await client.send(
            new PutItemCommand({
                TableName: "GrandPursuitGameState",
                Item: {
                    gameId: { S: "main" },
                    state: { S: JSON.stringify(emptyState) }
                }
            })
        );

        return {
            statusCode: 200,

            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
            },

            body: JSON.stringify({
                message: "Game reset",
                gameState: JSON.stringify(emptyState)
            })
        };

    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: err.message
            })
        };
    }
};