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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { NotesDto } from 'src/users/dtos/notes-dto/notes.dto';
import { User } from 'src/user.decorator';
import { UpdateNotesDto } from '../dto/updateNotes.dto';
import { MapToNotePipe } from '../pipes/map-to-note/map-to-note.pipe';
import { NoteModel } from 'src/database/models/note.model';
import { NotesSharingService } from '../services/notes-sharing.service';
import { UserModel } from '../../database/models/user.model';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@ApiTags('notes')
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
    @User() user: UserModel,
    @Query('shared') share: 'all' | 'withMe' | 'byMe',
  ) {
    console.log('Message', user);
    if (share === 'withMe') {
      const receivedNotes = await this.noteservice.showMyReceivedNotes(user);
      return { receivedNotes };
    } else if (share === 'byMe') {
      const sharedNotes = await this.noteservice.showMySharedNotes(user);
      return { sharedNotes };
    } else {
      const notes: NoteModel[] = await this.noteservice.showNotes(user);
      return { notes };
    }
  }

  @Redirect('/notes/dashboard')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @ApiBody({type:NotesDto})
  @Post('dashboard')
  public async saveNotes(
    @Body() noteContent: NotesDto,
    @User() userId: UserModel,
  ) {
    return await this.noteservice.saveNote(userId, noteContent);
  }

  @Redirect('/notes/dashboard')
  @Delete(':id')
  public async delete_user(
    @Param('id', ParseIntPipe, MapToNotePipe) note: NoteModel,
  ) {
    return this.noteservice.deleteNote(note);
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
  @ApiBody({type: UpdateNotesDto})
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
    @User() user: UserModel,
    @Param('id', ParseIntPipe) noteId: NoteModel,
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
    @User() user: UserModel,
    @Param('note_id', ParseIntPipe) note_id: number,
    @Param('user_id', ParseIntPipe) user_id: number,
  ) {
    await this.shareService.saveShareInfo(user, user_id, note_id);
  }
}
