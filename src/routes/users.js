const express = require('express');
const router = express.Router();

// Route pour récupérer tous les utilisateurs
router.get('/test', (req, res) => {
  res.send('test des utilisateurs');
});

// Route pour récupérer un utilisateur par ID
router.get('/user/:id', (req, res) => {
  res.send(`Utilsssisateur avec ID ${req.params.id}`);
});

module.exports = router;