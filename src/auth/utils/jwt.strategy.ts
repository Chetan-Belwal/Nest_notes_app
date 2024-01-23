import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserLoginDto } from "src/users/dtos/user-login.dto/user-login.dto";
import { AuthService } from "../services/auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private authservice : AuthService){super({
        jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
            return request?.cookies?.user_token}]),
         secretOrKey: 'oksir123'
        });
    }
    
    async validate(payload: UserLoginDto){
        const user = await this.authservice.getByEmail(payload)
        if (!user) {
            throw new UnauthorizedException();
          }
          return user;
        }
}