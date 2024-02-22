import { Table, Column, ForeignKey, BelongsTo, Scopes } from 'sequelize-typescript';
import { UserModel } from './user.model';
import { NoteModel } from './note.model';
import { BaseModel } from './base.model';
import { Op } from 'sequelize';

@Scopes(()=>({
  withUserAndNotes:{include: [
    { model: UserModel, attributes: ['name'], as: 'sender' },
    {
      model: NoteModel,
      attributes: ['title', 'content'],
      where: {
        title: { [Op.ne]: null },
        content: { [Op.ne]: null },
      },
      as: 'notes',
    },
  ]
},
withNotes:{
  include: [
    { model: UserModel, attributes: ['name'], as: 'receiver' },
    {
      model: NoteModel,
      attributes: ['title', 'content'],
      where: {
        title: { [Op.ne]: null },
        content: { [Op.ne]: null },
      },
      as: 'notes',
    },
  ],
},

userName(name,as){
  return {
    include:[{
      model:UserModel,
      where:{
        name:{
          [Op.like]:`%${name}%`
        }  
      },
      attributes:['name'],
      as: `${as}`
    }]
    
  }
},
withFilterNotes(){
  return {
    include: [
      {
        model: NoteModel,
        attributes: ['title', 'content'],
        where: {
          title: { [Op.ne]: null },
          content: { [Op.ne]: null },
        },
        as: 'notes',
      },
    ],
  }

  }
  
}))

@Table({ tableName: 'shared_notes' })
export class SharedNotesModel extends BaseModel<SharedNotesModel> {
  @ForeignKey(() => UserModel)
  @Column
  public sender_id: number;

  @ForeignKey(() => UserModel)
  @Column
  public receiver_id: number;

  @ForeignKey(() => NoteModel)
  @Column
  public shared_note_id: number;

  @BelongsTo(() => UserModel, { foreignKey: 'sender_id' })
  public sender: UserModel[];

  @BelongsTo(() => UserModel, { foreignKey: 'receiver_id' })
  public receiver: UserModel[];

  @BelongsTo(() => NoteModel, { foreignKey: 'shared_note_id' })
  public notes: NoteModel[];
}
