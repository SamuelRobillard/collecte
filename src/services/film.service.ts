import { User } from '../interfaces/user.interface';
import Film from '../models/Film';
import { UserModel } from '../models/user.model';

export class FilmService {
  public static films : Film [] = [new Film(1, 'John Doe', 2000, 'adsad')]
  public static async getAllUsers(): Promise<Film[]> {
    // Logique pour récupérer tous les utilisateurs
    return this.films;
  }
  public static createUser(film : Film): boolean {
    this.films.push(film)
    return true
  }
   public static  getAllUsersList(): Film[] {
    // Logique pour récupérer tous les utilisateurs
    return this.films;
  }
}