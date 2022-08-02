import { ConnectionConfig } from 'tedious';
import { execSql } from './sqlServerHelper';

export default {
  'sqlServer:execute': async (args: { query: string; config: ConnectionConfig }) => {
    return execSql(args);
  },
};
