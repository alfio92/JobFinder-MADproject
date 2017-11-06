// dati relativi ad un annuncio postato da un attività
import { JobRequest } from './jobrequest';

export interface Job{

    id: number;
    jobtype: string;
    insertdate: string;
    businessname: string;
    businesstype: string;
    businesscity: string;
    businessprov: string;
    businessaddress: string;
    businesslat: number;
    businesslng: number;
    numpositions: number;
    cash: string;
    initperiod: string;
    endperiod: string;
    initday: string;
    endday: string;
    inittime: string;
    endtime: string;
    extra: boolean;
    expired: boolean;
    description: string;
    jobrequests: JobRequest[];      //richieste per il dato annuncio

}