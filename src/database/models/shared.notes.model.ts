import { Table, Column, ForeignKey, HasMany, BelongsTo } from 'sequelize-typescript';
import { UserModel } from './user.model';
import { DatesMappingModel } from './dates.mapping.model';
import { NoteModel } from './note.model';
import { BaseModel } from './base.model';

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

  @BelongsTo(() => UserModel,{foreignKey:'sender_id', onDelete: 'cascade', onUpdate:'cascade' })
  public sender : UserModel[]

  @BelongsTo(() => UserModel,{foreignKey:'receiver_id', onDelete: 'cascade', onUpdate:'cascade' })
  public receiver : UserModel[]

  @BelongsTo(() => NoteModel,{foreignKey:'shared_note_id', onDelete: 'cascade', onUpdate:'cascade' })
  public notes : NoteModel[]

}
