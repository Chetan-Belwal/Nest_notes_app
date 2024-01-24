import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NoteModel } from 'src/database/models/note.model';
import { UserModel } from 'src/database/models/user.model';
import { NotesDto } from 'src/users/dtos/notes-dto/notes.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(NoteModel)
    private noteModel: typeof NoteModel,
  ) {}

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

  public async showNotes(notesDto: any) {
    console.log('Checking in notes service', notesDto);
    const user = await this.noteModel.findAll({
      where: {
        user_id: notesDto.user_id,
      },
      raw: true,
    });
    return user;
  }
}
