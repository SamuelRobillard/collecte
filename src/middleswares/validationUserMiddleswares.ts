import { Request, Response, NextFunction } from "express";
import ValidationRegexService from "../services/validationRegexService";

export function ValidateUser(req: Request, res: Response, next: NextFunction) {

  


  let { password } = req.body;
  if (!ValidationRegexService.validerPassword(password)) {
    return res.status(400).json({ error: "Password : Entrez 8 Characters minimums" });
  }
  next();







}

