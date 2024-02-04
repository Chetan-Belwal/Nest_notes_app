import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { NoteModel } from 'src/database/models/note.model';
import { SharedNotesModel } from 'src/database/models/shared.notes.model';
import { UserModel } from 'src/database/models/user.model';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(NoteModel)
    private noteModel: typeof NoteModel,
    @InjectModel(SharedNotesModel)
    private sharedNote: typeof SharedNotesModel,
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
    private mailService: MailService,
  ) {}

  //Save user notes
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

  //Display user notes
  public async showNotes(note: Pick<NoteModel, 'user_id'>) {
    return await this.noteModel.findAll({
      where: {
        user_id: note.user_id,
      },
    });
  }

  /**
   * This functions returns the notes that were
   * received by the user
   * @param note
   * @returns
   */

  public async showMyReceivedNotes(note: Pick<NoteModel, 'user_id'>) {
    console.log(note, 'lol');

    const data = await this.sharedNote.findAll({
      where: { receiver_id: note.user_id },
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
      raw: true,
    });

    const noteWithUsername = data.map((note) => {
      const noteObject = Object.assign({}, note);
      const username = noteObject['sender.name'];
      const title = noteObject['notes.title'];
      const content = noteObject['notes.content'];
      const data = { username, title, content };
      return data;
    });

    return noteWithUsername;
  }

  /**
   * This function returns the notes that were
   * send by the user
   * @param note
   * @returns
   */

  public async showMySharedNotes(note: NoteModel) {
  // const sharesWith = await note.$get('shares');
  // console.log(sharesWith, "sdhares")  
  
    
    const data = await this.sharedNote.findAll({
      where: { sender_id: note.user_id },
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
      raw: true,
    });
    console.log(data)

    const noteWithUsername = data.map((note) => {
      const noteObject = Object.assign({}, note);
      const username = noteObject['receiver.name'];
      const title = noteObject['notes.title'];
      const content = noteObject['notes.content'];
      const data = { username, title, content };
      return data;
    });
    console.log('Look ', noteWithUsername);
    return noteWithUsername;
  }

  //Delete user notes
  /**
   *soft Deletes user notes and sends email to notes receiver
   * @param note takes notes model as instance
   * @returns deletes the data
   */

  public async delete_note(note: NoteModel): Promise<any> {
    console.log('test', note.id);
    const data: any = await this.sharedNote.findAll({
      where: { sender_id: note.dataValues.user_id },
      attributes: ['shared_note_id'],
      include: [
        { model: UserModel, attributes: ['name', 'email'], as: 'receiver' },
        {
          model: NoteModel,
          attributes: ['title', 'content'],
          where: {
            title: { [Op.ne]: null },
            content: { [Op.ne]: null },
            id: note.id
          },
          as: 'notes',
        },
        { model: UserModel, attributes: ['name'], as: 'sender' },
      ],
      plain: true,
    });

    if (data != null) {
      await this.mailService.sendUserDeleteConfirmation(data.toJSON());
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
   * It will find note by id
   * @param id
   * @returns Promise<NoteModel>
   */
  public async findOne(id: number): Promise<NoteModel> {
    return await this.noteModel.findByPk(id);
  }

  public async findPic(id: any) {
    const user_id = id.user_id
    console.log(user_id,"user_id")
    const data =await this.userModel.findOne(user_id);
    console.log(data)
    const profile_pic = data.dataValues.profile_image
    return profile_pic
  }
}
