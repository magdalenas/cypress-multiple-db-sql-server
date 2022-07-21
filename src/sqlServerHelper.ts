import { Connection, Request } from 'promisified-tedious';
import { ConnectionConfig } from 'tedious';

const DEBUG = false;

function debugLogs(msg: any) {
  if (DEBUG) {
    console.log(msg);
  }
}

export async function execSql(args: { query: string; config: ConnectionConfig }) {
  const config = args.config;
  debugLogs('DB: ' + config.options!.database);
  const connection = new Connection(config);

  try {
    debugLogs('connecting...');
    await connection.connect();
  } catch (err) {
    console.error(err);
    return;
  }

  try {
    const request = new Request(args.query);
    debugLogs('About to run the query: ' + args.query);
    const result = await connection.execSql(request);

    return flattenResult(result);
  } catch (err) {
    console.error(err);
  } finally {
    await connection.close();
  }
}

function flattenResult(response: any) {
  let result = new Array<any>();

  const flatten = (r: any): never[] => (Array.isArray(r) && r.length === 1 ? flatten(r[0]) : r);

  if (response) {
    for (let i in response) {
      result.push(new Array<any>());
      for (let j in response[i]) {
        result[<any>i].push(response[i][j].value);
      }
    }
    result = flatten(result);
  } else {
    result = response;
  }

  debugLogs(result);
  return result;
}
