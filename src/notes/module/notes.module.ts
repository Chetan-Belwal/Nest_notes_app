import { Module } from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { NotesController } from '../controller/notes.controller';
import { NoteModel } from 'src/database/models/note.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotesSharingService } from '../services/notes-sharing.service';
import { UserModel } from 'src/database/models/user.model';
import {  SharedNotesModel } from 'src/database/models/shared.notes.model';


@Module({
    imports: [SequelizeModule.forFeature([ NoteModel, UserModel, SharedNotesModel])],
    controllers: [NotesController],
    providers: [NotesService, NotesSharingService],
    
})
export class NotesModule {}
