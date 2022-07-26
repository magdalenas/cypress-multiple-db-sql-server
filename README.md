# cypress-multiple-db-sql-server

Cypress plugin for connecting to MS SQL server (using [tedious](http://tediousjs.github.io/tedious/)), heavily inspired by `cypress-sql-server` plugin but allowing to connect to multiple databases by passing the database name in the command.

Should one want to connect to different servers, it should be possible to create separate tasks using `execSql` function and pass whole new configuration as one of the parameters

## Configuration

Example for Cypress 10+

### Add command

```
// support/commands.ts

import { sqlQueryCommand } from 'cypress-multiple-db-sql-server';

sqlQueryCommand();
```

### Add plugin

```
// cypress.config.ts

import { sqlQueryPlugin } from 'cypress-multiple-db-sql-server';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        ...sqlQueryPlugin
      });
      return config;
    }
  }
});

```

### Database configuration

```
// cypress.config.ts

export default defineConfig({
  ...
  env: {
      db: {
        authentication: {
          type: 'default',
          options: {
            userName: 'sa',
            password: 's0mePassw0rd'
          }
        },
        server: 'localhost',
        options: {
          database: '',
          encrypt: true,
          rowCollectionOnRequestCompletion: true,
          trustServerCertificate: true,
          port: 1433, // Default Port
        }
      }
    }
```

## Usage

```
  cy.sqlServerQuery('dbName', 'SELECT * FROM TableName').then((res) => ...)
```