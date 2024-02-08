import { Migration } from '../../migrationHandler';

export const up: Migration = async ({
  context: sequelize,
}: {
  context: any;
}): Promise<void> => {
  await sequelize.getQueryInterface().addConstraint('notes', {
    fields: ['user_id'],
    type: 'foreign key',
    name: 'user_id',
    references: {
      table: 'users',
      field: 'id',
    },
    onDelete: 'cascade',
    onUpdate: 'cascade',
  });

  await sequelize.getQueryInterface().addConstraint(
    'shared_notes',
    {
      fields: ['shared_note_id'],
      type: 'foreign key',
      name: 'sharedNotes',
      references: {
        table: 'notes',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
    await sequelize.getQueryInterface().addConstraint(
      'shared_notes',
    {
      fields: ['sender_id'],
      type: 'foreign key',
      name: 'sender',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    })
    await sequelize.getQueryInterface().addConstraint(
      'shared_notes',
    {
      fields: ['receiver_id'],
      type: 'foreign key',
      name: 'receiver',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    },
  );
};
export const down: Migration = async ({
  context: sequelize,
}: {
  context: any;
}): Promise<void> => {
  await sequelize.getQueryInterface().removeConstraint('notes', 'user_id');
  await sequelize
    .getQueryInterface()
    .removeConstraint('shared_notes', 'sharedNotes');
  await sequelize
    .getQueryInterface()
    .removeConstraint('shared_notes', 'sender');
  await sequelize
    .getQueryInterface()
    .removeConstraint('shared_notes', 'receiver');
};
