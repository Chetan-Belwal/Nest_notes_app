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
import { UpdateNotesDto } from '../dto/updateNotes.dto';
import { MapToNotePipe } from '../pipes/map-to-note/map-to-note.pipe';
import { NotesSharingService } from '../services/notes-sharing.service';
import { UserModel } from '../../database/models/user.model';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guard/jwt.guard';
import { NoteModel } from '../../database/models/note.model';
import { User } from '../../user.decorator';
import { NotesDto } from '../../users/dtos/notes-dto/notes.dto';

@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(
    private noteservice: NotesService,
    private shareService: NotesSharingService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Render('dashBoard')
  @Get('dashboard')
  public async displayNotes(
    @User() user: UserModel,
    @Query('shared') share: 'all' | 'withMe' | 'byMe',
    @Query('page', new ParseIntPipe({ optional: true })) page: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
    @Query('filter', new ParseIntPipe({ optional: true })) filter: number,


  ) {
    console.log('Message', share);
    if (share === 'withMe') {
      const receivedNotes = await this.noteservice.showMyReceivedNotes(user);
      return { receivedNotes };
    } else if (share === 'byMe') {
      const sharedNotes = await this.noteservice.showMySharedNotes(user);
      return { sharedNotes };
    } else {
      if (filter === undefined || null) {
        const allNotes = await this.noteservice.findAll(user.id);
        const notes = await this.noteservice.showNotes(user, page, limit);
        const numOfNotes = allNotes.length;
        console.log(numOfNotes, "length")
        const pages = Math.ceil(numOfNotes / limit)
        const numberOfPages = [];
        const next = [page + 1]
        const previous = [page - 1]
        for (let i = 1; i <= pages ; i++) {
          numberOfPages.push(i)
        }
        if (next[0] <= pages && previous[0] > 0) {
          return { notes, numberOfPages, next, previous };
        } else if (next[0] <= pages) {
          return { notes, numberOfPages, next };
        } else if (previous[0] > 0) {
          return { notes, numberOfPages, previous };
        } else {
          return { notes, numberOfPages };
        }
      } else {
        const notes = await this.noteservice.findNote(filter)
        console.log(notes)
        return { notes }
      }


    }
  }

  @Redirect('/notes/dashboard?limit=2&page=1')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: NotesDto })
  @Post('dashboard')
  public async saveNotes(
    @Body() noteContent: NotesDto,
    @User() userId: UserModel,
  ) {
    return await this.noteservice.saveNote(userId, noteContent);
  }

  @Redirect('/notes/dashboard?limit=2&page=1')
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
  @Redirect('/notes/dashboard?limit=2&page=1')
  @ApiBody({ type: UpdateNotesDto })
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
  @Redirect('/notes/dashboard?limit=2&page=1')
  @Post('save/share/:note_id/:user_id')
  public async shareInfo(
    @User() user: UserModel,
    @Param('note_id', ParseIntPipe) note_id: number,
    @Param('user_id', ParseIntPipe) user_id: number,
  ) {
    await this.shareService.saveShareInfo(user.id, user_id, note_id);
  }
}
