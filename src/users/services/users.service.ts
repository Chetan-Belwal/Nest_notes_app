import { Injectable } from '@nestjs/common';
import { UserModel } from '../../database/models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from 'src/users/dtos/create-user/create-user.dto';
import { encodePassword } from 'src/utils/bcrypt';
import { where } from 'sequelize';
import { NoteModel } from 'src/database/models/note.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
  ) { }

  public async create(createUser : CreateUserDto) {
    const password = await encodePassword(createUser.password);
    console.log(password);
    
    return await this.userModel
      .build()
      .set({ name: createUser.name, email: createUser.email, password: password })
      .save();
  }

  public async deleteId(id: number) {
    return await this.userModel.destroy({
      where:{
        id: id
      },
    })
  }


  public async updateOne(user:any,profile_image : string){
     await this.userModel.update({
      profile_image:profile_image
    },{where:{id:user}})
    
  }

  public async findOne(id: any): Promise<UserModel> {
    // const user_id = id.user_id
    return await this.userModel.findByPk(id);
  }
}
