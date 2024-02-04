import {
  Body,
  Controller,
  Get,
  Post,
  Redirect,
  Render,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user/create-user.dto';
import { UsersService } from '../services/users.service';
import { UserModel } from 'src/database/models/user.model';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path = require('path');
import { Observable, of } from 'rxjs';
import { JwtAuthGuard } from 'src/auth/guard/jwt.guard';
import { User } from 'user.decorator';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { FormDataTestDto } from '../dtos/form-data.dto';

//  export const storage = {
//   storage:diskStorage({
//     destination:'./uploads/pfp',
//     filename:(req,file,cb) =>{
//       const filename: string = path.parse(file.originalname).name.replace(/\s/g, '')
//       const fileExtention: string = path.parse(file.originalname).ext

//       cb(null,`${filename}${fileExtention}`)
//     }

//   })
// }

@Controller('users') // /users
export class UsersController {
  constructor(private userService: UsersService) {}
  

  @Render('signup')
  @Get('sign_up')
  public showSignUp() {
    return {
        message: '/sign_up'
    };
  }

  @UsePipes(new ValidationPipe())
  @Redirect('/auth/login')
  @Post('sign_up')
  public async create(@Body() createUser: CreateUserDto): Promise<UserModel> {
    console.log('request data', createUser);
    return this.userService.create(createUser);

  }

  @Get()
  public findOne(@Body() userId: CreateUserDto) {
    console.log(userId);
  }
  
  @Redirect('/notes/dashboard')
  @UseGuards(JwtAuthGuard)
  @FormDataRequest({storage:FileSystemStoredFile})
  @Post('/upload')
  public async getFile(@Body()  test: FormDataTestDto,@User() user:number){
     await this.userService.uploadProfilePicture(user,test['file'])
  }
  
}


// uploadFile(@UploadedFile() file: Express.Multer.File,@User() user: any){
  //   console.log(file,"file")
  //   const user_id = user.user_id
  //   this.userService.updateOne(user_id,file.filename)
  //   return {imagePath:file.filename}
  // }
 