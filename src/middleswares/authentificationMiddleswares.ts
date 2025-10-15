// // src/middlewares/auth.middleware.ts
// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';

// const SECRET_KEY = 'secret_key';

// interface JwtPayload {
//   id: number;
//   username: string;
// }

// export function verifyToken(req: Request, res: Response, next: NextFunction) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) return res.status(403).json({ message: 'Token manquant' });

//   jwt.verify(token, SECRET_KEY, (err, decoded) => {
//     if (err) return res.status(401).json({ message: 'Token invalide' });

//     req.user = decoded as JwtPayload; // ⚙️ typage personnalisé (voir plus bas)
//     next();
//   });
// }
