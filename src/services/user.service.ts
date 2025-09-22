import { User } from '../interfaces/user.interface';
import { UserModel } from '../models/user.model';

const fsPromise = require('fs').promises;
const fileName : string = "../db.json";







async function writeFileAsync(use : string) {
  try {
    await fsPromise.writeFile('./src/data/db.json', use );
    console.log("written");
  } catch (err) {
    console.error(err);
  }
}
export class UserService {
  
  
  
  
  
  
  
  
 


  public static users : UserModel [] = [new UserModel(1, 'John Doe', 'john.doe@example.com', "pass")]
  public static async getAllUsers(): Promise<UserModel[]> {
    // Logique pour récupérer tous les utilisateurs
    return this.users;
  }
  public static createUser(UserModel : UserModel): boolean {
    this.users.push(UserModel)
    const jsonString: string = JSON.stringify(this.users);
    writeFileAsync(jsonString)
    
    return true
  }
   public static  getAllUsersList(): UserModel[] {
    // Logique pour récupérer tous les utilisateurs
    return this.users;
  }
}