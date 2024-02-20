#!/usr/bin/env node
import { CommandFactory } from 'nest-commander';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  console.log('inside cli');
  await CommandFactory.run(AppModule,['error','warn']);
}
bootstrap();
