export default class Film{
    titre: string
    annee: number
    desc: string

    constructor(titre : string, annee : number, desc : string){
        this.titre = titre
        this.annee = annee
        this.desc = desc
    }   
    toString() : string {
        return `Titre: ${this.titre}, Annee: ${this.annee}, desc: ${this.desc}`
    }
}