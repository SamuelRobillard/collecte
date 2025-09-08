import express, {Request, Response} from "express";
import Film from "./Film";
const app = express();
const port = 8000;

let film1 : Film = new Film("tt", 22, "asd")
let film2 : Film = new Film("tsst", 222, "asssd")
let film3 : Film = new Film("tsst", 222, "asssd")
let films : Array<Film> = [film1, film2, film3]
app.get('/',  (req: Request, res: Response)=>{

    
    res.send("hello");
});
app.get('/films',  (req: Request, res: Response)=>{

    
    res.send(films);
});
app.get('/films/:annee',  (req: Request, res: Response)=>{
    let filtreAnnee : Array<Film> = []
    let anneeTempo : number = Number(req.params.annee);
    films.forEach((value: Film) => {
        if(anneeTempo == value.annee){
            filtreAnnee.push(value)
        }

        
    });
    res.send(filtreAnnee);
});
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
});

