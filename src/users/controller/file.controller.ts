import {
  Controller,
  Get,
  Header,
  StreamableFile,
  UseGuards,
} from '@nestjs/common';
import { Storage } from '@squareboat/nest-storage';
import { JwtAuthGuard } from '../../auth/guard/jwt.guard';
import { User } from '../../user.decorator';
import { UserModel } from '../../database/models/user.model';
import { UsersService } from '../services/users.service';
import { createReadStream } from 'node:fs';
import { join } from 'node:path';

@Controller('file')
export class FileController {
  constructor(private userService: UsersService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  @Header('Content-Disposition', 'inline')
  public async getFile(@User() user: UserModel): Promise<StreamableFile> {
    const image = await this.userService.findPic(user);
    if (!!image) {
      const imageBuffer = await Storage.disk('local').get(image);
      return new StreamableFile(imageBuffer);
    } else {
      const file = createReadStream(
        join(process.cwd(), 'public', 'Images', 'avatar-1577909_640.png'),
      );
      return new StreamableFile(file);
    }
  }
}
