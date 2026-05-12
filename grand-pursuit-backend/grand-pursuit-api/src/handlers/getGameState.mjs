import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});

export const handler = async () => {
    try {
        const result = await client.send(
            new GetItemCommand({
                TableName: "GrandPursuitGameState",
                Key: {
                    gameId: { S: "main" }
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
                gameState: result.Item?.state?.S || "{}"            
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