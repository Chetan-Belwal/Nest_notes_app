import { Module } from '@nestjs/common';
import { NotifictionService } from './notifiction.service';
import { NotifictionController } from './notifiction.controller';

@Module({
  controllers: [NotifictionController],
  providers: [NotifictionService],
})
export class NotifictionModule {}
