import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from 'src/database/models/user.model';
import { UserLoginDto } from 'src/users/dtos/user-login.dto/user-login.dto';
import { decodePassword } from 'src/utils/bcrypt';

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
                    name : user.dataValues.name,
                    email : user.dataValues.email
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



 
  async getByEmail(userData: UserLoginDto) {
    const user = await this.userModel.findOne({ where: {
        email:userData.email
    } });
    if (user) {
      return user;
    }
    throw new HttpException('User with this id does not exist', HttpStatus.NOT_FOUND);
  }

}

