import { DataType } from 'sequelize-typescript';

export const up= async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('users', {
          id: {
            type: DataType.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          name: {
            type: DataType.STRING,
            allowNull: false,
          },
          email: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
          },
          password: {
            type: DataType.STRING,
            allowNull: false,
          },
          created_at:{
            type: DataType.DATE,
            allowNull: false,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP()")
          },
          updated_at: {
            type:DataType.DATE,
            allowNull: false,
            defaultValue: sequelize.literal("CURRENT_TIMESTAMP()")
          }
	});
};

export const down = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().dropTable('users');
};