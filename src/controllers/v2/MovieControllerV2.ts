import { Request, Response } from 'express';
import { MovieServiceV2 } from '../../services/v2/MovieServiceV2';



export class MovieControllerV2 {
  public async getAllMovie(req: Request, res: Response): Promise<Response> {
    try {
      const movies = await MovieServiceV2.getAllMovie();
      return res.json(movies);
    } catch (error) {
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  }





  public async createMovie(req: Request, res: Response): Promise<Response> {
    const {title, genre, releaseDate, durationMin, synopsis } = req.body;

    // Vérification si le mot de passe est fourni
    
    try {
      const movie = await MovieServiceV2.creatMovie(title, genre, releaseDate, durationMin, synopsis );
      return res.status(201).json({ message: 'Movie créé avec succès', movie });
    } catch (error: unknown) {
     return res.status(400).json({message : "probleme creation de movie"})
    
  }}
}