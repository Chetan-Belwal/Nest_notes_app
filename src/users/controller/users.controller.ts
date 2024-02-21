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
import { FormDataTestDto } from '../dtos/form-data.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { UserModel } from '../../database/models/user.model';
import { JwtAuthGuard } from '../../auth/guard/jwt.guard';
import { FormDataRequest, FileSystemStoredFile } from 'nestjs-form-data';
import { User } from '../../user.decorator';

@ApiTags('users')
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
  @ApiBody({type:CreateUserDto})
  public async create(@Body() createUser: CreateUserDto): Promise<UserModel> {
    console.log('request data', createUser);
    return this.userService.create(createUser);
  }

  @Get()
  public findOne(@Body() userId: CreateUserDto) {
    console.log(userId);
  }

  @Redirect('/notes/dashboard?limit=2&page=1')
  @UseGuards(JwtAuthGuard)
  @FormDataRequest({ storage: FileSystemStoredFile })
  @UsePipes(new ValidationPipe())
  @Post('/upload')
  @ApiBody({type: FormDataTestDto})
  public async uploadProfilePicture(
    @Body() picture: FormDataTestDto,
    @User() user: UserModel,
  ): Promise<UserModel> {
    console.log('Test', picture.avatar);
    await this.userService.uploadProfilePicture(user, picture.avatar);
    return user;
  }
}
