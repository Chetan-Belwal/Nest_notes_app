import { Table, Column, ForeignKey } from 'sequelize-typescript';
import { UserModel } from './user.model';
import { BaseModel } from './base.model';

@Table({ tableName: 'notes' })
export class NoteModel extends BaseModel<NoteModel> {
  @ForeignKey(() => UserModel)
  @Column
  public user_id: number;

  @Column
  public title: string;

  @Column
  public content: string;
}
