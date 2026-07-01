import { Expose } from 'class-transformer';
import {IsInt} from 'class-validator'

export class LanguageListDto{
    @Expose()
    id:number;

    @Expose()
    title:string;

    @Expose()
    code:string;
}