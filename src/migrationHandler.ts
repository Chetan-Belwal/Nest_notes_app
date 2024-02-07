import { Umzug, SequelizeStorage } from 'umzug';
import { Sequelize } from 'sequelize';
const sequelize = new Sequelize({
  username: process.env.USERNAMEDB,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  host: process.env.DATABASE_HOST,
  dialect: 'mysql',
  storage: './db.sql',
});
export const migrator = new Umzug({
  migrations: {
    glob: 'src/database/migrations/*.ts',
  },
  context: sequelize,
  storage: new SequelizeStorage({
    sequelize,
  }),
  logger: console,
});
export type Migration = typeof migrator._types.migration;
