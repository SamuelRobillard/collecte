import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import express, {Request, Response} from 'express';
import Film from '../models/Film';
import bcrypt from "bcryptjs";
import { UserService } from '../services/user.service';
import { UserModel } from '../models/user.model';
import  jwt from 'jsonwebtoken';
const router = Router();





let film1 : Film = new Film(1,"tt", 22, "asd");
let film2 : Film = new Film(2,"tsst", 222, "asssd");
let film3 : Film = new Film(3,"tsst", 222, "asssd");
let films : Array<Film> = [film1, film2, film3]

router.get('/films',  (req: Request, res: Response)=>{

    
    res.send(films);
});
router.get('/films/annee/:annee',  (req: Request, res: Response)=>{
    let filtreAnnee : Array<Film> = [];
    let anneeTempo : number = Number(req.params.annee);
    films.forEach((value: Film) => {
        if(anneeTempo == value.annee){
            filtreAnnee.push(value);
        }

        
    });
    res.send(filtreAnnee);
});



export default router;