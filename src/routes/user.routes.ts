import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import express, {Request, Response} from 'express';
import User from '../models/User';
import bcrypt from "bcryptjs";
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';
import  jwt from 'jsonwebtoken';
import Media from '../models/Media';
const router = Router();
const userController = new UserController();

router.get('/users', userController.getAllUsers);

router.post('/users', async (req : Request, res: Response) => {
    await UserService.initAsync()
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const role = req.body.role
    const username = req.body.username
    const email = req.body.email
    const users : User[] = await UserService.getAllUsers()
    const userFound = users.find(user => user.email === req.body.email);
    if(userFound !== undefined){
        
        res.status(400).send("email deja enregistré")
    }
    else{
       const id = (UserService.getMaxId() + 1).toString()

    const media : Media[] = [];
    const user = new User(id, username,  email,  hashedPassword, role, media );
    userController.createUser(user)
    res.status(201).send('Utilisateur enregistré'); 
    }
    
});


router.post('/login', async (req, res) => {
    const users : User[] = await UserService.getAllUsers()
    const user = users.find(user => user.email === req.body.email);
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        const accessToken = jwt.sign({ email: user.email }, 'SECRET_KEY', { expiresIn: '1h' });
        res.json({ accessToken });
    } else {
        res.status(403).send('email ou mot de passe incorrect');
    }
});
export default router;