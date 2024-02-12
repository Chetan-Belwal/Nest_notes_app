import { Injectable } from '@nestjs/common';
import { UserModel } from '../../database/models/user.model';
import { InjectModel } from '@nestjs/sequelize';
import { Storage } from '@squareboat/nest-storage';
import { readFileSync } from 'fs';
import { FileSystemStoredFile } from 'nestjs-form-data';
import { HashService } from './hash.service';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel)
    public userModel: typeof UserModel,
    private hashService: HashService,
  ) {}
  /**
   * Store user details in database
   * @param createUser
   * @returns
   */
  public async create(
    createUser: Pick<UserModel, 'name' | 'email' | 'password'>,
  ): Promise<UserModel> {
    const password = this.hashService.encodePassword(createUser.password);

    return this.userModel
      .build()
      .set({
        name: createUser.name,
        email: createUser.email,
        password: password,
      })
      .save();
  }

  // public async deleteUser(user: UserModel) {
  //   return user.destroy().then(() => null);
  // }

  /**
   * Find a user using id
   * @param id
   * @returns
   */
  public async findOne(id: number): Promise<UserModel> {
    return this.userModel.findByPk(id);
  }

  /**
   * find user using user email
   * @param email
   * @returns
   */
  public async findOneByEmail(email: string): Promise<UserModel> {
    return await this.userModel.findOne({ where: { email } });
  }

  /**
   * Store user profile picture in local and database
   * @param user
   * @param picture
   * @returns
   */
  public async uploadProfilePicture(
    user: UserModel,
    picture: FileSystemStoredFile,
  ) {
    console.log(user);
    const name = `${uuidv4()}${picture.originalName}`;
    console.log(name);
    await Storage.disk('local').put(name, readFileSync(picture.path));
    const user_info = this.findOne(user.id);
    return (await user_info).set({ profile_image: name }).save();
  }

  /**
   * find User picture name from database
   * @param user
   * @returns
   */
  public async findPic(user: UserModel) {
    const data = await this.findOne(user.id);
    const profile_image = data.profile_image;
    console.log(profile_image);
    return profile_image;
  }
}
