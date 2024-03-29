import {
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UsersGuard } from '../guard/users.guard';
import { Response } from 'express';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../../user.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Render('logIn')
  @Get('login')
  logInPage() {
    console.log('inside get request');
    return {};
  }

  @Redirect('/notes/dashboard?limit=2&page=1')
  @UsePipes(new ValidationPipe())
  @UseGuards(UsersGuard)
  @Post('login')
  public async login(@User() user: any, @Res() response: Response) {
    console.log('test', user);
    const cookie = user;
    response.setHeader('Set-Cookie', cookie);
  }

  @UseGuards(JwtAuthGuard)
  @Redirect('/auth/login')
  @Get('log_out')
  public async logOut(@Res() res: Response) {
    const cookie = this.authService.clearCookies();
    res.setHeader('Set-Cookie', cookie);
  }
}
