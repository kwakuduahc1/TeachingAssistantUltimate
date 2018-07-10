import { IStudents } from "./IStudents";

export interface IClasses {
    classesID: number;
    className: number;
    indexPrefix: string;
    concurrency: string;
    students: IStudents[]
    padding: number;
}