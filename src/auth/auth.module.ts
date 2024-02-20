import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthController } from './controller/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './utils/localStrategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './utils/jwt.strategy';
import { UsersModule } from '../users/users.module';
import { NoteModel } from '../database/models/note.model';
import { UserModel } from '../database/models/user.model';
import { JwtConfigration } from './jwt.config';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel, NoteModel]),
    PassportModule,
    JwtModule.registerAsync(JwtConfigration),
    UsersModule,
  ],

  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
