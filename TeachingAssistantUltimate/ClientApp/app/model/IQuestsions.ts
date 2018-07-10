import { IOptions } from "./IOptions";
import { ISubjects } from "./ISubjects";

export interface IQuestions {
    questionsID: number;
    question: string;
    topic: string;
    subjectsID: number;
    concurrency: string;
    options: IOptions[];
    subject: ISubjects;
}
