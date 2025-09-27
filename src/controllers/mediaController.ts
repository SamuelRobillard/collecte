import { Request, Response } from 'express';
import Media from '../models/Media';
import { MediaService } from '../services/MediaService';
export default class MediaController {

  public static async getAllMedia(req: Request, res: Response): Promise<void> {
    
    const users = await MediaService.getAllMedias();
    res.json(users);
  }
  public static async createMedia(media : Media): Promise<boolean> {
    
  
   return MediaService.createMedia(media)
  }


    public static  async deleteMedia(idtoRemove : string | undefined): Promise<boolean> {
    
    return MediaService.deleteMedia(idtoRemove)
   }

}