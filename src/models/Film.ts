export default class Film{
    id : Number
    titre: string
    annee: number
    desc: string

    constructor(id : Number, titre : string, annee : number, desc : string){
        this.id = id
        this.titre = titre
        this.annee = annee
        this.desc = desc
    }   
    toString() : string {
        return `Titre: ${this.titre}, Annee: ${this.annee}, desc: ${this.desc}`
    }
}