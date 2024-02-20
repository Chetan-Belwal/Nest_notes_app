import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashService {
  //Encode the user Password
  public async encodePassword(rawPassword: string) {
    const SALT = await bcrypt.genSalt();
    return await bcrypt.hash(rawPassword, SALT);
  }

  //Decode user password
  public decodePassword(rawPassword: string, hash: string) {
    return bcrypt.compareSync(rawPassword, hash);
  }
}
