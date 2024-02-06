import {
  Table,
  Column,
  HasMany,
} from 'sequelize-typescript';
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

  @Column
  public profile_image: string;

  @HasMany(() => NoteModel, {
    foreignKey: 'user_id'
  })
  public notes: NoteModel;

  @HasMany(() => SharedNotesModel, {
    foreignKey: 'sender_id'
  })
  public senders: SharedNotesModel[];

  @HasMany(() => SharedNotesModel, {
    foreignKey: 'receiver_id'
  })
  public receivers: SharedNotesModel[];
}
