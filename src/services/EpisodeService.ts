import Episode from '../models/Episode';
import { readData, writeData } from '../utils/jsonHandler';

const Episode_FIELD = ["title", "duration", "episodeNumber", "watched"];
export class EpisodeService {
  
  public static async createEpisode(episode : Episode): Promise<boolean> {
    const data = await readData();
    data.episodes.push(episode)
    writeData(data)
    return true
  }

   public static  getAllEpisodes(): Episode[]{
    // Logique pour récupérer tous les utilisateurs
    
    const data = readData();
    return data.episodes;
  }

 public static  deleteEpisode(idtoRemove : string | undefined):boolean {
    const data = readData()
    try{
      
      data.episodes = data.episodes.filter((item: any) => item.id !== idtoRemove);
      writeData(data)
      return true;
    }
    
    catch{
      return false;
    }
  }

  public static getMaxId(): number {
  const data = readData();
  let episodes = data.episodes;
  if (episodes.length === 0) return 0;
  return Math.max(...episodes.map((episode: any) => Number(episode.id)));
}


public static allIdExists(episodesId : String[]) : boolean {
    const data = readData();
    const existingEpisodesIds = data.episodes.map((s: any) => s.id);
    
    
  // Vérifier que chaque id de saisonsId existe dans la BD
    for (const episodeId of episodesId) {
   
    if (!existingEpisodesIds.includes(episodeId)) {
        return false;
        
      
    }

  }
  return true;
    }


    public static updateEpiosde(idToFind: string, updatedFields: Partial<any>): boolean {
        try {
          const data = readData();
    
    
          const index = data.medias.findIndex((media: any) => media.id == idToFind);
          if (index == -1) return false;
    
          const filteredFields: Record<string, any> = {};
          for (const key of Episode_FIELD) {
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
  
}