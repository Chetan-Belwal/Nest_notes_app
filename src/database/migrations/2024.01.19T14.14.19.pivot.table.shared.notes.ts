import { DataType } from 'sequelize-typescript';
import { Migration } from '../../migrationHandler';

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable('shared_notes', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    sender_id: {
      type: DataType.INTEGER,
      allowNull: false,
    },

    receiver_id: {
      type: DataType.INTEGER,
      allowNull: false,
    },
    shared_note_id: {
      type: DataType.INTEGER,
      references: {
        model: 'notes',
        key: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
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
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable('shared_notes');
};
