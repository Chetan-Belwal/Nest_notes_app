import { IsFile, MaxFileSize, HasMimeType, MemoryStoredFile, FileSystemStoredFile } from "nestjs-form-data";

export class FormDataTestDto {

    @IsFile()
    @MaxFileSize(1e6)
    @HasMimeType(['image/jpeg', 'image/png'])
    avatar: FileSystemStoredFile;
    
  }