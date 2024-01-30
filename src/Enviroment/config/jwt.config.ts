 import { JwtModuleAsyncOptions } from '@nestjs/jwt'
 import { jwtConfig } from "./user.configuration";

export const JwtConfigration : JwtModuleAsyncOptions = {
    useFactory : () => {
        return{
            secret: jwtConfig().secret ,
            signOptions: {expiresIn: jwtConfig().expireTime}
        }
    } 
    
}