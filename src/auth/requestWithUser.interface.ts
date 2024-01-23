
import { Request } from 'express';
import { UserModel } from 'src/database/models/user.model';
import { UserLoginDto } from 'src/users/dtos/user-login.dto/user-login.dto';
 
interface RequestWithUser extends Request {
  user: UserModel;
}
 
export default RequestWithUser;