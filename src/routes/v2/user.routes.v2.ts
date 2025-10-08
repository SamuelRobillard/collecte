import { Router } from 'express';
import { UserControllerV2 } from '../../controllers/v2/user.controller.V2';
import express, { Request, Response } from 'express';
import User from '../../models/User';
import bcrypt from "bcryptjs";
import { UserService } from '../../services/user.service';
import jwt from 'jsonwebtoken';
import { ValidateUser } from '../../middleswares/validationUserMiddleswares';
import { UserServiceV2 } from '../../services/v2/user.service.v2';
import { IUser } from '../../models/v2/UserV2';

const router = Router();
const userController = new UserControllerV2();

router.get('/users', userController.getAllUsers);
router.get('/users/:id/medias', userController.getAllMediaOfUser)
router.post('/users', ValidateUser,  userController.createUser)


router.post('/login', async (req, res) => {
    const users: IUser[] = await UserServiceV2.getAllUsers()
    const user = users.find(user => user.email === req.body.email);
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        const accessToken = jwt.sign({ email: user.email }, 'SECRET_KEY', { expiresIn: '1h' });
        res.json({ accessToken });
    } else {
        res.status(403).send('email ou mot de passe incorrect');
    }
});
export default router;