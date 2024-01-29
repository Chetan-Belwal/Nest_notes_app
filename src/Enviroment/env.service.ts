import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModuleOptions, SequelizeOptionsFactory } from '@nestjs/sequelize';
import { NoteModel } from 'src/database/models/note.model';
import { SharedNotesModel } from 'src/database/models/shared.notes.model';
import { UserModel } from 'src/database/models/user.model';

@Injectable()
export class EnvService {
    constructor(private configService: ConfigService){}
    get port(): number{
        return this.configService.get<number>('port') ; 
    }

    get host(): string {
        return this.configService.get<string>('database.host')  
    }

    get port_db(): number {
        return this.configService.get<number>('database.port_db')  
    }

    get password(): string {
        return this.configService.get<string>('database.password')  
    }

    get username(): string {
        return this.configService.get<string>('database.username')  
    }

    get database(): string {
        return this.configService.get<string>('database.database')  
    }

    get secret(): string {
        return this.configService.get<string>('jwt.secret')  
    }

    get expire_time(): string {
        return this.configService.get<string>('jwt.expire_time')  
    }

}

@Injectable()
export class SequelizeConfigService extends EnvService implements SequelizeOptionsFactory {
  createSequelizeOptions(): SequelizeModuleOptions {
    return {
      dialect: 'mysql',
      host: this.host,
      port: this.port_db,
      username: this.username,
      password: this.password,
      database: this.database,
      models: [UserModel,NoteModel,SharedNotesModel],
    };
  }
}
