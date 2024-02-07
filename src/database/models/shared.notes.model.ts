import { Table, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { UserModel } from './user.model';
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

  @BelongsTo(() => UserModel, { foreignKey: 'sender_id' })
  public sender: UserModel[];

  @BelongsTo(() => UserModel, { foreignKey: 'receiver_id' })
  public receiver: UserModel[];

  @BelongsTo(() => NoteModel, { foreignKey: 'shared_note_id' })
  public notes: NoteModel[];
}
