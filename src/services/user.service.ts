import { json } from 'stream/consumers';
import User from '../models/User';
import { UserModel } from '../models/user.model';
import ValidationRegexService from './validationRegexService';

const fsPromise = require('fs').promises;
const fileName : string = "./src/data/dbUsers.json";



async function readFile(): Promise<User[]> {
  try {
    const data = await fsPromise.readFile(fileName, "utf8");
    return JSON.parse(data) || [];
  } catch (err) {
    console.error("Erreur lecture fichier:", err);
    return [];
  }
}


async function writeFileAsync(users: User[]): Promise<void> {
  try {
    await fsPromise.writeFile(fileName, JSON.stringify(users, null, 2));
    console.log("Fichier écrit avec succès !");
  } catch (err) {
    console.error("Erreur écriture fichier:", err);
  }
}
export class UserService {
  
  
  
  
  
  
  
  
 


  private static users : User[] = []
 
  public static async createUser(user : User): Promise<boolean> {
    
    this.users.push(user)
    
    await writeFileAsync(this.users)
    
    return true
  }

   public static async initAsync() {
    this.users = await readFile();
  }

   public static  getAllUsers(): User[]{
    // Logique pour récupérer tous les utilisateurs
    
    return this.users;
  }
  public static getMaxId(): number {
  if (this.users.length === 0) return 0;

  return Math.max(...this.users.map(user => Number(user.id)));
}
  
}