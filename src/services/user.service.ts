import { json } from 'stream/consumers';
import User from '../models/User';
import { UserModel } from '../models/user.model';
import ValidationRegexService from './validationRegexService';
import { readDataUser, writeDataUser } from '../utils/jsonHandlerUser';
import { readData, writeData } from '../utils/jsonHandler';
import { MediaService } from './MediaService';
import Media from '../models/Media';

const fsPromise = require('fs').promises;
const fileName : string = "./src/data/dbUsers.json";




export class UserService {
  
  
  
  
  
  
  
  
 



 
  public static async createUser(user : User): Promise<boolean> {
    const data = readDataUser();
    data.push(user);
    writeDataUser(data);
    
    return true;
  }

   

   public static  getAllUsers(): User[]{
    // Logique pour récupérer tous les utilisateurs
    const data = readDataUser();
    return data;
  }


  public static  getAllMediaOfUser(idUser : string | undefined): Media[] | string{
    const data = readDataUser();
   
    
    let users = data
   
    users = users.filter((item: any) => item.id == idUser);
   
    if(MediaService.idExists(users[0].favorites)){
      const dataMedia = readData();
      
      
      let datam = dataMedia.medias
      let allMedia : Media []= [] 
      
      users[0].favorites.forEach((num: String, index: number) => {
        const filteredMedias = datam.filter((media: { id: any; }) => media.id == num);
        allMedia.push(filteredMedias)
      })
      

      console.log(allMedia)
        
        
      return allMedia
      

    }
    
      
    
    else{
      return "media non existant"
    }
    
    
    
  }

  
  public static getMaxId(): number {
    const data = readDataUser();
    let users = data
  if (users.length === 0) return 0;

  return Math.max(...users.map((user: { id: any; }) => Number(user.id)));
}
  
}