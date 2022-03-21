import dayjs from 'dayjs';

import { APIGatewayProxyHandler } from 'aws-lambda';
import { v4 as uuidV4 } from 'uuid';
import { client } from '../utils/dynamoDBClient';

interface IRequest {
  title: string;
  deadline: string;
}

interface ICreateTodo {
  id: string;
  user_id: string;
  title: string;
  done: boolean;
  deadline: string;
}

const handler: APIGatewayProxyHandler = async (event) => {
  const { user_id } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as IRequest;

  const todo: ICreateTodo = {
    id: uuidV4(),
    user_id,
    title,
    done: false,
    deadline: dayjs(deadline).toISOString(),
  };

  try {
    await client
      .put({
        TableName: 'user_todos',
        Item: todo,
      })
      .promise();
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Ocurred an error while we're saving the data!",
      }),
    };
  }

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Todo created successful!',
      todo,
    }),
  };
};

export { handler };
