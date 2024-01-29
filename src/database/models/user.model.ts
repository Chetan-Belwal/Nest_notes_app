import { Table, Column, BelongsToMany, BelongsTo, HasOne, HasMany } from 'sequelize-typescript';
import { BaseModel } from './base.model';
import { SharedNotesModel } from './shared.notes.model';
import { NoteModel } from './note.model';

@Table({ tableName: 'users' })
export class UserModel extends BaseModel<UserModel> {
  @Column
  public name: string;

  @Column
  public email: string;

  @Column
  public password: string;

 @HasMany(() => NoteModel,{foreignKey:'user_id', onDelete: 'cascade', onUpdate:'cascade' })
 public notes : NoteModel

  @HasMany(() => SharedNotesModel,{foreignKey:'sender_id', onDelete: 'cascade', onUpdate:'cascade' })
  public senders : SharedNotesModel[]

  @HasMany(() => SharedNotesModel,{foreignKey:'receiver_id', onDelete: 'cascade', onUpdate:'cascade' })
  public receivers : SharedNotesModel[]
}
