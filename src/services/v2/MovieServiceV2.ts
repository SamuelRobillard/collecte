

import {UserMongo, IUser } from "../../models/v2/UserV2";
import bcrypt from 'bcryptjs';
import { Types } from 'mongoose';
import MovieV2, { IMovie } from "../../models/v2/MovieV2";
import { HttpError } from "../../utils/HttpError";


export class MovieServiceV2 {


  
  public static async creatMovie(title: string, genre: string, releaseDate: Date, durationMin: number, synopsis: string): Promise<any> {
   
    
    // Créer un nouvel utilisateur
    const Movie = new MovieV2({
       title,
       genre,
       releaseDate,
       durationMin,
       synopsis
     
    });

    // Sauvegarder l'utilisateur dans la base de données
    await Movie.save();

    // Retourner l'utilisateur créé
    return Movie;
  }



  public static async getAllMovie(): Promise<IMovie[]> {
    try {
      const Movies = await MovieV2.find();
      
      return Movies;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des movies: ' + error);
    }
  }


  public static async updateMovie(id: string, updateData: Partial<IMovie>): Promise<IMovie> {
      if (!Types.ObjectId.isValid(id)) {
        throw new HttpError('ID utilisateur invalide.', 400);
      }
  
      // Si on veut mettre à jour le mot de passe, on le hash
      
  
      const movie = await MovieV2.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true } // renvoie le document mis à jour
      );
  
      if (!movie) {
        throw new HttpError('Utilisateur non trouvé.', 404);
      }
  
      return movie;
    }

    public static async deleteMovieById(id: string) {
      if (!Types.ObjectId.isValid(id)) {
        throw new HttpError('ID du film invalide.', 400);
      }

      const movie = await MovieV2.findByIdAndDelete(id);

      if (!movie) {
        throw new HttpError('Film non trouvé.', 404);
      }

      return movie;
    }
 
}