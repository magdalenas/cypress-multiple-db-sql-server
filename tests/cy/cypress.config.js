import {defineConfig} from "cypress";
import { sqlQueryPlugin } from 'cypress-multiple-db-sql-server';
// import all from 'cypress-multiple-db-sql-server';

// all.sqlQueryPlugin

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) { // implement node event listeners here
      on('task', {
        ...sqlQueryPlugin
      });
      return config;
    },
    video: false,
    env: {
      db: {
        authentication: {
          type: 'default',
          options: {
            userName: 'sa',
            password: 'IMjNeZV9zypSRSddfW2L'
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
  }
});
