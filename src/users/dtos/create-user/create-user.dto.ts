import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsString()
  public email: string;

  @IsString()
  public password: string;
}
