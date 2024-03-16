import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from 'src/users/dtos/user-login.dto/user-login.dto';
import { UsersService } from '../../users/services/users.service';
import { UserModel } from '../../database/models/user.model';
import { HashService } from '../../users/services/hash.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private hashService: HashService,
  ) {}
  
  // @Command({
  //   command: 'route:list',
  //   describe: 'Returns list of routes registered',
  // })
  public async validateUser({ userLoginDto }: { userLoginDto: UserLoginDto; }) {
    const user: UserModel = await this.userService.findOneByEmail(
      userLoginDto.email,
    );
    console.log('password of the user', user);

    if (user) {
      const match = this.hashService.decodePassword(
        userLoginDto.password,
        user.password,
      );
      console.log(match);
      if (match) {
        const userObj = { user: user.toJSON() };
        const token = this.jwtService.sign(userObj);
        return `Authentication=${token}; HttpOnly; Path=/; Max-Age='1h'`;
      } else {
        const msg = 'Username or password Not matched';
        return msg;
      }
    } else {
      const msg = 'User Not Found';
      return msg;
    }
  }

  public clearCookies() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
