import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

//Guards Protect our API Routes
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
