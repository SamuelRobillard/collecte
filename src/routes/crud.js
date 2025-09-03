const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.status(200).send('Bienvenue!');
});

// GET simple + en-tête custom
router.get('/hello', (req, res) => {
  res.set('X-Server', 'MV-Express');    // en-tête réponse
  res.status(200).send('Bonjour!');
});

// HEAD : renvoie seulement les en-têtes
router.head('/ping', (req, res) => res.status(200).end());

// Codes de statut à la demande (ex: /status/404)
router.get('/status/:code', (req, res) => res.sendStatus(Number(req.params.code)));

// ===== Ressource /users (CRUD) =====


let nextId = 3;
let users = [
  { id: 1, name: 'Alice', email: 'alice@example.com', role: 'student' },
  { id: 2, name: 'Bob',   email: 'bob@example.com',   role: 'student' },
];

// ===== Middlewares utilitaires =====
function findUser(req, res, next) {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'Utilisateur non trouvé' });
  req.user = user;
  next();
}

function validateUserPayload(req, res, next) {
  const { name, email, role } = req.body ?? {};
  if (!name || !email) return res.status(400).json({ error: 'name et email sont requis' });
  if (role && !['student', 'admin', 'teacher'].includes(role)) {
    return res.status(400).json({ error: "role doit être 'student' | 'admin' | 'teacher'" });
  }
  next();
}

// Liste + filtre ?q=
router.get('/users', (req, res) => {
  const q = (req.query.q || '').toLowerCase();
  const result = q
    ? users.filter(u => [u.name, u.email, u.role].some(v => String(v).toLowerCase().includes(q)))
    : users;
  res.status(200).json({ count: result.length, data: result });
});

// Lire par id
router.get('/users/:id', findUser, (req, res) => res.status(200).json(req.user));

// Créer
router.post('/users', validateUserPayload, (req, res) => {
  const { name, email, role = 'student' } = req.body;
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
    return res.status(409).json({ error: 'Email déjà utilisé' });
  }
  const user = { id: nextId++, name, email, role };
  users.push(user);
  res.status(201).location(`/users/${user.id}`).json(user);
});

// Remplacer (PUT)
router.put('/users/:id', findUser, validateUserPayload, (req, res) => {
  const { name, email, role = 'student' } = req.body;
  if (users.some(u => u.email.toLowerCase() === email.toLowerCase() && u.id !== req.user.id)) {
    return res.status(409).json({ error: 'Email déjà utilisé' });
  }
  Object.assign(req.user, { name, email, role });
  res.status(200).json(req.user);
});

// Modifier partiel (PATCH)
router.patch('/users/:id', findUser, (req, res) => {
  const allowed = ['name', 'email', 'role'];
  const payload = Object.fromEntries(
    Object.entries(req.body ?? {}).filter(([k]) => allowed.includes(k))
  );
  if ('role' in payload && !['student', 'admin', 'teacher'].includes(payload.role)) {
    return res.status(400).json({ error: "role doit être 'student' | 'admin' | 'teacher'" });
  }
  if ('email' in payload && users.some(u => u.email.toLowerCase() === payload.email.toLowerCase() && u.id !== req.user.id)) {
    return res.status(409).json({ error: 'Email déjà utilisé' });
  }
  Object.assign(req.user, payload);
  res.status(200).json(req.user);
});

// Supprimer
router.delete('/users/:id', findUser, (req, res) => {
  users = users.filter(u => u.id !== req.user.id);
  res.status(204).send();
});

router.get('/boom', (req, res) => { throw new Error('Oups 💥'); });
    module.exports = router;