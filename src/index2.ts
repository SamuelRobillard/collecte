import { UserModel } from "./models/user.model";
import express, {Request, Response} from 'express';
import userRoutes from '../src/routes/user.routes';
import filmRoutes from '../src/routes/film.routes'
import loggerRoute from "../src/routes/logger.routes"
import fs from "fs"
import https from "https"
import path from "path";
import swaggerUi from 'swagger-ui-express';

import swaggerRoute from "../src/routes/routes.swagger";
import swaggerDocument from  '../swagger.json';
import ValidationRegexService from "./services/validationRegexService";

const win = require('./winston/winstonLogger.ts')



const app = express();
const port = process.env.PORT || 3000;
const logger = win

// Middleware de logging utilisant Winston
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  
  next();
});
app.use(express.json());
app.use('/api', userRoutes)
app.use('/api', loggerRoute)
app.use('/api2', filmRoutes)
app.use("/api3", swaggerRoute)
const users : UserModel[] = []; // Simuler une base de données en mémoire



const options = {
  key: fs.readFileSync(path.join("./", 'key.pem')),
  cert: fs.readFileSync(path.join("./", 'cert.pem'))
};



// Servir la documentation Swagger via '/api-docs'
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Autres routes et middleware Express
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express! Connexion sécurisée.');
});






// Route simple pour tester
app.get('/', (req, res) => {
  res.send('Connexion HTTPS sécurisée');
});

// Créer le serveur HTTPS
https.createServer(options, app).listen(port, () => {
  console.log(`Serveur HTTPS en écoute sur <https://localhost>:${port}`);
});







