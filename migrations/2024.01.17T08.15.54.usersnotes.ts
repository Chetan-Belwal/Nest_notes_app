import { DataType, Default } from "sequelize-typescript";

export const up = async({context: sequelize}) => {
    await sequelize.getQueryInterface().createTable("notes",{
        
        user_id:{
            type: DataType.INTEGER,
            allowNull: false,
            references:{
                model: 'users',
                key: 'id'
            },
            onDelete:'cascade',
            onUpdate:'cascade'
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
        }
    },{paranoid : true})
};





export const down = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().dropTable('notes');
};
