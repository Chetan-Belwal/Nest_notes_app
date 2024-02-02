import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/controller/users.controller';
import { dbConfig } from './Enviroment/config/user.configuration';
import filesystem from './Enviroment/config/file-storage.config';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/module/database.module';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/module/notes.module';
import { MailModule } from './mail/mail.module';
import { FileStorageModule } from './file-storage/file-storage.module';
import {  StorageModule } from '@squareboat/nest-storage';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { FormDataModule } from './form-data/form-data.module';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [dbConfig,filesystem],
    }),
    DatabaseModule,
    AuthModule,
    NotesModule,
    MailModule,
    FileStorageModule,
    StorageModule,
    NestjsFormDataModule,
    FormDataModule
  ],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
