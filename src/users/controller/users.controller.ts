import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user/create-user.dto';
import { UsersService } from '../services/users.service';
import { UserModel } from 'src/database/models/user.model';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { User } from 'src/user.decorator';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { FormDataTestDto } from '../dtos/form-data.dto';

@Controller('users') // /users
export class UsersController {
  constructor(private userService: UsersService) {}

  @Render('signup')
  @Get('sign_up')
  public showSignUp() {
    return {
      message: '/sign_up',
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

  @Redirect('/notes/dashboard')
  @UseGuards(JwtAuthGuard)
  @FormDataRequest({ storage: FileSystemStoredFile })
  @UsePipes(new ValidationPipe())
  @Post('/upload')
  public async uploadProfilePicture(
    @Body() picture: FormDataTestDto,
    @User() user: UserModel,
  ): Promise<UserModel> {
    console.log('Test', picture.avatar);
    await this.userService.uploadProfilePicture(user, picture.avatar);
    return user;
  }
}
