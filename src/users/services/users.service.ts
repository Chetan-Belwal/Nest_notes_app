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

  public async deleteUser(user: UserModel) {
    return user.destroy().then(() => null);
  }

  public async findOne(id: number): Promise<UserModel> {
    return this.userModel.findByPk(id);
  }

  public async findOneByEmail(email: string): Promise<UserModel> {
    return this.userModel.findOne({ where: { email } });
  }

  public async uploadProfilePicture(
    user: UserModel,
    picture: FileSystemStoredFile,
  ) {
    console.log(user);
    const name = `${uuidv4()}${picture.originalName}`;
    console.log(name);
    await Storage.disk('local').put(
      picture.originalName,
      readFileSync(picture.path),
    );
    return user.set({ profile_image: name }).save();
  }
}
