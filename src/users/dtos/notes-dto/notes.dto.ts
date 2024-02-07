import { IsNotEmpty, IsString } from 'class-validator';

export class NotesDto {
  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public content: string;
}
