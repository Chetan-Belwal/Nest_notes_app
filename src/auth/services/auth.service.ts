import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from 'src/database/models/user.model';
import { UserLoginDto } from 'src/users/dtos/user-login.dto/user-login.dto';
import { decodePassword } from 'src/utils/bcrypt';
import { IdDto } from './dto/id.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(UserModel)
        private userModel: typeof UserModel, private jwtService: JwtService
      ) {}
    
    public async validateUser(UserLoginDto:UserLoginDto){
        console.log("inside validate user service");
        console.log(UserLoginDto.email);
        const user = await this.userModel.findOne({where:{
            email: UserLoginDto.email
        }})
        console.log(user.dataValues.password)
        

        if(user){
            const match = decodePassword(UserLoginDto.password, user.dataValues.password);
            console.log(match)
            if(match){
                const userObj = {
                    user_id : user.dataValues.id,
                }
                return this.jwtService.sign(userObj);
                 
            }else{
                const msg = "Username or password Not matched";
                return msg;
            }
           
        }else{
            const msg = "User Not Found";
            return msg;
        }
    }



 
  async getById(userData: IdDto) {
    console.log(userData.user_id)
    const user = await this.userModel.findOne({ where: {
        id:userData.user_id
    }, raw: true});

    if (user) {
        const userObj = {
            user_id : user.id
        }
      return userObj ;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }

}

