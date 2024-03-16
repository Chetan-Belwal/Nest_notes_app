import { Controller, Get, Redirect } from '@nestjs/common';

@Controller()
export class AppController {
    @Redirect('auth/login')
    @Get()
    public func(){}
}
