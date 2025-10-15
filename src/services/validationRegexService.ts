
import { errorLogger } from "../winston/winstonError";


export default class ValidationRegexService {

    
    static validerTitre(input: string): boolean {
        const regex = /^[A-Za-z0-9À-ÿ ]+$/;
        console.log(regex.test(input))
        if (regex.test(input)) {

            return true
        } else {

            const error: any = new Error("Seuls les lettres, chiffres et espaces sont autorisés.");
            error.status = 400;
            errorLogger.error((`Validation titre échouée: ${error.message} error status : ${error.status}`))
            return false
        }
    }
    static validerPassword(input: string): boolean {
        input = this.cleanString(input)
        const regex = /^[^\s]{8,}$/;
        console.log(regex.test(input))
        if (regex.test(input)) {

            return true
        } else {

            const error: any = new Error("Password : Entrez un minimum de 8 characteres");
            error.status = 400;
            errorLogger.error((`Validation titre échouée: ${error.message} error status : ${error.status}`))
            return false
        }
    }
    static validerGenre(input: string): boolean {
        const regex = /^[A-Za-zÀ-ÿ]+$/;

        if (regex.test(input)) {

            return true
        } else {
            const error: any = new Error("Seuls les lettres sont autorisés.");
            error.status = 400;

            errorLogger.error((`Validation plateforme échouée: ${error.message} error status : ${error.status}`))
            return false
        }
    }

    static validerDuree(input: string): boolean {
        const regex = /^[0-9]+$/;

        if (regex.test(input) && input !== "0") {

            return true
        } else {
            const error: any = new Error("Seuls les chiffres positifs sont autorisés.");
            error.status = 400;
            errorLogger.error((`Validation duree échouée: ${error.message} error status : ${error.status}`))

            return false
        }
    }

    static validerStatus(input: string): boolean {
        const regex = /^(en_attente|en_cours|terminee)$/;

        if (regex.test(input)) {

            return true
        } else {
            const error: any = new Error("Seuls les status en_attente, en_cours et terminee sont autorisé.");
            error.status = 400;

            errorLogger.error((`Validation status échouée: ${error.message} error status : ${error.status}`))
            return false
        }
    }



    static cleanString(string: string): string {
        // supprime tout les espace et remplace en ' ' (un seul espace)
        // donc si ya "   " ca deveint " "

        const noSpace: RegExp = /\s+/g;
        return string.trim().replace(noSpace, ' ')

    }





}