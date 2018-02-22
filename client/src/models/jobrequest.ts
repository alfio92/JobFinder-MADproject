// dati relativi ad una richiesta da parte di un utente per un annuncio
// nome, cognome e id user con immagine, data creazione e risposta 
// fa parte del job

export class JobRequest{

    iduser: number;
    nameuser: string = "";
    surnameuser: string = "";
    imageuser: string = "";
    response: string = "";

}