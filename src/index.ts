import { UserModel } from "./models/user.model";
import express, {Request, Response} from 'express';
import userRoutes from './routes/user.routes';
import loggerRoute from "./routes/logger.routes"
import mediaRoute from "./routes/Media.routes"
import episodeRoute from "./routes/EpisodeRoute"
import saisonRoute from "./routes/SaisonRoute"
import fs from "fs"
import https from "https"
import path from "path";
import swaggerUi from 'swagger-ui-express';
import { MongoClient, ServerApiVersion } from 'mongodb'
import swaggerRoute from "./routes/routes.swagger";
import swaggerDocument from  '../swagger.json';
import ValidationRegexService from "./services/validationRegexService";
import http  from 'http'
import { readData } from "./utils/jsonHandler";
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
app.use('/api', mediaRoute)
app.use('/api', loggerRoute)
app.use('/api', episodeRoute)
app.use('/api', saisonRoute)


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




const uri = "mongodb+srv://6222321:password11@cluster0.nvvmrgg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/e-commerce-db";


const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(uri); 
   
    console.log('MongoDB connected successfully!');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the application on connection failure
  }
}
const mageSchema = new mongoose.Schema({
  name: {
      type: String,
      require: true
  },
  power_type: {
      type: String,
      require: true
  },
  mana_power: Number,
  health: Number,
  gold: Number
})

const Mage = new mongoose.model("Mage", mageSchema)

const mage_1 = new Mage({
  name: "Takashi",
  power_type: 'Element',
  mana_power: 200,
  health: 1000,
  gold: 10000
});
connectDB();
mage_1.save();
