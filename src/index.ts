import express, {Request, Response} from "express";
import Film from "./Film";
import Exo1Regex from "./Exo1Regex";
import userRoutes from '../src/routes/user.routes';


const app = express();
const port = 8000;
app.use(express.json())
app.use('/api', userRoutes)

let film1 : Film = new Film("tt", 22, "asd");
let film2 : Film = new Film("tsst", 222, "asssd");
let film3 : Film = new Film("tsst", 222, "asssd");
let films : Array<Film> = [film1, film2, film3]

app.get('/films',  (req: Request, res: Response)=>{

    
    res.send(films);
});
app.get('/films/annee/:annee',  (req: Request, res: Response)=>{
    let filtreAnnee : Array<Film> = [];
    let anneeTempo : number = Number(req.params.annee);
    films.forEach((value: Film) => {
        if(anneeTempo == value.annee){
            filtreAnnee.push(value);
        }

        
    });
    res.send(filtreAnnee);
});
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});

console.log(Exo1Regex.validatePassword("Pd1sssssss1!"))
console.log(Exo1Regex.onlyNumberInPhone("   (514) - 23  4-  23  4"   ))
console.log(Exo1Regex.cleanString(" ads     ads aaa   a "))