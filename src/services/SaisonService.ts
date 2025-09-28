

import Saison from '../models/Saison';

import { readData, writeData } from '../utils/jsonHandler';







export class SaisonService {
  
  
  
  
  
  
  
  
 


  
 
  public static async createSaison(saison : Saison): Promise<boolean> {
    const data = await readData();
    data.saisons.push(saison)
    writeData(data)
    
   
    
    return true
  }

  //  public static async initAsync() {
  //   this.Saisons = await readFile();
  // }

   public static  getAllSaisons(): Saison[]{
    // Logique pour récupérer tous les utilisateurs
    
    const data = readData();
    return data.saisons;
  }

  public static  deleteSaison(idtoRemove : string | undefined):boolean {
    
    const data = readData()
    
    try{
      
      
      data.saisons  = data.saisons.filter((item: any) => item.id !== idtoRemove);
      
      writeData(data)
      return true;
    }
    
    catch{
      return false;
    }
  }

  public static getMaxId(): number {
  const data = readData();
  let saison = data.saisons;
  if (saison.length === 0) return 0;

  return Math.max(...saison.map((saison: any) => Number(saison.id)));
}
  

    public static allIdExists(saisonsIds : String[]) : boolean {
    
    const data = readData();
    
    const existingSaisonIds = data.saisons.map((s: any) => s.id);
    
    
  // Vérifier que chaque id de saisonsId existe dans la BD
    for (const saisonId of saisonsIds) {

        
        
        
    if (!existingSaisonIds.includes(saisonId)) {
        return false;
        
      
    }

  }
  return true;
    }
}