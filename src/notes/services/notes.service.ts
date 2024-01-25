import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { where } from 'sequelize';
import { NoteModel } from 'src/database/models/note.model';
import { UserModel } from 'src/database/models/user.model';
import { NotesDto } from 'src/users/dtos/notes-dto/notes.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(NoteModel)
    private noteModel: typeof NoteModel,
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
  public async showNotes(notesDto: any) {
    console.log('Checking in notes service', notesDto);
    return  this.noteModel.findAll({
      where: {
        user_id: notesDto.user_id,
      },
      raw: true,
    });
  }

  //Delete user notes
  public  delete_note(note: NoteModel): Promise<void>{ 
    return note.destroy();
  }

  public  updateNotes(note: NoteModel, content : Pick<NoteModel,  'title'|'content'>){
    return note.set(content).save();

  }

  /**
   * It will find note by id
   * @param id 
   * @returns Promise<NoteModel>
   */
  public findOne(id: number): Promise<NoteModel>{
    return this.noteModel.findByPk(id);
  }

}

