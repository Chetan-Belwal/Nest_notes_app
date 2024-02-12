import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class NotesDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: String, description:"title of notes"})
  public title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: String, description: "content of the note"})
  public content: string;
}
