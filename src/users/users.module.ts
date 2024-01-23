import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './services/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../database/models/user.model';
import { NoteModel } from 'src/database/models/note.model';
import { SharedNotes } from 'src/database/models/shared.notes.model';
import { AuthController } from 'src/auth/controller/auth.controller';
@Module({
  imports: [SequelizeModule.forFeature([ UserModel, NoteModel,SharedNotes ])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
