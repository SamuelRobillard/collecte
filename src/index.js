const { isUtf8 } = require('buffer');
const express = require('express');
const app = express();
const port = 8000;

const userRoute = require("./routes/users")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


let middlewareFunction = (req, res, next) => {
  console.log("middleware exécuter ")
  next();
  
  // Logique du middleware
  
};
// mettre avant les get (route)
app.use(middlewareFunction);

app.get('/user', (req, res, next) => {
  console.log('Middleware pour la route /user');
  next();

  //function callback
}, (req, res) => {
  res.send('Profil utilisateur');
});

app.get('/', (req, res) => {
  res.send('Helo, Wosrlsd!');
});

app.get('/express', (req, res) => {
  res.send('Helo, express!');
});

app.get('/user/:id', (req, res) => {
  res.send(`Utilisateur avec ID ${req.params.id}`);
});




// listen demarre le server
app.listen(port, () => {
  console.log(`Serveur en écoute sur <http://localhost>:${port}`);
});



const fs = require('fs');
fs.writeFileSync('test.txt', 'Bonjour Node.js !');
console.log("methot sync: " + fs.readFileSync("test.txt", 'utf-8'))
const fsPromise = require('fs').promises;

async function readFile() {
  try {
    const data = await fsPromise.readFile('test.txt', 'utf8');
    console.log("method async: " + data);
  } catch (err) {
    console.error(err);
  }
}

async function writeFileAsync() {
  try {
    await fsPromise.writeFile('testAsync.txt', 'test de async');
    console.log("written");
  } catch (err) {
    console.error(err);
  }
}

const EventEmitter = require('events');
const emitter = new EventEmitter();

emitter.on('lol', (nom, age) => {
  console.log(`Bonjour ${nom + " " + age} !`);
});

emitter.emit('lol', 'Alice', 1);



readFile();
writeFileAsync();
console.log("fin mais affiche avant methode asyncrone")