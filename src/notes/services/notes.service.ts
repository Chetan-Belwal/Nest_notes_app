import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NoteModel } from 'src/database/models/note.model';
import { SharedNotesModel } from 'src/database/models/shared.notes.model';
import { UserModel } from 'src/database/models/user.model';

@Injectable()
export class NotesService {
  constructor(
    @InjectModel(NoteModel)
    private noteModel: typeof NoteModel,
    @InjectModel(SharedNotesModel)
    private sharedNote: typeof SharedNotesModel
  ) { }


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
      raw: true,
    });
  }

  /**
   * This functions returns the notes that were 
   * received by the user
   * @param note 
   * @returns 
   */

  public async showMyReceivedNotes(note: Pick<NoteModel, 'user_id'>) {
    console.log(note, "lol");

    
    const data = await this.sharedNote.findAll({
      where: { receiver_id: note.user_id },
      attributes: ['shared_note_id'],
      include:[
        {model: UserModel,
          attributes:['name'],
          as: 'sender'
        },{
          model:NoteModel,
          attributes:['title','content'],
          as: 'notes'
        }
      ],
      raw: true
    })

    const noteWithUsername= data.map((note) => {
      const noteObject = Object.assign({}, note);
      const username = noteObject['sender.name'];
      const title = noteObject['notes.title'];
      const content = noteObject['notes.content'];
      const data = {username,title,content}
      return data
    });

    return noteWithUsername;


  }



  /**
   * This function returns the notes that were 
   * send by the user
   * @param note 
   * @returns 
   */

  public async showMySharedNotes(note: Pick<NoteModel, 'user_id'>) {

    const data = await this.sharedNote.findAll({
      where: { sender_id: note.user_id },
      attributes: ['shared_note_id'],
      include:[
        {model: UserModel,
          attributes:['name'],
          as: 'receiver'
        },{
          model:NoteModel,
          attributes:['title','content'],
          as: 'notes'
        }
      ],
      raw: true
    })

    const noteWithUsername= data.map((note) => {
      const noteObject = Object.assign({}, note);
      const username = noteObject['receiver.name'];
      const title = noteObject['notes.title'];
      const content = noteObject['notes.content'];
      const data = {username,title,content}
      return data
    });

    return noteWithUsername;

  }



  //Delete user notes
  /**
   * 
   * @param note takes notes model as instance 
   * @returns deletes the data
   */
  public delete_note(note: NoteModel): Promise<void> {
    return note.destroy();
  }

  public updateNotes(note: NoteModel, content: Pick<NoteModel, 'title' | 'content'>) {
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
}






/**
* Test code
 */

//SHARED
// const data = await this.noteModel.findAll({
//   include: [{
//     model: SharedNotesModel,
//     attributes: ['shared_note_id'],
//     where: { receiver_id: note.user_id },
//     as: 'shares'
//   }],
//   raw: true,
// });
// console.log("This is a data : ", data)
// const noteId = data.map((note) => {
//   const noteObject = Object.assign({}, note);
//   const data = noteObject['shares.shared_note_id']
//   return data
// });

//RECEIVED


// const data2 = await this.noteModel.findAll({
//   where: {
//     user_id: note.user_id,
//   },
//   include: [{
//     model: SharedNotesModel,
//     attributes: ['shared_note_id'],
//     where: { sender_id: note.user_id },
//     as: 'shares'
//   }],
//   raw: true,
// });
// const noteId = data2.map((note) => {
//   const noteObject = Object.assign({}, note);
//   const data = noteObject['shares.shared_note_id']
//   return data
// });

//More test code
  // console.log("this is a test",data)
    // const noteId = data.map((item) => {
    //   const value = item.shared_note_id
    //   return value
    // })
    // console.log(noteId)

    // const usernames = data.map((note) => {
    //   const noteObject = Object.assign({}, note);
    //   const username = noteObject['receiver.name'];
    //   return username      
    // });

    // console.log("Username",usernames)


    // const sharedNotes = await this.noteModel.findAll({
    //   where: {
    //     id: noteId
    //   },
    //   attributes: ['title', 'content'],
    //   include:[
    //     {model: UserModel,
    //       attributes:['name'],
    //       as: 'user'
    //     }],
    //   raw: true
    // })

    // return sharedNotes;



    //More test code 

    
    // const data = await this.sharedNote.findAll({

    //   where: { receiver_id: note.user_id },
    //   attributes: ['shared_note_id'],
    //   raw: true
    // })

    // const noteId = data.map((item) => {
    //   const value = item.shared_note_id
    //   return value
    // })
    // console.log(noteId)

    // const receivedNotes = await this.noteModel.findAll({
    //   where: {
    //     id: noteId
    //   },
    //   attributes: ['title', 'content'],
    //   include:[
    //     {model: UserModel,
    //       attributes:['name'],
    //       as: 'user'
    //     }
    //   ],
    //   raw: true
    // })

    // const noteWithUsername= receivedNotes.map((note) => {
    //     const noteObject = Object.assign({}, note);
    //     const username = noteObject['user.name'];
    //     const data = {username,noteObject}
    //     return data
    //   });
    // console.log("Testing",receivedNotes,noteWithUsername)


    // return noteWithUsername;
