import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
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
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Render('logIn')
  @Get('login')
  logInPage(@Req() req: Request) {
    console.log('inside get request');
  }

  @Redirect('dashboard')
  @UsePipes(new ValidationPipe())
  @UseGuards(UsersGuard)
  @Post('login')
  public async login(
    @Req() req: Request,
    @Res() response: Response,
  ) {
    console.log("test",req.user)
    const cookie = req.user;
    console.log(cookie);
    response.cookie('user_token', cookie);
  }

  @UseGuards(JwtAuthGuard)
  @Render('dashBoard')
  @Get('dashboard')
  status(@Req() req: Request) {
    console.log('inside get request');
    return {
      status: 'oke',
    };
  }
}
