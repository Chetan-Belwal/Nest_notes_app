import { Table, Column } from 'sequelize-typescript';
import { BaseModel } from './base.model';

@Table({ tableName: 'users' })
export class UserModel extends BaseModel<UserModel> {
  @Column
  public name: string;

  @Column
  public email: string;

  @Column
  public password: string;
}
