import { Body, Controller, Delete, Get, Post, Redirect, Render, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user/create-user.dto';
import { UsersService } from '../services/users.service';
import { DeleteUserDto } from '../dtos/delete-user.dto/delete-user.dto';


@Controller('users') // /users
export class UsersController {

    constructor( private userService: UsersService){}
    // @Redirect('http://localhost:3000/users/post')
    @Render('signup')
    @Get('sign_up')
    public showSignUp(){
        return {};
    }
   
    @Redirect('/post')
    @UsePipes(new ValidationPipe())
    @Post('post')
    public async create(@Body() createUser:CreateUserDto){
        await this.userService.create(createUser);
    }
   
    @Get()
    public findOne(@Body() userId: CreateUserDto){
        console.log(userId)
    }

    @Delete()
    public async delete_user(@Body() userId: DeleteUserDto){
        await this.userService.deleteId(userId.id);
    }

}


