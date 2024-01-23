import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('signup')
  @Render('signup')
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