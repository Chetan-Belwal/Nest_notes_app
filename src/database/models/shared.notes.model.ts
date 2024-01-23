import { Table, Column, ForeignKey } from 'sequelize-typescript';
import { UserModel } from './user.model';
import { DatesMappingModel } from './dates.mapping.model';
import { NoteModel } from './note.model';

@Table({ tableName: 'shared_notes' })
export class SharedNotes extends DatesMappingModel<SharedNotes> {
  @ForeignKey(() => UserModel)
  @Column
  public sender_id: number;

  @ForeignKey(() => UserModel)
  @Column
  public receiver_id: number;

  @ForeignKey(() => NoteModel)
  @Column
  public shared_note_id: number;

}
