import { DataType } from "sequelize-typescript";

export const up = async({context: sequelize}) => {
    await sequelize.getQueryInterface().createTable("notes",{
        user_id:{
            type: DataType.INTEGER,
            allowNull: false,
            references:{
                model: 'users',
                key: 'id'
            }
        },
        note_id:{
            type: DataType.INTEGER,
            primaryKey: true
        },
        title:{
            type: DataType.TEXT,
            allowNull: true
        },
        description:{
            type: DataType.TEXT,
            allowNull: true
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
    })
};





export const down = async ({ context: sequelize }) => {
	await sequelize.getQueryInterface().dropTable('notes');
};
