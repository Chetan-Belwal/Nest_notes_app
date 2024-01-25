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
import { User } from 'user.decorator';
import { DeleteUserDto } from '../dto/delete-user.dto/delete-user.dto';
import { Transform } from 'class-transformer';
import { UpdateNotesDto } from '../dto/updateNotes.dto';
import { MapToNotePipe } from '../pipes/map-to-note/map-to-note.pipe';
import { NoteModel } from 'src/database/models/note.model';

@Controller('notes')
export class NotesController {
  constructor(private noteservice: NotesService) {}

  @Redirect('notes/dashboard')
  @UsePipes(new ValidationPipe())
  @UseGuards(JwtAuthGuard)
  @Post()
  public async saveNotes(@Body() noteContent: NotesDto, @User('user_id') userId: number)  {
    return await this.noteservice.saveNote(userId, noteContent);
  }

  @UseGuards(JwtAuthGuard)
  @Render('dashBoard')
  @Get('dashboard')
  public async displayNotes(@User() user: any ) {
    console.log('This is a Error : ', user);
    const user_id = user;
    const data = await this.noteservice.showNotes(user_id);
    console.log("data to be shown in the table" , data)
    return {data} ;
  }

  @Redirect('/notes/dashboard')
  @Delete(':id')
  public async delete_user(@Param('id', ParseIntPipe, MapToNotePipe) note: NoteModel ) {
    return this.noteservice.delete_note(note);
  }
 
  @Put(':id')
  @UsePipes()
  @Redirect('/notes/dashboard')
  public async editAndSave(@Param('id', ParseIntPipe, MapToNotePipe)note: NoteModel, @Body() data: UpdateNotesDto ):Promise<UpdateNotesDto> {
    return this.noteservice.updateNotes(note, data);
  }

  @Render('notesEditor')
  @Get(':id')
  public updateNoteForm(@Query() queryData: any,  @Param('id', ParseIntPipe, MapToNotePipe) note : NoteModel){
    
    console.log(queryData, "data")
    return {note: note.toJSON()}
  }

  // @Post('edit')

  
}
