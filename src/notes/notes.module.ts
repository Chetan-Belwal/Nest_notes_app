import { Module } from '@nestjs/common';
import { NotesService } from './services/notes.service';
import { NotesController } from './controller/notes.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotesSharingService } from './services/notes-sharing.service';
import { UsersModule } from '../users/users.module';
import { NoteModel } from '../database/models/note.model';
import { SharedNotesModel } from '../database/models/shared.notes.model';
import { UserModel } from '../database/models/user.model';
import { MailModule } from '../mail/mail.module';
@Module({
  imports: [
    SequelizeModule.forFeature([NoteModel, UserModel, SharedNotesModel]),
    MailModule,
    UsersModule,
  ],
  controllers: [NotesController],
  providers: [NotesService, NotesSharingService],
  exports:[NotesService,NotesSharingService]
})
export class NotesModule {}
