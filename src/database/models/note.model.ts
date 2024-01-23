import { Table, Column, ForeignKey, PrimaryKey } from 'sequelize-typescript';
import { UserModel } from './user.model';
import { DatesMappingModel } from './dates.mapping.model';

@Table({ tableName: 'notes' })
export class NoteModel extends DatesMappingModel<NoteModel> {
  @ForeignKey(() => UserModel)
  @Column
  public user_id: number;

  @PrimaryKey
  @Column
  public note_id: number;

  @Column
  public title: string;

  @Column
  public description: string;

}
