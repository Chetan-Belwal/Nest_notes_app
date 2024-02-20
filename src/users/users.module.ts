import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './services/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../database/models/user.model';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { HashService } from './services/hash.service';
import { FileController } from './controller/file.controller';
import { FormDataModule } from '../form-data/form-data.module';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel]),
    NestjsFormDataModule,
    FormDataModule,
  ],
  controllers: [UsersController, FileController],
  providers: [UsersService, HashService],
  exports: [UsersService, HashService],
})
export class UsersModule {}
