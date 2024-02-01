import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Injectable()
export class MapToUserPipe implements PipeTransform {
  constructor(private userService: UsersService){}
  transform(id: any, metadata: ArgumentMetadata) {
    console.log("userID",id)
   
    const user =  this.userService.findOne(id)
    if(!user){
      throw new NotFoundException();
    }
    return user;
  }
}
