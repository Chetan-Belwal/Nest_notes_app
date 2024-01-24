import { Get, Controller, Render, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
  @Redirect('users/sign_up')
  @Get()

  root() {
    return { message: 'Hello world!' };
  }

  @Get('login')
  @Render('logIn')
  login() {
    return { message: 'Hello world!' };
  }

  @Get('dashboard')
  @Render('dashBoard')
  dash() {
    return { message: 'Hello world!' };
  }

  
}