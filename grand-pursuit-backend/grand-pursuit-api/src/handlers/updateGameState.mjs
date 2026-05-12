import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

export const handler = async (event) => {
    try {
        const body = JSON.parse(event.body);

        await client.send(
            new PutItemCommand({
                TableName: "GrandPursuitGameState",
                Item: {
                    gameId: { S: "main" },
                    state: { S: JSON.stringify(body) }
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
            message: "Game state updated"
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