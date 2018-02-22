// dati utente
import {Skill} from "./skill";

export interface User{

    id: number;
    name: string;
    surname: string;
    birthdate: string;
    gender: string;
    city: string;
    province: string;
    address: string;
    telnumber: string;
    email: string;
    password: string;
    study: string;
    description: string;
    skills: Skill[];
    curriculum: string;
    image: string;

}