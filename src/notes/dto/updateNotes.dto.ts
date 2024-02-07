import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateNotesDto {
  @IsNumber()
  @IsNotEmpty()
  public id: number;

  @IsString()
  @IsNotEmpty()
  public title: string;

  @IsString()
  @IsNotEmpty()
  public content: string;
}
