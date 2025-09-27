import { Request, Response, NextFunction } from "express";
import ValidationRegexService from "../services/validationRegexService";

export function validateMedia(req: Request, res: Response, next: NextFunction) {
  let { type, titre, genre, year, rating, duration, watched, status, saisonsId } = req.body;

  titre = ValidationRegexService.cleanString(titre)
  genre = ValidationRegexService.cleanString(genre)
  
 
    if(!ValidationRegexService.validerTitre(titre)){
      return res.status(400).json({ error: "Titre : Seuls les lettres, chiffres et espaces sont autorisés." });
    }
    if(!ValidationRegexService.validerGenre(genre)){
      return res.status(400).json({ error: "Genre : Seuls les lettres sont autorisés" });
    }
    if(type == "serie"){
       if(!ValidationRegexService.validerStatus(status)){
      return res.status(400).json({ error:"Seuls les status en_attente, en_cours et terminee sont autorisé." });
    }
   
    }
    if(!ValidationRegexService.validerDuree(duration)){
      return res.status(400).json({ error: "Duree : Seuls les chiffres positifs sont autorisés." });
    }
    if (!type || (type !== "film" && type !== "serie")) {
      return res.status(400).json({ error: "Le champ 'type' doit être 'film' ou 'serie'" });
  }
  if (typeof titre !== "string" || typeof genre !== "string") {
    return res.status(400).json({ error: "Champs de base invalides (id, titre, genre)" });
  }
  if (typeof year !== "number" || typeof rating !== "number") {
    return res.status(400).json({ error: "Champs 'year' et 'rating' doivent être des nombres" });
  }

  
  if (type === "film") {
    if (typeof duration !== "number" || duration <= 0) {
      return res.status(400).json({ error: "Film: duration requise dois etre superieur à 0" });
    }
    if (typeof watched !== "boolean") {
      return res.status(400).json({ error: "Film: watched doit être un vrai ou faux" });
    }
  }

  
  if (type === "serie") {
    if (typeof status !== "string") {
      return res.status(400).json({ error: "Serie: 'status' est requis" });
    }
    if (!Array.isArray(saisonsId) || saisonsId.length === 0) {
      return res.status(400).json({ error: "Serie: doit avoir une liste de saisons" });
    }

   
    
  }
  req.body.titre = titre
  req.body.genre = genre
  next();
  
  
  

  
 
  
}


//  for (const saison of saisons) {
//       if (
//         typeof saison.seasonNumber !== "number" ||
//         saison.seasonNumber <= 0
        
//       ) {
//         return res.status(400).json({ error: "Chaque saison doit avoir au moins un episode" });
//       }

//       if (!Array.isArray(saison.episodes)) {
//         return res.status(400).json({ error: "Chaque saison doit avoir une liste 'episodes'" });
//       }

//       for (const ep of saison.episodes) {
//         if (
//           typeof ep.id !== "string" ||

//           typeof ep.episodeNumber !== "number" ||
//           ep.episodeNumber <= 0 ||
//           typeof ep.title !== "string" ||
//           typeof ep.duration !== "number" ||
//           ep.duration <= 0 ||
//           typeof ep.watched !== "boolean"

//         ) {
//           return res.status(400).json({ error: "Chaque épisode doit avoir un id, un titre, un nombre,une durée et si elle à été vu ou pas" });
//         }
//       }