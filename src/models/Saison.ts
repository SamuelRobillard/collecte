import Episode from "./Episode";

export default class Saison {
    seasonNumber : Number;
    releaseDate : Date;
    episodes : Episode[]

    constructor(seasonNumber : number, realeaseDate : Date, episodes : Episode[]){
        this.seasonNumber = seasonNumber;
        this.releaseDate = realeaseDate;
        this.episodes = episodes;
    }
}