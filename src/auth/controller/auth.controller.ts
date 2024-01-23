import {
  Body,
  Controller,
  Get,
  Post,
  Render,
  Req,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserLoginDto } from '../../users/dtos/user-login.dto/user-login.dto';
import { UsersGuard } from '../guard/users.guard';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @UseGuards(UsersGuard)
  @Render('login')
  @Post('login')
  public async login(@Body() userLog: UserLoginDto, @Res() response: Response) {
    const cookie = await this.authService.validateUser(userLog);
    console.log(cookie);
    response.cookie('user_token', cookie);
    userLog.password = undefined;
    return response.send(userLog);
  }

  @UseGuards(JwtAuthGuard)
  @Get('status')
  status(@Req() req: Request) {
    console.log('inside get request');
    return {
      status: 'oke',
    };
  }
}
