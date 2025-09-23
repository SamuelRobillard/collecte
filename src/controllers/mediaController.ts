import { Request, Response } from 'express';
import Media from '../models/Media';
import { MediaService } from '../services/MediaService';
export default class MediaController {

  public static async getAllMedia(req: Request, res: Response): Promise<void> {
    await MediaService.initAsync()
    const users = await MediaService.getAllMedias();
    res.json(users);
  }
  public static async createUser(media : Media): Promise<boolean> {
    
  await MediaService.initAsync()
   return MediaService.createMedia(media)
  }
}