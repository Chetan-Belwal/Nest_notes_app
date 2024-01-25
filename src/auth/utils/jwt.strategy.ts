import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Request } from "express";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../services/auth.service";
import { IdDto } from "../services/dto/id.dto";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private authservice : AuthService){super({
        jwtFromRequest: ExtractJwt.fromExtractors([(request: Request) => {
            return request?.cookies?.Authentication}]),
         secretOrKey: 'oksir123'
        });
    }
    
    async validate(payload: IdDto){
        console.log("jwt service", payload)
        const user = await this.authservice.getById(payload)
        console.log("jwtStrategy",user)
        if (!user) {
            throw new UnauthorizedException();
          }
          return user;
        }
}