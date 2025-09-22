
import Media from "./Media";
import { error } from "console";

export default class User{

    
    id : string;
    email : string;
    password : string;
    role : string;
    favorites : Media[]

    constructor(id : string, email : string, password : string, role : string, favorites : Media[]){
        this.id = id;
        this.email = email;
        this.password = password;
        role == "user" || role == "admin" ? this.role = role : this.role = "user"
        this.favorites = favorites;
    }

    addFavorite(media : Media){
        this.favorites.push(media)
    }
    removeFavorite(mediaId : string){
        this.favorites = this.favorites.filter(media => media.id !== mediaId);
    }
}