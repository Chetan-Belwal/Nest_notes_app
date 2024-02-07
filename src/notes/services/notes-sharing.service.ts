import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { SharedNotesModel } from 'src/database/models/shared.notes.model';
import { UserModel } from 'src/database/models/user.model';
import { NoteModel } from '../../database/models/note.model';

@Injectable()
export class NotesSharingService {
  constructor(
    @InjectModel(UserModel) private userModel: typeof UserModel,
    @InjectModel(SharedNotesModel) private sharedNote: typeof SharedNotesModel,
  ) {}

  /**
   * This service will return all the user present in the database
   */

  public async getAll(note_id: NoteModel, user: UserModel) {
    const users = await this.userModel.findAll({
      where: { id: { [Op.ne]: user.id } },
    });
    const result = users.map((item) => {
      return { name: item.name, user_id: item.id, note_id: note_id };
    });
    console.log('testing the result', result);
    return result;
  }

  /**
   * this function stores the info about the shared notes
   * @param sender_id
   * @param receiver_id
   * @param note_id
   */

  public async saveShareInfo(
    senderId: UserModel,
    receiverId: number,
    noteId: number,
  ) {
    return this.sharedNote
      .build()
      .set({
        sender_id: senderId.id,
        receiver_id: receiverId,
        shared_note_id: noteId,
      })
      .save();
  }
}
