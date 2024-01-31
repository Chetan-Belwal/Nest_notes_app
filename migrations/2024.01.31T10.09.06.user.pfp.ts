import { DataType } from 'sequelize-typescript';
import type { MigrationFn } from 'umzug';

export const up = async ({context: sequelize })  => {
    await sequelize.getQueryInterface().createTable('user_pfp', {
        user_id:{
            type: DataType.INTEGER,
            references:{
                model:'users',
                key:'id'
            }
        }
        
    })
};
export const down: MigrationFn = async params => {};
