import { Injectable } from '@nestjs/common';
import {
  SequelizeOptionsFactory,
  SequelizeModuleOptions,
} from '@nestjs/sequelize';
import { NoteModel } from 'src/database/models/note.model';
import { SharedNotesModel } from 'src/database/models/shared.notes.model';
import { UserModel } from 'src/database/models/user.model';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private configService: ConfigService) {}
  public createSequelizeOptions(): SequelizeModuleOptions {
    const dbConfig = this.configService.get('database');
    return {
      dialect: 'mysql',
      host: dbConfig.db_host,
      port: dbConfig.db_port,
      username: dbConfig.db_username,
      password: dbConfig.db_password,
      database: dbConfig.db_name,
      models: [UserModel, NoteModel, SharedNotesModel],
    };
  }
}
