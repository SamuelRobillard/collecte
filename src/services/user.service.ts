import { User } from '../interfaces/user.interface';
import { UserModel } from '../models/user.model';

export class UserService {
  public static users : UserModel [] = [new UserModel(1, 'John Doe', 'john.doe@example.com', "pass")]
  public static async getAllUsers(): Promise<UserModel[]> {
    // Logique pour récupérer tous les utilisateurs
    return this.users;
  }
  public static createUser(UserModel : UserModel): boolean {
    this.users.push(UserModel)
    return true
  }
   public static  getAllUsersList(): UserModel[] {
    // Logique pour récupérer tous les utilisateurs
    return this.users;
  }
}