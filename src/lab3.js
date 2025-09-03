// server.js
const express = require('express');
const app = express();
app.use(express.json());

// ===== Middleware de log (ligne de requête) =====
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
const routeCrud = require("../src/routes/crud")
// Servir des fichiers statiques

// les routes extrene prenne le dessus sur les routes de base


app.use(routeCrud)

// ===== Routes de démonstration HTTP =====

// GET simple

// Erreur volontaire


// Handler d’erreurs (toujours à la fin)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Erreur interne', detail: err.message });
});

app.listen(3000, () => console.log('Serveur prêt : http://localhost:3000'));
