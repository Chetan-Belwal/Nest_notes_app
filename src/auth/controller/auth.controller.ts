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
import { UsersGuard } from '../guard/users.guard';
import { Request, Response } from 'express';
import { User } from 'user.decorator';
import { JwtAuthGuard } from '../guard/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Render('logIn')
  @Get('login')
  logInPage(@Req() req: Request) {
    console.log('inside get request');
  }

  @Redirect('/notes/dashboard')
  @UsePipes(new ValidationPipe())
  @UseGuards(UsersGuard)
  @Post('login')
  public async login(
    @User() user,
    @Res() response: Response,
  ) {
    console.log("test", user)
    const cookie = user;
    response.setHeader('Set-Cookie', cookie);
  }

  @UseGuards(JwtAuthGuard)
  @Redirect('/auth/login')
  @Get('log_out')
  public async logOut(@Res() res: Response){
    const cookie = this.authService.clearCookies();
    res.setHeader('Set-Cookie', cookie)
  }
}
