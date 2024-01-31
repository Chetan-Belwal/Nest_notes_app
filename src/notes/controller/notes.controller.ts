import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Redirect,
  Render,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { NotesDto } from 'src/users/dtos/notes-dto/notes.dto';
import { User } from 'user.decorator';
import { UpdateNotesDto } from '../dto/updateNotes.dto';
import { MapToNotePipe } from '../pipes/map-to-note/map-to-note.pipe';
import { NoteModel } from 'src/database/models/note.model';
import { NotesSharingService } from '../services/notes-sharing.service';
import { Observable, of } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');

@Controller('notes')
export class NotesController {
  constructor(
    private noteservice: NotesService,
    private shareService: NotesSharingService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Render('dashBoard')
  @Get('dashboard')
  public async displayNotes(
    @User() user: any,
    @Query('shared') share: 'all' | 'withMe' | 'byMe',
  ) {
    if (share === 'withMe') {
      const receivedNotes = await this.noteservice.showMyReceivedNotes(user);
      return { receivedNotes };
    } else if (share === 'byMe') {
      const sharedNotes = await this.noteservice.showMySharedNotes(user);
      return { sharedNotes };
    } else {
      const notes :NoteModel[] = await this.noteservice.showNotes(user);
      return { notes };
    }
  }

  @Redirect('/notes/dashboard')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Post('dashboard')
  public async saveNotes(
    @Body() noteContent: NotesDto,
    @User('user_id') userId: number,
  ) {
    return await this.noteservice.saveNote(userId, noteContent);
  }

  @Redirect('/notes/dashboard')
  @Delete(':id')
  public async delete_user(
    @Param('id', ParseIntPipe, MapToNotePipe) note: NoteModel,) {
    return this.noteservice.delete_note(note);
  }


  @Render('notesEditor')
  @Get(':id')
  public updateNoteForm(
    @Query() queryData: any,
    @Param('id', ParseIntPipe, MapToNotePipe) note: NoteModel,
  ) {
    console.log(queryData, 'data');
    return { note: note.toJSON() };
  }

  @Put(':id')
  @Redirect('/notes/dashboard')
  public async editAndSave(
    @Param('id', ParseIntPipe, MapToNotePipe) note: NoteModel,
    @Body() data: UpdateNotesDto,
  ): Promise<UpdateNotesDto> {
    return this.noteservice.updateNotes(note, data);
  }


  @UseGuards(JwtAuthGuard)
  @Render('shareNotes')
  @Get('/share/:id')
  public async shareNotes(
    @User() user: any,
    @Param('id', ParseIntPipe) noteId: number,
  ) {
    console.log(noteId);
    const data = await this.shareService.getAll(noteId, user);
    console.log(data);
    return { data };
  }

  @UseGuards(JwtAuthGuard)
  @Redirect('/notes/dashboard')
  @Post('save/share/:note_id/:user_id')
  public async shareInfo(
    @User() user: any,
    @Param('note_id', ParseIntPipe) note_id: number,
    @Param('user_id', ParseIntPipe) user_id: number,
  ) {
    const sender_id = user.user_id;
    console.log(sender_id, 'sender_id');
    await this.shareService.saveShareInfo(user, user_id, note_id);
  }

  @Redirect('/notes/dashboard')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file',{
    storage:diskStorage({
      destination:'./uploads/pfp',
      filename:(req,file,cb) =>{
        const filename: string = path.parse(file.originalname).name.replace(/\s/g,'')
        const fileExtention: string = path.parse(file.originalname).ext

        cb(null,`${filename} ${fileExtention}`)
      }

    })
  }))
  @Post('/upload')
  uploadFile(@UploadedFile() file: Express.Multer.File): Observable<Object>{
    console.log(file,"file")
    return of({imagePath:file.filename})

  }
 


}
