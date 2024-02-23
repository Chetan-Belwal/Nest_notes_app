import { Migration } from '../../migrationHandler';
import { DataType, ForeignKey } from 'sequelize-typescript';

export const up: Migration = async ({context:sequelize}) => {
    await sequelize.getQueryInterface().createTable('notification',{
        id:{
            type:DataType.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        notification_token:{
            type:DataType.STRING
        },
        title:{
            type:DataType.STRING
        },
        content:{
            type:DataType.TEXT
        },
        user:{
            type:DataType.INTEGER
        },
        status:{
            type:DataType.BOOLEAN,
            defaultValue:true
        },
        created_at: {
          type: DataType.DATE,
          allowNull: false,
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP()'),
        },
        updated_at: {
          type: DataType.DATE,
          allowNull: false,
          defaultValue: sequelize.literal('CURRENT_TIMESTAMP()'),
        },
    })

    await sequelize.getQueryInterface().addConstraint('notification',{
        fields:['user'],
        type: 'foreign key',
        name: 'user',
        references:{
            table:'shared_notes',
            field: 'receiver_id'
        },
        onDelete: 'cascade',
        onUpdate:'cascade'
    })
};


export const down: Migration = async ({context: sequelize}) => {
    await sequelize.getQueryInterface().dropTable('notification');
};
