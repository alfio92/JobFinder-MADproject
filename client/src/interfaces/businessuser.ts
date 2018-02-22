// dati di un attività
import { BusinessType } from './businesstype';

export interface BusinessUser{

    id: number;
    name: string;
    surname: string;
    birthdate: string;
    telnumber: string;
    email: string;
    password: string;
    description: string;
    businessname: BusinessType[];
    businesstype: string;
    businesscity: string;
    businessprov: string;
    businessaddress: string;
    businesslat: number;
    businesslong: number;
    image: string;

}