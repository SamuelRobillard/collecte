import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';
import { UserServiceV2 } from '../services/user.services.v2';

export class UserControllerV2 {
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    const users = await UserServiceV2.getAllUsers();
    res.json(users);
  }
  public async createUser(UserModel : UserModel): Promise<boolean> {
    
   return  UserServiceV2.createUser(UserModel)
  }
  public async deleteUser(idtoRemove : string | undefined): Promise<boolean> {
    
    return UserServiceV2.deleteUser(idtoRemove)
   }
}