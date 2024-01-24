import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Redirect,
  Render,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { NotesDto } from 'src/users/dtos/notes-dto/notes.dto';
import { User } from 'user.decorator';
import { UserLoginDto } from 'src/users/dtos/user-login.dto/user-login.dto';

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
    return { data };
  }

  // @Redirect('/auth/dashboard')
  // @UsePipes(new ValidationPipe())
  // @UseGuards(JwtAuthGuard)
  // @Get('display_notes')
  // public async displayNotes(@Req() req: Request) {
  //     console.log("This is a Error : ",req.user)
  //     const user_id = req.user
  //     const data = await this.noteservice.showNotes(user_id);
  //     console.log("controller of notes", ...data);
  //     return {data};
  // }
}
