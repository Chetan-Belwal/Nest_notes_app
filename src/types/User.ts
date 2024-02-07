import { Exclude } from 'class-transformer';

export interface user {
  email: string;
  password: string;
}
export class SerializedUser {
  username: string;

  @Exclude()
  password: string;
}
