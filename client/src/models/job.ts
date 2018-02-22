// dati relativi ad un annuncio postato da un attività
import { JobRequest } from './jobrequest';

export class Job{

    id: number;
    jobtype: string = "";
    businessname: string = "";
    businesstype: string = "";
    city: string = "";
    address: string = "";
    openposition: number;
    cash: number;
    period: string = "";
    time: string = "";
    description: string = "";
    insertdate: string = "";
    requests: JobRequest[] = [];

}