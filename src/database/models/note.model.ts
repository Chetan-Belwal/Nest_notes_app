import {
  Table,
  Column,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
  HasOne,
  Default,
  DeletedAt,
} from 'sequelize-typescript';
import { UserModel } from './user.model';
import { BaseModel } from './base.model';
import { SharedNotesModel } from './shared.notes.model';

@Table({ tableName: 'notes', paranoid: true })
export class NoteModel extends BaseModel<NoteModel> {
  @ForeignKey(() => UserModel)
  @Column
  public user_id: number;

  @Column
  public title: string;

  @Column
  public content: string;

  @DeletedAt
  declare deletedAt?: Date | any;

  @BelongsTo(() => UserModel, {
    foreignKey: 'user_id',
    onDelete: 'cascade',
    onUpdate: 'cascade',
  })
  public user: UserModel[];

  @HasMany(() => SharedNotesModel, {
    foreignKey: 'shared_note_id',
    onDelete: 'cascade',
    onUpdate: 'cascade',
  })
  public shares: SharedNotesModel[];
}
