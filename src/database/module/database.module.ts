import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeConfigService } from 'src/Enviroment/config/database.config';
@Module({
     imports: [SequelizeModule.forRootAsync({
        useClass: SequelizeConfigService,
      })],
    providers:[],
    exports:[],
})
export class DatabaseModule {}
