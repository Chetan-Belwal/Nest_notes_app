import {  IsNotEmpty, IsNumber } from "class-validator";

export class IdDto {
    @IsNumber()
    @IsNotEmpty()
    public user_id : number
}