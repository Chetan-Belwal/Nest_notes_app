import { Injectable } from '@nestjs/common';
import {
  SequelizeOptionsFactory,
  SequelizeModuleOptions,
} from '@nestjs/sequelize';
import { ConfigService } from '@nestjs/config';
import { NoteModel } from '../models/note.model';
import { SharedNotesModel } from '../models/shared.notes.model';
import { UserModel } from '../models/user.model';

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  connection: any;
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

  
  public async dropDatabase() {
    return this.connection
      .getQueryInterface()
      .dropDatabase(this.connection.config.database);
  }
}
