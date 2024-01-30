import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { SharedNotesModel } from 'src/database/models/shared.notes.model';
import { UserModel } from 'src/database/models/user.model';

@Injectable()
export class NotesSharingService {
  constructor(
    @InjectModel(UserModel) private userModel: typeof UserModel,
    @InjectModel(SharedNotesModel) private sharedNote: typeof SharedNotesModel,
  ) {}

  /**
   * This service will return all the user present in the database
   */

  public async getAll(note_id: number, userId: any) {
    const users = await this.userModel.findAll({
      where: { id: { [Op.ne]: userId.user_id } },
      raw: true,
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
    sender_id: any,
    receiver_id: number,
    note_id: number,
  ) {
    return await this.sharedNote
      .build()
      .set({
        sender_id: sender_id.user_id,
        receiver_id: receiver_id,
        shared_note_id: note_id,
      })
      .save();
  }
}
