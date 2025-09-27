import { Request, Response } from 'express';
import Media from '../models/Media';
import { MediaService } from '../services/MediaService';
import { EpisodeService } from '../services/EpisodeService';
import Episode from '../models/Episode';
import { SaisonService } from '../services/SaisonService';
import Saison from '../models/Saison';
export default class SaisonController {

  public static async getAllSaison(req: Request, res: Response): Promise<void> {
    
    const saisons = await SaisonService.getAllSaisons()
    res.json(saisons);
  }
  public static async createSaison(saison : Saison): Promise<boolean> {
    
  
   return SaisonService.createSaison(saison)
  }


    public static  async deleteSaison(idtoRemove : string | undefined): Promise<boolean> {
    
    return SaisonService.deleteSaison(idtoRemove)
   }

}