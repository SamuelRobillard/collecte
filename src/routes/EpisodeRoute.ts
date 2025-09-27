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
import Serie from '../models/Serie';
import Saison from '../models/Saison';

import { validateMedia } from '../middleswares/auth.middleware';
import Episode from '../models/Episode';
import EpisodeController from '../controllers/EpisodeController';
import { EpisodeService } from '../services/EpisodeService';
const router = Router();


router.get('/episodes', EpisodeController.getAllEpisode)

router.post('/episodes', async (req : Request, res: Response) => {
    
    
    const title = req.body.title
    const duration = req.body.duration
    const episodeNumber = req.body.episodeNumber
    const watched = req.body.watched
    
    
    
    const id = (EpisodeService.getMaxId() + 1).toString()
   
       
        const episode = new Episode(id, title,  duration , episodeNumber , watched);
        EpisodeController.createEpisode(episode)
        res.status(201).send('episode enregistré');
    
   
    
    
});

router.delete('/episode/:id', async (req, res) => {
    
    if(await EpisodeController.deleteEpisode(req.params.id)){
        res.status(201).send("Episode deleted")
    }
    else{
         res.status(403).send('id non valide');
    }
    
       
    
});


export default router;