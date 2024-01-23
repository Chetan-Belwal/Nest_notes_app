import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

//Guards Protect our API Routes
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt'){}
