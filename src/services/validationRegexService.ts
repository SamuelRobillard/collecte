
import { errorLogger } from "../winston/winstonError";


export default class ValidationRegexService{


    static validerTitre(input: string):  string |null {
        const regex = /^[A-Za-z0-9 ]+$/;

        if (regex.test(input)) {
            
            return this.cleanString(input)
        } else {
            
            const error: any = new Error("Seuls les lettres, chiffres et espaces sont autorisés.");
            error.status = 400; 
            errorLogger.error((`Validation titre échouée: ${error.message} error status : ${error.status}` ))
            return null
            }
        }
    static validerPlateforme(input: string):  string | null {
        const regex = /^[A-Za-z]+$/;

        if (regex.test(input)) {
            
            return this.cleanString(input)
        } else {
            const error: any = new Error("Seuls les lettres sont autorisés.");
            error.status = 400; 
            
            errorLogger.error((`Validation plateforme échouée: ${error.message} error status : ${error.status}`))
            return null
            }
        }
   
    static validerDuree(input: string):  string | null {
        const regex = /^[0-9]+$/;

        if (regex.test(input) && input !== "0") {
            
            return this.cleanString(input)
        } else {
            const error: any = new Error("Seuls les chiffres positifs sont autorisés.");
            error.status = 400; 
            errorLogger.error((`Validation duree échouée: ${error.message} error status : ${error.status}`))
            
            return null
            }
        }
   
    static validerStatus(input: string):  string | null {
            const regex = /^(en_attente|en_cours|terminee)$/;

            if (regex.test(input)) {
                
                return this.cleanString(input)
            } else {
                const error: any = new Error("Seuls les status en_attente, en_cours et terminee sont autorisé.");
                error.status = 400; 
                
                errorLogger.error((`Validation status échouée: ${error.message} error status : ${error.status}`))
                return null
                }
            }



         static cleanString  (string : string) : string {
        // supprime tout les espace et remplace en ' ' (un seul espace)
        // donc si ya "   " ca deveint " "

        const noSpace: RegExp = /\s+/g;
        return string.trim().replace(noSpace, ' ')
           
        }
}