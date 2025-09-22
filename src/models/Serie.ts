import Media from "./Media"
import Saison from "./Saison";


class Serie extends Media{

    status: string
    saisons : Saison[]
    constructor(id: string, titre: string, genre: string, year: number, rating: number, status : string, saisons: Saison[]) {
    super(id, titre, genre, year, rating);
    this.status = status;
    this.saisons = saisons;
  }

  getSummary(): string {
      

    return Serie.toString()
  }
}