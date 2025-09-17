import { User } from '../interfaces/user.interface';

export class UserModel implements User {
  constructor(public id: number, public username: string, public email: string, public password: string) {}
}