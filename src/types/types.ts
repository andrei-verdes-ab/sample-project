import { MysqlError } from "mysql";

export interface IDBManager {
    ReadData(query: string, paramCollection: (number | string | boolean)[]): Promise<any | MysqlError>

    InsertOrUpdateData(query: string, paramCollection: (number | string | boolean)[]): Promise<any | MysqlError>

    DeleteData(query: string, paramCollection: (number | string | boolean)[]): Promise<any | MysqlError>
}

export type MySqlType = MysqlError | any;

export interface IStudent {
    id?: number;
    name: string;
    email: string;
    age: number;
}

export interface IGrades {
    id? : number;
    date?: Date;
    subject: string;
    comment: string;
    grade: number;
    student: string;
}

export interface ISubjects {
    id? : number;
    name : string;
    description?: string;
}

export interface ITeachers {
    id? : number;
    firstname : string;
    lastname : string;
    subject : string;
    subject_optional? : string;
}