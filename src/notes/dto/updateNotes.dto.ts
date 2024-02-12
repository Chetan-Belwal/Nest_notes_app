import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateNotesDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({type: Number, description:"ID"})
  public id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: String, description: "Title of the note"})
  public title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({type: String, description: "content of the note"})
  public content: string;
}
