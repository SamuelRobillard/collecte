import { Router } from 'express';
import { UserControllerV2 } from '../../controllers/v2/user.controller.V2';
import express, { Request, Response } from 'express';
import User from '../../models/User';
import bcrypt from "bcryptjs";
import { UserService } from '../../services/user.service';
import jwt from 'jsonwebtoken';
import { ValidateUser } from '../../middleswares/validationUserMiddleswares';
import { UserServiceV2 } from '../../services/v2/user.service.v2';
import { IUser, UserMongo } from '../../models/v2/UserV2';
import { authMiddleware, AuthRequest } from '../../middleswares/authentificationMiddleswares';
import { adminMiddleware } from '../../middleswares/adminMiddleware';

const router = Router();
const userController = new UserControllerV2();

router.get('/users',authMiddleware, adminMiddleware, userController.getAllUsers);
router.get('/users/:id',authMiddleware, adminMiddleware, userController.getUserById);
// router.get('/users/:id/medias', userController.getAllMediaOfUser)
router.post('/users',authMiddleware, adminMiddleware, ValidateUser,  userController.createUser)


router.post('/login', async (req, res) => {
    const users: IUser[] = await UserServiceV2.getAllUsers()
    const user = users.find(user => user.email === req.body.email);
    if (user && await bcrypt.compare(req.body.password, user.password)) {
        
        const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret';
        const accessToken = jwt.sign({id : user._id,  email: user.email, role : user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ accessToken });
    } else {
        res.status(403).send('email ou mot de passe incorrect');
    }
});


router.get('/me', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    
    // Vérifie que le middleware a bien ajouté req.user
    if (!req.user?.id) {
      return res.status(401).json({ message: 'Utilisateur non authentifié' });
    }

    // Récupère le user depuis MongoDB
    const user = await UserMongo.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Retourne le user sans le mot de passe
    res.status(200).json(user);
  } catch (error) {
    console.error('Erreur dans /me :', error);
    res.status(500).json({ message: 'Erreur serveur', error: (error as Error).message });
  }
});
export default router;