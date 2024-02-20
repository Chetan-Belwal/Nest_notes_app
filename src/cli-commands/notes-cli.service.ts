import { Injectable, Options } from '@nestjs/common';
import { Command, CommandRunner, Option } from 'nest-commander';
import { NotesService } from '../notes/services/notes.service';
import { NotesSharingService } from '../notes/services/notes-sharing.service';


@Injectable()
@Command({
    name:'note',
    arguments:'[create][get][delete][update] [share]',
    description:'get notes data',
})
export class NotesCliService extends CommandRunner {
    constructor(private noteService:NotesService,private shareNote: NotesSharingService){super()}
    public async run(passedParams: string[], options?: Record<string, any>): Promise<void> {
        //Find A Note
        if(passedParams[0]==='get'){
            const data =  await this.noteService.findOne(options.note);
            console.log("Note Title : ",data.content)
            console.log("Note Content : ",data.content)
        }

        // Delete A note
        if(passedParams[0]==='delete'){
            const note = await this.noteService.findOne(options.note);
            if (note === null){
                console.log(">> Note Doesn't Exists");
            }else{
                await this.noteService.deleteNote(note);
                console.log(">> Note Deleted Succesfully");
            }
           
        }

        //create a note
        if(passedParams[0]==='create'){
            const user = options.user;
            const title = options.title;
            const content = options.content;
            const note = {
                title :title,
                content: content
            }
            await this.noteService.saveNote(user,note);
            console.log(">> Note Created Succesfully");
        }

        // Update note
        if(passedParams[0]==='update'){
            const title = options.title;
            const content = options.content;
            const noteData = {
                title :title,
                content: content
            }
            const note = await this.noteService.findOne(options.note);
            await this.noteService.updateNotes(note,noteData)
            console.log(">> Note updated succesfully")
        }

        //share note
        if(passedParams[0]==='share'){
            const sender = options.sender;
            const receiver = options.receiver;
            const noteId = options.note

            await this.shareNote.saveShareInfo(sender,receiver,noteId);
            console.log('>> Note shared succesfully')
        }

        console.log("Options",options)


        return Promise.resolve(undefined);
    }

    @Option({
        flags:'-u,--user [user]',
        description: 'User Id'
    })
    public parseUserId(number: number): number{
        return Number(number)
    }

    @Option({
        flags:'-n,--note [note]',
        description: 'Note id'
    })
    public parseNoteId(number: number): number{
        return Number(number)
    }

    @Option({
        flags:'-t,--title [content]',
        description: 'note title',

    })
    public parseTitle(title: string): string{
        console.log(title)
        return String(title)
    }

    @Option({
        flags:'-c,--content [content]',
        description: 'note content'
    })
    public parseContent(content: string): string{
        return String(content)
    }

    @Option({
        flags:'-s,--sender [sender]',
        description: 'sender Id'
    })
    public parseSenderId(number: number): number{
        return Number(number)
    }

    @Option({
        flags:'-r,--receiver [sender]',
        description: 'receiver Id'
    })
    public parseReceiverId(number: number): number{
        return Number(number)
    }


    
}