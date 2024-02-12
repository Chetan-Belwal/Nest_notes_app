import { ApiProperty } from '@nestjs/swagger';
import {
  IsFile,
  MaxFileSize,
  HasMimeType,
  FileSystemStoredFile,
} from 'nestjs-form-data';

export class FormDataTestDto {
  @MaxFileSize(1e6)
  @HasMimeType(['image/jpeg', 'image/png'])
  @IsFile()
  @ApiProperty({type: File, description: "file"})
  public avatar: FileSystemStoredFile;
}
