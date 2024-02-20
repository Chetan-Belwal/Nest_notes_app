import { Module } from '@nestjs/common';
import { NotesCliService } from './notes-cli.service';
import { CommandRunnerModule } from 'nest-commander';
import { NotesModule } from '../notes/notes.module';
import { UserCliService } from './user-cli/user-cli.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports:[NotesModule,UsersModule],
  providers: [NotesCliService,CommandRunnerModule, UserCliService]
})
export class CliCommandsModule {}
