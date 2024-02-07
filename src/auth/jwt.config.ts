import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { jwtConfig } from '../Enviroment/jwt-config';

export const JwtConfigration: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: jwtConfig().secret,
      signOptions: { expiresIn: jwtConfig().expireTime },
    };
  },
};
