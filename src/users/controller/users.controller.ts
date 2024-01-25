import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Redirect,
  Render,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user/create-user.dto';
import { UsersService } from '../services/users.service';
import { UserModel } from 'src/database/models/user.model';

@Controller('users') // /users
export class UsersController {
  constructor(private userService: UsersService) {}
  

  @Render('signup')
  @Get('sign_up')
  public showSignUp() {
    return {
        message: '/sign_up'
    };
  }

  @UsePipes(new ValidationPipe())
  @Redirect('/auth/login')
  @Post('sign_up')
  public async create(@Body() createUser: CreateUserDto): Promise<UserModel> {
    console.log('request data', createUser);
    return this.userService.create(createUser);

  }

  @Get()
  public findOne(@Body() userId: CreateUserDto) {
    console.log(userId);
  }

}
