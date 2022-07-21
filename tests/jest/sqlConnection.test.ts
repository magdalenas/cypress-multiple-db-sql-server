import { ConnectionConfig } from 'tedious';
import { execSql } from '../../src/index';

const dbPassword = process.env.SA_PASSWORD || 'IMjNeZV9zypSRSddfW2L';
const dbServer = process.env.DB_SERVER || 'localhost';

function getDbConfig(db: string): ConnectionConfig {
  const config = {
    authentication: {
      type: 'default',
      options: {
        userName: 'sa',
        password: dbPassword,
      },
    },
    server: dbServer,
    options: {
      database: '',
      encrypt: true,
      rowCollectionOnRequestCompletion: true,
      trustServerCertificate: true,
      port: 1433, // Default Port
    },
  } as ConnectionConfig;

  console.log('[getDbConfig]: ' + db);
  config.options!.database = db;
  return config;
}

const queries = {
  dbName: 'SELECT DB_NAME()',
  listOfTables: 'SELECT * FROM INFORMATION_SCHEMA.TABLES',
};

test('Connects to specified db', async () => {
  const config = getDbConfig('master');
  const res = await execSql({ query: queries.dbName, config });
  console.log(res);
  expect(res).toEqual(config.options!.database);
  expect(res).toEqual('master');
});

test('Can fetch list of tables', async () => {
  const config = getDbConfig('master');
  const res = await execSql({ query: queries.listOfTables, config: config });
  console.log(res);
  console.log(JSON.stringify(config));
  expect(res?.length).toBeGreaterThanOrEqual(1);
});

test('Can connect to multiple dbs', async () => {
  const config1 = getDbConfig('master');
  const config2 = getDbConfig('model');

  expect(config1.options!.database).not.toEqual(config2.options!.database);
  const res1 = await execSql({ query: queries.dbName, config: config1 });
  expect(res1).toEqual(config1.options!.database);

  const res2 = await execSql({ query: queries.dbName, config: config2 });
  expect(res2).toEqual(config2.options!.database);
});
