

import {UserMongo, IUser } from "../../models/v2/UserV2";
import bcrypt from 'bcryptjs';
import { Types } from 'mongoose';
import MovieV2, { IMovie } from "../../models/v2/MovieV2";


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


  

 
}