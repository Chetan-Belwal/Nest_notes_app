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
  public avatar: FileSystemStoredFile;
}
