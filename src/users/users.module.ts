import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './services/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../database/models/user.model';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { FormDataModule } from 'src/form-data/form-data.module';


@Module({
  imports: [SequelizeModule.forFeature([ UserModel]),NestjsFormDataModule,FormDataModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
