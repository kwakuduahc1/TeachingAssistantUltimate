import { IResults } from "./IResults";

export interface IResultsEntry {
    studentsID: number;
    subjectsID: number;
    assessmentTypesID: number;
    score: number;
    totalScore: number;
    tag: string;
}