import { Controller } from '@nestjs/common';
import { NotifictionService } from './notifiction.service';

@Controller('notifiction')
export class NotifictionController {
  constructor(private readonly notifictionService: NotifictionService) {}
}
