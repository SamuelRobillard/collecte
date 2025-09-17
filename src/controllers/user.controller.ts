import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';

export class UserController {
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await UserService.getAllUsers();
    res.json(users);
  }
  public createUser(UserModel : UserModel): boolean {
    
   return UserService.createUser(UserModel)
  }
}