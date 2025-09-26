import { json } from 'stream/consumers';
import User from '../models/User';
import Media from '../models/Media';
import ValidationRegexService from './validationRegexService';

const fsPromise = require('fs').promises;
const fileName : string = "./src/data/dbMedia.json";



async function readFile(): Promise<Media[]> {
  try {
    const data = await fsPromise.readFile(fileName, "utf8");
    if(data !== null){
       return JSON.parse(data) || []; 
    }
    return []
  } catch (err) {
    console.error("Erreur lecture fichier:", err);
    return [];
  }
}


async function writeFileAsync(medias: Media[]): Promise<void> {
  try {
    await fsPromise.writeFile(fileName, JSON.stringify(medias, null, 2));
    console.log("Fichier écrit avec succès !");
  } catch (err) {
    console.error("Erreur écriture fichier:", err);
  }
}
export class MediaService {
  
  
  
  
  
  
  
  
 


  private static medias : Media[] = []
 
  public static async createMedia(user : Media): Promise<boolean> {
    
    this.medias.push(user)
    
    await writeFileAsync(this.medias)
    
    return true
  }

   public static async initAsync() {
    this.medias = await readFile();
  }

   public static  getAllMedias(): Media[]{
    // Logique pour récupérer tous les utilisateurs
    
    return this.medias;
  }

 public static  deleteMedia(idtoRemove : string | undefined):boolean {
    
    
    try{
      this.medias = this.medias.filter(item => item.id !== idtoRemove);
      
      writeFileAsync(this.medias)
      return true;
    }
    
    catch{
      return false;
    }
  }

  public static getMaxId(): number {
  if (this.medias.length === 0) return 0;

  return Math.max(...this.medias.map(user => Number(user.id)));
}
  
}