const express = require('express');
const winston = require('winston');
const app = express();
const port = 3000;
// supprimer si bug et le fichier connectDB.js
// let  connectDB = () => {
//   require("./connectDB")
// } 

// connectDB()


// Configuration du logger avec Winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/app.log' })
  ]
});

// Middleware de logging utilisant Winston
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});
const userRoute = require("../src/routes/users")
// Servir des fichiers statiques

// les routes extrene prenne le dessus sur les routes de base


app.use(express.static('./src/public'));
app.use(userRoute)


// Route de base
app.get('/', (req, res) => {
  res.send('Bienvenue sur mon serveur Express!');
});

// Route pour afficher un message personnalisé
app.get('/hello/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Bonjour, ${name}!`);
});

// Route qui renvoie les informations sur le serveur
app.get('/info', (req, res) => {
  res.json({
    version: '1.0.0',
    description: 'Ceci est un serveur simple utilisant Express.js',
  });
});

// Route pour simuler une erreur
app.get('/cause-error', (req, res) => {
  throw new Error('Erreur simulée!');
});


app.post('/envoie', (req, res) => {
  res.send('Got a POST request')
})


// const MongoClient = require("mongodb").MongoClient;

// MongoClient.connect("mongodb://localhost:27017/animals", (err, client) => {
//   if (err) throw err;
//   let db = client.db("animals");
//   db.collection("mammals").find().toArray((err, result) => {
//     if (err) throw err;
//     console.log(result);
//     client.close();
//   });
// });



// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Une erreur est survenue!');
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur en écoute sur <http://localhost>:${port}`);
});