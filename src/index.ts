
import express, {Request, Response} from 'express';
import userRoutes from './routes/user.routes';
import loggerRoute from "./routes/logger.routes"
import mediaRoute from "./routes/Media.routes"
import episodeRoute from "./routes/EpisodeRoute"
import saisonRoute from "./routes/SaisonRoute"
import userRouteV2 from "./routes/v2/user.routes.v2";
import fs from "fs"
import https from "https"
import path from "path";
import swaggerUi from 'swagger-ui-express';;
import swaggerDocument from  './swagger/swaggerApi1.json';
import swaggerDocumentV2 from  './swagger/swaggerApi2.json';
import http  from 'http'
import connectDB from "./data/DbMongo";
import MovieRouteV2 from "./routes/v2/MovieV2.route"
import SerieRouteV2 from "./routes/v2/SerieRouteV2"
import SeasonRouteV2 from "./routes/v2/SeasonRouteV2"
import EpisodeRouteV2 from "./routes/v2/EpisodeRouteV2"
import RatingRouteV2 from "./routes/v2/RatingRouteV2"
import dotenv from 'dotenv';
dotenv.config();


const win = require('./winston/winstonLogger')



const app = express();
const port = process.env.PORT || 3000;
const logger = win

// Middleware de logging utilisant Winston
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  
  next();
});
app.use(express.json());
app.use('/api/v1', userRoutes)
app.use('/api/v1', mediaRoute)
app.use('/api/v1', loggerRoute)
app.use('/api/v1', episodeRoute)
app.use('/api/v1', saisonRoute)


app.use('/api/v2', userRouteV2)
app.use('/api/v2', MovieRouteV2)
app.use('/api/v2', SerieRouteV2)
app.use('/api/v2', SeasonRouteV2)
app.use('/api/v2', EpisodeRouteV2)
app.use('/api/v2', RatingRouteV2)




app.use('/docs/v1', swaggerUi.serveFiles(swaggerDocument), swaggerUi.setup(swaggerDocument));
app.use('/docs/v2', swaggerUi.serveFiles(swaggerDocumentV2), swaggerUi.setup(swaggerDocumentV2));





const options = {
  key: fs.readFileSync(path.join("./", 'key.pem')),
  cert: fs.readFileSync(path.join("./", 'cert.pem'))
};



// Servir la documentation Swagger via '/api-docs'


// Autres routes et middleware Express
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express! Connexion sécurisée.');
});








// Créer le serveur HTTPS
https.createServer(options, app).listen(port, () => {
  console.log(`Serveur HTTPS en écoute sur <https://localhost>:${port}`);
});




http.createServer((req, res) => {
  res.writeHead(301, { "Location": `https://localhost:${port}${req.url}` });
  res.end();
}).listen(80, () => {
  console.log(`Serveur HTTP en écoute sur <http://localhost>:${80}`);
});





const run = async () => {
  // Connect to MongoDB
  await connectDB();
  

  
 
};

run();
