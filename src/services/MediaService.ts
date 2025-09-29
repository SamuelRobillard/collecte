import { json } from 'stream/consumers';
import User from '../models/User';
import Media from '../models/Media';
import ValidationRegexService from './validationRegexService';
import { readData, writeData } from '../utils/jsonHandler';

const fsPromise = require('fs').promises;
const fileName : string = "./src/data/dbMedia.json";


const FILM_FIELD = ["titre", "genre", "year", "rating", "duration", "watched"];
const SERIE_FIELD = ["titre", "genre", "year", "rating", "status", "saisonsId"];
let field;
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

   public static  getAllMedias(updatedFields: Partial<any>): Media[]{
    // Logique pour récupérer tous les utilisateurs
    
    

    const data = readData();
    if(updatedFields.id != undefined){
       data.medias = data.medias.filter((item: any) => item.id == updatedFields.id);
    }
   
    if(updatedFields.type != undefined){
      data.medias = data.medias.filter((item: any) => item.type == updatedFields.type);
    }
    if(updatedFields.titre != undefined){
      data.medias = data.medias.filter((item: any) => item.titre == updatedFields.titre);
    }
    if(updatedFields.genre != undefined){
      data.medias = data.medias.filter((item: any) => item.genre == updatedFields.genre);
    }
    if(updatedFields.year != undefined){
      data.medias = data.medias.filter((item: any) => item.year == updatedFields.year);
    }
    if(updatedFields.rating != undefined){
      data.medias = data.medias.filter((item: any) => item.rating == updatedFields.rating);
    }
    if(updatedFields.duration != undefined){
      data.medias = data.medias.filter((item: any) => item.duration == updatedFields.duration);
    }
    if(updatedFields.watched != undefined){
      data.medias = data.medias.filter((item: any) => item.watched == updatedFields.watched);
    }
  
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


  public static idExists(mediasId : String[]) : boolean {
    
    const data = readData();
    
    const existingMediasIds = data.medias.map((s: any) => s.id);
      mediasId.forEach((num: String, index: number) => {
       if (!existingMediasIds.includes(index)) {
       
      
      return false;

    }});
   
   
  
    console.log("yes")
    return true;
  }

    public static updateMedia(idToFind: string, updatedFields: Partial<any>): boolean {
    try {
      const data = readData();

      
      const index = data.medias.findIndex((media: any) => media.id == idToFind);
      if (index == -1) return false; 

       const filteredFields: Record<string, any> = {};
      console.log(data.medias[index].type)
      if(data.medias[index].type == "film"){
         field = FILM_FIELD
      }
      else{
        field = SERIE_FIELD
      }
      
      for (const key of field) {
        if (updatedFields.hasOwnProperty(key)) {
          filteredFields[key] = updatedFields[key];
        }
      }
      console.log(filteredFields)
      data.medias[index] = { ...data.medias[index], ...filteredFields };
      console.log(data.medias[index])
      writeData(data);
      return true;
    } catch (err) {
      console.error("Erreur updateMedia:", err);
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