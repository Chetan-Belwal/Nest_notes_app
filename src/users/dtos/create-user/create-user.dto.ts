import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({type: String, description: "Username"})
  public name: string;

  @IsString()
  @ApiProperty({type: String, description: "Email"})
  public email: string;

  @IsString()
  @ApiProperty({type: String, description: "Password"})
  public password: string;
}
