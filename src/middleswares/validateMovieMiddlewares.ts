import { Request, Response, NextFunction } from "express";

import ValidationRegexV2 from "../services/v2/ValidationRegexV2";

export function ValidateMovie(req: Request, res: Response, next: NextFunction) {

  


  let {title, genre, durationMin } = req.body;
  if (!ValidationRegexV2.validerTitre(title)) {
    return res.status(400).json({ error: "Title : Entre 1 et 200 charactere " });
  }
  else if (!ValidationRegexV2.validerGenre(genre)) {
    return res.status(400).json({ error: "Email invalide" });
  }
  else if (!ValidationRegexV2.validerDurationMinMovie(durationMin)) {
    return res.status(400).json({ error: "duree doit etre entre 1 et 600 minutes" });
  }
  
  next();







}

