import { Module } from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { NotesController } from '../controller/notes.controller';
import { NoteModel } from 'src/database/models/note.model';
import { SequelizeModule } from '@nestjs/sequelize';


@Module({
    imports: [SequelizeModule.forFeature([ NoteModel ])],
    controllers: [NotesController],
    providers: [NotesService],
    
})
export class NotesModule {}
