import { User } from '../interfaces/user.interface';
import { userModelV2 } from '../models/user.model.v2';

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
export class UserServiceV2 {
  
  
  
  
  
  
  
  
 


  public static users : userModelV2 [] = [new userModelV2(1, 'John Doe')]
  public static async getAllUsers(): Promise<userModelV2[]> {
    // Logique pour récupérer tous les utilisateurs
    return this.users;
  }
  public static createUser(userModelV2 : userModelV2): boolean {
    this.users.push(userModelV2)
    const jsonString: string = JSON.stringify(this.users);
    writeFileAsync(jsonString)
    
    return true
  }
   public static  getAllUsersList(): userModelV2[] {
    // Logique pour récupérer tous les utilisateurs
    return this.users;
  }
  public static  deleteUser(idtoRemove : string | undefined):boolean {
    // Logique pour récupérer tous les utilisateurs
    
    try{
      this.users = this.users.filter(item => item.id !== Number(idtoRemove));
      return true;
    }
    
    catch{
      return false;
    }
  }
}