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
import { use } from 'passport';
import { SharedNotesModel } from '../../database/models/shared.notes.model';

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
    @Query('page', new ParseIntPipe({ optional: true })) filterPage: number,
    @Query('limit', new ParseIntPipe({ optional: true })) limit: number,
    @Query('filter') filter: string,
    @Query('filterReqType') reqType: string,
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
        const notes = await this.noteservice.showNotes(user, filterPage, limit);
        const numOfNotes = allNotes.length;
        console.log(numOfNotes, 'length');
        const pages = Math.ceil(numOfNotes / limit);
        const numberOfPages = [];
        const next = [filterPage + 1];
        const previous = [filterPage - 1];
        for (let i = 1; i <= pages; i++) {
          numberOfPages.push(i);
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
        switch (reqType) {
          case 'notes': {
            const notes: NoteModel[] = await this.noteservice.filterNote(filter, user);
            console.log(notes, 'notesssss');
            return { notes };
          }

          case 'sender': {
            const receivedNotes: SharedNotesModel[] = await this.noteservice.filterBySender(
              filter,
              user,
            );
            return { receivedNotes };
          }

          case 'receiver': {
            const sharedNotes: SharedNotesModel[] = await this.noteservice.filterByReceiver(
              filter,
              user,
            );
            return { sharedNotes };
          }
          default: {
            return {};
          }
        }
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
  public async deleteNote(
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
  @Redirect(`notes/dashboard?filter=`)
  @UseGuards(JwtAuthGuard)
  @Post('filter')
  public async filterNote(@Body() filterNote,@Query('filterReqType') filterReqType: string) {
    const noteDesc = filterNote.filter;
    console.log(filterReqType);
    return {
      url: `dashboard?filter=${noteDesc}&filterReqType=${filterReqType}`,
    };
  }
}
