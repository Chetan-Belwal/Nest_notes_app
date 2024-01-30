import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../services/auth.service";
import { jwtConfig } from "src/Enviroment/config/user.configuration";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private authservice : AuthService){super({
        jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
            return request?.cookies?.Authentication}]),
         secretOrKey: jwtConfig().secret
        });
    }
    
    async validate(payload: any){
        console.log("jwt service", payload)
        const user = await this.authservice.getById(payload)
        console.log("jwtStrategy",user)
        if (!user) {
            throw new UnauthorizedException();
          }
          return user;
        }
}