import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { NoteModel } from 'src/database/models/note.model';
import { SharedNotesModel } from 'src/database/models/shared.notes.model';
import { UserModel } from 'src/database/models/user.model';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from '../../users/services/users.service';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(NoteModel)
    private noteModel: typeof NoteModel,
    @InjectModel(SharedNotesModel)
    private sharedNote: typeof SharedNotesModel,
    private userService: UsersService,
    private mailService: MailService,
  ) {}

  /**
   * Save user notes title and content
   * @param user
   * @param noteData
   * @returns
   */
  public async saveNote(
    user: UserModel | number,
    noteData: Pick<NoteModel, 'title' | 'content'>,
  ): Promise<NoteModel> {
    return await this.noteModel
      .build()
      .set({
        user_id: typeof user === 'number' ? user : user.id,
        title: noteData.title,
        content: noteData.content,
      })
      .save();
  }

  /**
   * display user notes
   * @param note
   * @returns
   */
  public async showNotes(note: Pick<UserModel, 'id'>) {
    return await this.noteModel.findAll({
      where: {
        user_id: note.id,
      },
    });
  }

  /**
   * This functions returns the notes that were
   * received by the user
   * @param note
   * @returns
   */

  public async showMyReceivedNotes(note: UserModel) {
    console.log(note, 'lol');

    return await this.sharedNote.findAll({
      where: { receiver_id: note.id },
      attributes: ['shared_note_id'],
      include: [
        { model: UserModel, attributes: ['name'], as: 'sender' },
        {
          model: NoteModel,
          attributes: ['title', 'content'],
          where: {
            title: { [Op.ne]: null },
            content: { [Op.ne]: null },
          },
          as: 'notes',
        },
      ],
    });
  }

  /**
   * This function returns the notes that were
   * send by the user
   * @param note
   * @returns
   */

  public async showMySharedNotes(note: UserModel) {
    return await this.sharedNote.findAll({
      where: { sender_id: note.id },
      attributes: ['shared_note_id'],
      include: [
        { model: UserModel, attributes: ['name'], as: 'receiver' },
        {
          model: NoteModel,
          attributes: ['title', 'content'],
          where: {
            title: { [Op.ne]: null },
            content: { [Op.ne]: null },
          },
          as: 'notes',
        },
      ],
    });
  }

  //Delete user notes
  /**
   *soft Deletes user notes and sends email to notes receiver
   * @param note takes notes model as instance
   * @returns deletes the data
   */

  public async deleteNote(note: NoteModel): Promise<any> {
    console.log('test', note.id);
    const data = await this.sharedNote.findOne({
      where: { sender_id: note.user_id },
      attributes: ['shared_note_id'],
      include: [
        { model: UserModel, attributes: ['name', 'email'], as: 'receiver' },
        {
          model: NoteModel,
          attributes: ['title', 'content'],
          where: {
            title: { [Op.ne]: null },
            content: { [Op.ne]: null },
            id: note.id,
          },
          as: 'notes',
        },
        { model: UserModel, attributes: ['name'], as: 'sender' },
      ],
    });
    console.log('inside deletenote');

    if (data != null) {
      await this.mailService.sendUserDeleteConfirmation(data);
      await note.destroy();
    } else {
      await note.destroy();
    }
  }

  public updateNotes(
    note: NoteModel,
    content: Pick<NoteModel, 'title' | 'content'>,
  ) {
    return note.set(content).save();
  }

  /**
   * This will find note by id
   * @param id
   * @returns Promise<NoteModel>
   */
  public async findOne(id: number): Promise<NoteModel> {
    return await this.noteModel.findByPk(id);
  }
}
