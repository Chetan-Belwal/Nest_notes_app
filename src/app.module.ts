import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/controller/users.controller';
import {dbConfig} from './Enviroment/config/user.configuration';
import { ConfigModule} from '@nestjs/config';
import { DatabaseModule } from './database/module/database.module';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/module/notes.module';
import { NotesSharingService } from './notes/services/notes-sharing.service';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [UsersModule,ConfigModule.forRoot({
    isGlobal: true,
    load: [dbConfig]
}),DatabaseModule, AuthModule, NotesModule, MailModule],
  controllers: [AppController,UsersController],
  providers: [AppService],
})
export class AppModule {}
