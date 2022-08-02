// @ts-nocheck

function getDbConfig(db: string): ConnectionConfig {
  let config = Cypress.env('db') as ConnectionConfig;
  console.log('[getDbConfig]: ' + db);
  config.options!.database = db;
  return config;
}

export default function () {
  Cypress.Commands.add('sqlServerQuery', (dbName, query) => {
    if (!dbName) {
      fail('[sqlServerQuery] Database name needs to be provided');
    }
    if (!query) {
      fail('[sqlServerQuery] SQL Query needs to be provided');
    }
    cy.task('sqlServer:execute', { query, config: getDbConfig(dbName) });
  });
}
