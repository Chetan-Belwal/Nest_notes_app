import { Umzug, SequelizeStorage } from 'umzug';
import { Sequelize } from 'sequelize';
import { cwd } from 'node:process';


const sequelize = new Sequelize('User', 'root', 'Rubi@123', {
  dialect: 'mysql',
  host: 'localhost',
});
const dir: string = cwd();
export const migrator = new Umzug({
  migrations: {
    glob: ['./migrations/*.ts', { cwd: dir}]
  },
  context: sequelize,
  storage: new SequelizeStorage({ sequelize }),
  logger: console,
});
