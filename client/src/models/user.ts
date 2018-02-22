// dati utente
import { Skill } from  './skill' ;

export class User{

    id: number;
    name: string = "";
    surname: string = "";
    birthdate: string = "";
    gender: string = "";
    city: string = "" ;
    address: string = "";
    telnumber: string = "";
    email: string = "";
    password: string = "";
    study: string = "";
    description: string = "";
    skills: Skill[] = [];
    curriculum: string[] = [];

}