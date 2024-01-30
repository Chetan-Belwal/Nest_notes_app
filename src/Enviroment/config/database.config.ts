import { Injectable } from "@nestjs/common";
import { SequelizeOptionsFactory, SequelizeModuleOptions } from "@nestjs/sequelize";
import { NoteModel } from "src/database/models/note.model";
import { SharedNotesModel } from "src/database/models/shared.notes.model";
import { UserModel } from "src/database/models/user.model";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class SequelizeConfigService implements SequelizeOptionsFactory {
  constructor(private configService : ConfigService){}
  public createSequelizeOptions(): SequelizeModuleOptions {
    return {
      dialect: 'mysql',
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port_db'),
      username:this.configService.get<string>('database.username'),
      password: this.configService.get<string>('database.password'),
      database: this.configService.get<string>('database.database'),
      models: [UserModel,NoteModel,SharedNotesModel],
    };
  }
}
