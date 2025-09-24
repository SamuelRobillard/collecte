import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import express, {Request, Response} from 'express';
import { UserControllerV2 } from '../controllers/user.Controller.v2';
import bcrypt from "bcryptjs";
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';
import  jwt from 'jsonwebtoken';
const router = Router();
const userController = new UserController();
const userControllerv2 = new UserControllerV2();

router.get('/users', userControllerv2.getAllUsers);

router.post('/users', async (req : Request, res: Response) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { id: 2 , email : req.body.email ,username: req.body.username, password: hashedPassword };
    userController.createUser(user)
    res.status(201).send('Utilisateur enregistré');
});


router.post('/login', async (req, res) => {
    const users : UserModel[] = await UserService.getAllUsersList()
    const user = users.find(user => user.email === req.body.email);
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        const accessToken = jwt.sign({ email: user.email }, 'SECRET_KEY', { expiresIn: '1h' });
        res.json({ accessToken });
    } else {
        res.status(403).send('email ou mot de passe incorrect');
    }
});
router.delete('/users/:id', async (req, res) => {
    if(await userControllerv2.deleteUser(req.params.id)){
        res.status(201).send("user deleted")
    }
    else{
         res.status(403).send('id non valide');
    }
    
       
    
});
export default router;