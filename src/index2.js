const express = require('express');
const app = express();
const port = 3000;

const userRoutes = require('./routes/users');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route de base
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Utiliser les routes définies dans le fichier users.js
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Serveur en écoute sur <http://localhost>:${port}`);
});