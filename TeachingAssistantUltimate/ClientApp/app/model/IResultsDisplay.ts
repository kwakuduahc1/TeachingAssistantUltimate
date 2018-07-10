import { IStudentSum } from "./IStudentSum";

export interface IResultsDisplay {
    resultsID: number;
    types: Array<{
        assessmentType: string,
        assessmentTypesID: number,
        total: number
    }>;
    results: Array<{
        studentsID: number;
        name: string;
        results: IStudentSum[]
    }>;
}