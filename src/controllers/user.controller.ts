import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';
import User from '../models/User';
export class UserController {
  public async getAllUsers(req: Request, res: Response): Promise<void> {
    await UserService.initAsync()
    const users = await UserService.getAllUsers();
    res.json(users);
  }
  public async createUser(user : User): Promise<boolean> {
  await UserService.initAsync()
   return UserService.createUser(user)
  }
}