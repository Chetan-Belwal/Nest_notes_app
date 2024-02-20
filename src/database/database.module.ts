import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SequelizeConfigService } from './services/sequelize-config.service';
@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useClass: SequelizeConfigService,
    })
  ],
  providers: [SequelizeConfigService],
  exports: [],
})
export class DatabaseModule {}
