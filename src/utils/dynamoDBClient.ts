import { DynamoDB } from 'aws-sdk';

const options = {
  region: 'localhost',
  endpoint: 'http://localhost:8000',
  accessKeyId: 'x',
  secretAccessKey: 'x',
};

function isOffline() {
  return process.env.IS_OFFLINE;
}

const client = isOffline()
  ? new DynamoDB.DocumentClient(options)
  : new DynamoDB.DocumentClient();

export { client };
