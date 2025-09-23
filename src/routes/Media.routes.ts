import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import express, {Request, Response} from 'express';
import User from '../models/User';
import bcrypt from "bcryptjs";
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';
import  jwt from 'jsonwebtoken';
import Media from '../models/Media';
import { MediaService } from '../services/MediaService';
import MediaController from '../controllers/mediaController';
import Film from '../models/Film';
const router = Router();


router.get('/medias', MediaController.getAllMedia)

router.post('/medias', async (req : Request, res: Response) => {
    await MediaService.initAsync()
    
    const titre = req.body.titre
    const genre = req.body.genre
    const year = req.body.year
    const rating = req.body.rating
    const duaration = req.body.duration
    const watched = req.body.watched
   
    
    const id = (MediaService.getMaxId() + 1).toString()
    
    const user = new Film(id, titre, genre,  year, rating, duaration, watched);
    MediaController.createUser(user)
    res.status(201).send('Utilisateur enregistré');
});




export default router;