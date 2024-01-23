import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from 'src/database/models/user.model';
import { NoteModel } from 'src/database/models/note.model';
import { SharedNotes } from 'src/database/models/shared.notes.model';
import { AuthController } from './controller/auth.controller';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './utils/localStrategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './utils/jwt.strategy';

@Module({
  imports: [
    SequelizeModule.forFeature([UserModel, NoteModel, SharedNotes]),
    PassportModule,
    JwtModule.register({
      secret: 'oksir123',
      signOptions: { expiresIn: '1h' },
    }),
  ],

  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
