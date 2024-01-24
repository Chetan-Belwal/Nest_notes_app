import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/controller/users.controller';
import {dbConfig} from './Enviroment/config/user.configuration';
import { ConfigModule} from '@nestjs/config';
import { DatabaseModule } from './database/module/database.module';
import { EnvService } from './Enviroment/env.service';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/module/notes.module';
import { NotesService } from './notes/services/notes.service';
import { NotesController } from './notes/controller/notes.controller';

@Module({
  imports: [UsersModule,ConfigModule.forRoot({
    isGlobal: true,
    load: [dbConfig]
}),DatabaseModule, AuthModule, NotesModule],
  controllers: [AppController,UsersController],
  providers: [AppService,EnvService],
  exports: [EnvService]
})
export class AppModule {}
