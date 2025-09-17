import { UserModel } from "./models/user.model";
import express, {Request, Response} from 'express';
import userRoutes from '../src/routes/user.routes';

import fs from "fs"
import https from "https"
import path from "path";



const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/api', userRoutes)
const users : UserModel[] = []; // Simuler une base de données en mémoire






const options = {
  key: fs.readFileSync(path.join("../collecte", 'key.pem')),
  cert: fs.readFileSync(path.join("../collecte", 'cert.pem'))
};

// Middleware JSON
app.use(express.json());

// Route simple pour tester
app.get('/', (req, res) => {
  res.send('Connexion HTTPS sécurisée');
});

// Créer le serveur HTTPS
https.createServer(options, app).listen(port, () => {
  console.log(`Serveur HTTPS en écoute sur <https://localhost>:${port}`);
});