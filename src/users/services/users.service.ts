import { Injectable } from '@nestjs/common';
import { UserModel } from '../../database/models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { encodePassword } from 'src/utils/bcrypt';
import { Storage } from '@squareboat/nest-storage';
import { readFile, readFileSync } from 'fs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel)
    public userModel: typeof UserModel,
  ) { }

  public async create(createUser : Pick<UserModel, 'name' | 'email' | 'password' >) {
    const password = await encodePassword(createUser.password);
    console.log(password);
    
    return await this.userModel
      .build()
      .set({ name: createUser.name, email: createUser.email, password: password })
      .save();
  }

  public async deleteUser(id: number) {
    return await this.userModel.destroy({
      where:{
        id: id
      },
    })
  }

  public async findOne(id: any): Promise<UserModel> {
    // const user_id = id.user_id
    return await this.userModel.findByPk(id);
  }

  public async uploadProfilePicture(user:any,picture:any) {
  console.log(picture)
    await Storage.disk('local').put(picture.originalName,readFileSync(picture.path));
    await this.userModel.update({
      profile_image:picture.originalName
    },{where:{id:user.user_id}})
  }
}
