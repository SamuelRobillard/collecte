import { Request, Response } from 'express';
import { UserService } from '../../services/user.service';
import {UserServiceV2} from "../../services/v2/user.service.v2";

export class UserControllerV2 {
  public async getAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserServiceV2.getAllUsers();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  }
  public async getUserById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.params.id
      if(id != undefined){
        const users = await UserServiceV2.getuserById(id);
        return res.json(users);
      }
      return res.status(400).json({message : "id invalide"})
    } catch (error) {
      return res.status(500).json({ message: 'Erreur interne du serveur' });
    }
  }



  public async getAllMediaOfUser(req: Request, res: Response): Promise<void> {

    const medias = await UserService.getAllMediaOfUser(req.params.id);
    res.json(medias);
  }



  public async createUser(req: Request, res: Response): Promise<Response> {
    const {username, email, password, role, favorites } = req.body;

    // Vérification si le mot de passe est fourni
    if (!password) {
       return res.status(400).json({ message: 'Le mot de passe est requis.' });
    }

    try {
      const user = await UserServiceV2.createUser(username, email, password, role, favorites);
      return res.status(201).json({ message: 'Utilisateur créé avec succès', user });
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error.message);
        // Vérifie ici que le message est bien passé
        if (error.message.includes('USER_EXISTS')) {
          return res.status(409).json({ message: 'L\'utilisateur existe déjà.' });  // Important d'utiliser `return`
        } else {
          return res.status(500).json({ message: error.message || 'Erreur interne du serveur' });
        }
      } else {
        // Si l'erreur n'est pas de type Error, on renvoie une réponse générique
        console.error('Erreur inconnue:', error);
        return res.status(500).json({ message: 'Erreur inconnue' });
      }
    }
    
  }
}