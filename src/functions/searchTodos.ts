import { APIGatewayProxyHandler } from 'aws-lambda';
import { client } from '../utils/dynamoDBClient';

const handler: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;

  const todos = [];

  try {
    const response = await client
      .scan({
        TableName: 'user_todos',
        FilterExpression: 'user_id = :user_id',
        ExpressionAttributeValues: { ':user_id': user_id },
      })
      .promise();

    todos.push(...response.Items);
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Ocurred an error while we're saving the data!",
        error: err,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(todos),
  };
};

export { handler };
