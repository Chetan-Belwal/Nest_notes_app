import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/database/models/user.model';
import { NoteModel } from 'src/database/models/note.model';
import { AuthController } from './controller/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './utils/localStrategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './utils/jwt.strategy';
import { JwtConfigration } from 'src/auth/jwt.config';
import { UsersModule } from '../users/users.module';

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
