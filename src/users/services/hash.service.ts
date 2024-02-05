import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashService {

    public encodePassword(rawPassword: string) {
        const SALT = bcrypt.genSaltSync();
        return bcrypt.hashSync(rawPassword,SALT);
    }
    
   public decodePassword(rawPassword: string , hash: string){
        return bcrypt.compareSync(rawPassword, hash);
    }
}
