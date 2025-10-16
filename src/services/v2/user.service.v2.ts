
import { readDataUser, writeDataUser } from '../../utils/jsonHandlerUser';
import { readData, writeData } from '../../utils/jsonHandler';
import { MediaService } from '../MediaService';
import Media from '../../models/Media';
import {UserMongo, IUser } from "../../models/v2/UserV2";
import bcrypt from 'bcryptjs';
import { Types } from 'mongoose';
import User from '../../models/User';
import { HttpError } from '../../utils/HttpError';

export class UserServiceV2 {


  
  public static async createUser(nom : string, username: string, email: string, password: string, role: string, favorites: any[]): Promise<any> {
    // Vérifier si l'email existe déjà
    const existingUser = await UserMongo.findOne({ email });
    if (existingUser) {
      throw new HttpError('Cet email est déjà utilisé.', 409);
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = new UserMongo({
       
      username,
      nom, 
      email,
      password: hashedPassword,  // Utilisation du mot de passe haché
      role: role || 'user', // Par défaut 'user'
      favorites: favorites || [] // Par défaut un tableau vide
    });

    // Sauvegarder l'utilisateur dans la base de données
    await user.save();

    // Retourner l'utilisateur créé
    return user;
  }


public static async updateUser(id: string, updateData: Partial<IUser>): Promise<IUser> {
    if (!Types.ObjectId.isValid(id)) {
      throw new HttpError('ID utilisateur invalide.', 400);
    }

    // Si on veut mettre à jour le mot de passe, on le hash
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const user = await UserMongo.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true } // renvoie le document mis à jour
    );

    if (!user) {
      throw new HttpError('Utilisateur non trouvé.', 404);
    }

    return user;
  }


  public static async getAllUsers(): Promise<IUser[]> {
    try {
      const users = await UserMongo.find();
      
      return users;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des utilisateurs: ' + error);
    }
  }

 public static async getuserById(id : string ): Promise<IUser | null> {
    try {
      const users = await UserMongo.findById(id)
      return users;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des utilisateurs: ' + error);
    }
  }

  public static getAllMediaOfUser(idUser: string | undefined): Media[] | string {
    const data = readDataUser();


    let users = data
    // filtre pour avoir le user qui correspond au bon id
    users = users.filter((item: any) => item.id == idUser);


    // verifie que tous les medias du user existes
    if (MediaService.idExists(users[0].favorites)) {
      const dataMedia = readData();


      let datam = dataMedia.medias
      let allMedia: Media[] = []
      // pour chaque media du user, le recherche dans la liste complete des medias et l'ajoute
      // dans une autre liste qui est retourné
      users[0].favorites.forEach((num: String, index: number) => {
        const filteredMedias = datam.filter((media: { id: any; }) => media.id == num);
        allMedia.push(filteredMedias)
      })


      console.log(allMedia)


      return allMedia


    }



    else {
      return "media non existant"
    }



  }


  // public static async getMaxUserId(): Promise<String> {
  //   try {


  //     const users = await UserMongo.find()

      
  //     .sort({ id: -1 })  // Trie par id de manière décroissante
  //     .limit(1) // selectionne seulement le premier element
  //     .select("id"); // selectionnne uniquement le champ id
  //     const usersid = (users.map((user) => user.id))
    
  //     // transforme le string en nombre pour faire le calcul et le retransforme en string
  //     // selectionne le premeir element de la liste, puisque le limit(1) ne retourne toujours que un
  //     if(usersid !== null){
  //       return String(Number( usersid[0]) + 1)
  //     }
  //     else{
  //       return "1";
  //     }
      
  //   } catch (error) {
  //     throw new Error('Erreur lors de la récupération de l\'ID maximal: ' + error);
  //   }
  // }
  
}