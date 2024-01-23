import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/controller/users.controller';
import {dbConfig} from './Enviroment/config/user.configuration';
import { ConfigModule} from '@nestjs/config';
import { DatabaseModule } from './database/module/database.module';
import { EnvService } from './Enviroment/env.service';
import { UsersService } from './users/services/users.service';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/services/auth.service';
import { AuthController } from './auth/controller/auth.controller';

@Module({
  imports: [UsersModule,ConfigModule.forRoot({
    isGlobal: true,
    load: [dbConfig]
}),DatabaseModule, AuthModule],
  controllers: [AppController,UsersController],
  providers: [AppService,EnvService],
  exports: [EnvService]
})
export class AppModule {}
