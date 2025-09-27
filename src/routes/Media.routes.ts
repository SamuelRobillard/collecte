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
import Episode from '../models/Episode';
import { validateMedia } from '../middleswares/auth.middleware';
import { SaisonService } from '../services/SaisonService';
const router = Router();


router.get('/medias', MediaController.getAllMedia)

router.post('/medias', validateMedia, async (req : Request, res: Response) => {
    
    const type = req.body.type
    const titre = req.body.titre
    const genre = req.body.genre
    const year = req.body.year
    const rating = req.body.rating
    
    
    
    const id = (MediaService.getMaxId() + 1).toString()
    if(type == "film"){
        const duaration = req.body.duration
        const watched = req.body.watched
        const media = new Film(id, titre, genre,  year, rating, duaration, watched);
        MediaController.createMedia(media)
        res.status(201).send('Utilisateur enregistré');
    }
    else if (type == "serie"){
        const status = req.body.status
        const saisonsId = req.body.saisonsId

        if(SaisonService.allIdExists(saisonsId)){
          const media = new Serie(id, titre, genre,  year, rating, status, saisonsId);
        MediaController.createMedia(media)
        res.status(201).send('Utilisateur enregistré');
        }
        else{
        res.status(400).send('saison non existante');  
    }
        
    }
    else{
      res.status(400).send('type non valide');  
    }
    
});

router.delete('/medias/:id', async (req, res) => {
    
    if(await MediaController.deleteMedia(req.params.id)){
        res.status(201).send("Média deleted")
    }
    else{
         res.status(403).send('id non valide');
    }
    
       
    
});


export default router;