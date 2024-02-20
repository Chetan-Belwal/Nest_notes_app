import { Injectable } from '@nestjs/common';
import { Command, CommandRunner, Option } from 'nest-commander';
import { UsersService } from '../../users/services/users.service';

@Injectable()
@Command({
    name: 'user',
    description: 'create user',
    arguments:'[create]'
})
export class UserCliService extends CommandRunner {
    constructor(private userService: UsersService){super()}
    public async run(passedParams: string[], options?: Record<string, any>): Promise<void> {
        //Register a User
        if(passedParams[0]==='create'){
            console.log(options)
            const username = options.name;
            const email = options.email;
            const password = options.password;
            const user= {
                name:username,
                email:email,
                password:password
            }

            await this.userService.create(user)
            console.log('>> User Created Succesfully')
        }
        

        return Promise.resolve(undefined)
    }
    @Option({flags:'-n, --name [name]'})
    public parseName(name:string): string{
        return String(name)
    }

    @Option({flags:'-e, --email [email]'})
    public parseEmail(email:string):string{
        return String(email)
    }

    @Option({flags:'-p, --password [password]'})
    public parsePassword(password:string):string{
        return String(password)
    }

}
