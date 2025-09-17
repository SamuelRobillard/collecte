import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import express, {Request, Response} from 'express';

import bcrypt from "bcryptjs";
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';
import  jwt from 'jsonwebtoken';
const router = Router();
const userController = new UserController();

router.get('/users', userController.getAllUsers);

router.post('/register', async (req : Request, res: Response) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { id: 2 , email : "asd@gmail.com",username: req.body.username, password: hashedPassword };
    userController.createUser(user)
    res.status(201).send('Utilisateur enregistré');
});


router.post('/login', async (req, res) => {
    const users : UserModel[] = UserService.getAllUsersList()
    const user = users.find(user => user.username === req.body.username);
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        const accessToken = jwt.sign({ username: user.username }, 'SECRET_KEY', { expiresIn: '1h' });
        res.json({ accessToken });
    } else {
        res.status(403).send('Nom d’utilisateur ou mot de passe incorrect');
    }
});
export default router;