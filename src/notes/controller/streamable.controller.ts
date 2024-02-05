import { Controller, Get, Redirect, StreamableFile } from '@nestjs/common';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('file')
export class FileController {
  @Redirect('notes/dashboard')
  @Get()
  getFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'storage',''));
    return new StreamableFile(file);
  }
}