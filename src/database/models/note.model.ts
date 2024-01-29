import { Table, Column, ForeignKey, BelongsTo, HasMany, BelongsToMany, HasOne } from 'sequelize-typescript';
import { UserModel } from './user.model';
import { BaseModel } from './base.model';
import { SharedNotesModel } from './shared.notes.model';
import { User } from 'user.decorator';

@Table({ tableName: 'notes' })
export class NoteModel extends BaseModel<NoteModel> {
  @ForeignKey(() => UserModel,)
  
 
  @Column
  public user_id: number;

  @Column
  public title: string;

  @Column
  public content: string;

  @BelongsTo(() => UserModel,{foreignKey:'user_id', onDelete: 'cascade', onUpdate:'cascade' })
  public user : UserModel[]

  @HasMany(() => SharedNotesModel,{ foreignKey:'shared_note_id', onDelete: 'cascade', onUpdate:'cascade' },)
  public shares : SharedNotesModel[]
}
