


import SerieV2, { ISerie } from "../../models/v2/SerieV2";


export class SerieServiceV2 {


  
  public static async creatSerie(title: string, genre: string, status : string): Promise<any> {
   
    
    // Créer un nouvel utilisateur
    const serie = new SerieV2({
       title,
       genre,
       status,
     
    });

    // Sauvegarder l'utilisateur dans la base de données
    await serie.save();

    // Retourner l'utilisateur créé
    return serie;
  }



  public static async getAllSerie(): Promise<ISerie[]> {
    try {
      const series = await SerieV2.find();
      
      return series;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des movies: ' + error);
    }
  }


  

 
}