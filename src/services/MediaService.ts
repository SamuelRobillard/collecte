import { json } from 'stream/consumers';
import User from '../models/User';
import Media from '../models/Media';
import ValidationRegexService from './validationRegexService';
import { readData, writeData } from '../utils/jsonHandler';

const fsPromise = require('fs').promises;
const fileName : string = "./src/data/dbMedia.json";




export class MediaService {
  
  
  
  
  
  
  
  
 


  
 
  public static async createMedia(user : Media): Promise<boolean> {
    const data = await readData();
    data.medias.push(user)
    writeData(data)
    
   
    
    return true
  }

  //  public static async initAsync() {
  //   this.medias = await readFile();
  // }

   public static  getAllMedias(): Media[]{
    // Logique pour récupérer tous les utilisateurs
    
    const data = readData();
    return data.medias;
  }

 public static  deleteMedia(idtoRemove : string | undefined):boolean {
    
    const data = readData()
    
    try{
      
      data.medias = data.medias.filter((item: any) => item.id !== idtoRemove);
      
      writeData(data)
      return true;
    }
    
    catch{
      return false;
    }
  }

  public static getMaxId(): number {
  const data = readData();
  let medias = data.medias;
  if (medias.length === 0) return 0;

  return Math.max(...medias.map((media: any) => Number(media.id)));
}
  
}