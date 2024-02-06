import { DataType} from "sequelize-typescript";
import {Migration} from '../../migrationHandler'


export const up: Migration = async({context: sequelize}) => {
    await sequelize.getQueryInterface().createTable("notes",{
        
        user_id:{
            type: DataType.INTEGER,
            allowNull: false,
        },
        id:{
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        
        title:{
            type: DataType.TEXT,
            allowNull: true
        },
        content:{
            type: DataType.TEXT,
            allowNull: true
        },   
         deletedAt:
        {
            allowNull: true,
            type: DataType.DATE
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
        },
    },)
};






export const down : Migration = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().dropTable('notes');
};
