import { DataType } from "sequelize-typescript";

export const up = async ({context: sequelize }) => {
    await sequelize.getQueryInterface().createTable('shared_notes', {
        sender_id:{
            type: DataType.INTEGER,
            allowNull: false,
            references:{
                model: 'users',
                key: 'id'
            }
        },

        receiver_id:{
            type: DataType.INTEGER,
            allowNull: false,
            references:{
                model: 'users',
                key: 'id'
            }
        },
        shared_note_id:{
            type: DataType.INTEGER,
            references:{
                model: 'notes',
                key: 'note_id'
            }

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

export const down = async ({context: sequelize})=> {
   await sequelize.getQueryInterface().dropTable('shared_notes');
};
