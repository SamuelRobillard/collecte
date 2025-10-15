import { Request, Response } from 'express';
import { SerieServiceV2 } from '../../services/v2/SerieServiceV2';




export class SerieControllerV2 {

  public async getAllSerie(req: Request, res: Response): Promise<Response> {
    try {
      const movies = await SerieServiceV2.getAllSerie();
      return res.json(movies);
    } catch (error) {
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  }





  public async createSerie(req: Request, res: Response): Promise<Response> {
    const {title, genre, status} = req.body;

    // Vérification si le mot de passe est fourni
    
    try {
      const user = await SerieServiceV2.creatSerie(title, genre, status );
      return res.status(201).json({ message: 'Serie créé avec succès', user });
    } catch (error: unknown) {
     return res.status(400).json({message : "probleme hehe"})
    
  }}
}