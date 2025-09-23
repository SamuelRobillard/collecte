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
  
  
  
  
  
  
  
  
 


  private static users : Media[] = []
 
  public static async createMedia(user : Media): Promise<boolean> {
    
    this.users.push(user)
    
    await writeFileAsync(this.users)
    
    return true
  }

   public static async initAsync() {
    this.users = await readFile();
  }

   public static  getAllMedias(): Media[]{
    // Logique pour récupérer tous les utilisateurs
    
    return this.users;
  }
  public static getMaxId(): number {
  if (this.users.length === 0) return 0;

  return Math.max(...this.users.map(user => Number(user.id)));
}
  
}