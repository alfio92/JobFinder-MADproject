// dati relativi ad una richiesta da parte di un utente per un annuncio
// nome, cognome e id user con immagine, data creazione e risposta 
// fa parte del job

export interface JobRequest{

    id: number;
    jobadId: number;
    userId: number;
    nameuser: string;
    surnameuser: string;
    date: string;
    imageuser: string;
    status: string;

}