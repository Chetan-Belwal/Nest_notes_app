import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeConfigService } from 'src/Enviroment/env.service';
@Module({
     imports: [SequelizeModule.forRootAsync({
        useClass: SequelizeConfigService,
      })],
    providers:[],
    exports:[],
})
export class DatabaseModule {}
