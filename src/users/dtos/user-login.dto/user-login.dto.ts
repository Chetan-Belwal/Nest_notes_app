import { IsNotEmpty, IsString } from "class-validator";

export class UserLoginDto {

    @IsNotEmpty()
    @IsString()
    public email: string

    @IsNotEmpty()
    @IsString()
    public password: string

}
