export default class Exo1Regex{


   static validatePassword  (password : string) : boolean {
    // au moins i chifre, un miniscule, un majuscule un non alphanumerique et 8 de n'importe quoi minimum
    const passwordRegex: RegExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?=.).{8,}/;
        return passwordRegex.test(password)
       
    }
    static cleanString  (string : string) : string {
        // supprime tout les espace et remplace en ' ' (un seul espace)
        // donc si ya "   " ca deveint " "

        const noSpace: RegExp = /\s+/g;
        return string.trim().replace(noSpace, ' ')
           
        }
    
    static onlyNumberInPhone  (string : string) : string {
        // \D tout ce qui n'est pas un chiffre [^0-9]
        const phoneRegex: RegExp = /\D/g;
        // enleve les espace debut/fin et remplace tout ce qui n'estpas chiffre par '' meaning que c'est supprimé
        return string.trim().replace(phoneRegex, '')
         
           
        }
}