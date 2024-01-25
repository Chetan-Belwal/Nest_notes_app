import { IsNumber } from "class-validator";

export class DeleteUserDto {
    @IsNumber()
    public id: number
}
