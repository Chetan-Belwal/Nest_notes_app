import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize("User", "root", "123",{
    host: 'localhost',
    dialect: "mysql"
});
