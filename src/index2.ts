import { UserModel } from "./models/user.model";
import express, {Request, Response} from 'express';
import userRoutes from './routes/user.routes';
import userRoutesv2 from "./routes/user.routes.v2"
import filmRoutes from './routes/film.routes'
import fs from "fs"
import https from "https"
import path from "path";
import swaggerUi from 'swagger-ui-express';
import http  from 'http'
import swaggerRoute from "./routes/routes.swagger";
import swaggerDocument from  '../swagger.json';


const app = express();
const port = process.env.PORT || 3000;
const httpPort = process.env.HTTP_PORT || 80;

app.use(express.json());
app.use('/api/v1', userRoutes)
app.use('/api/v2', userRoutesv2)
app.use('/api2', filmRoutes)
app.use("/api3", swaggerRoute)
const users : UserModel[] = []; // Simuler une base de données en mémoire



const options = {
  key: fs.readFileSync(path.join("../collecte", 'key.pem')),
  cert: fs.readFileSync(path.join("../collecte", 'cert.pem'))
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

http.createServer((req, res) => {
  res.writeHead(301, { "Location": `https://localhost:${port}${req.url}` });
  res.end();
}).listen(httpPort, () => {
  console.log(`Serveur HTTP en écoute sur <http://localhost>:${httpPort}`);
});