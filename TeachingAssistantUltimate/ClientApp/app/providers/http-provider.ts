import { Injectable } from '@angular/core';
import { ISubjects } from '../model/ISubjects';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { IQuestions } from '../model/IQuestsions';
import { ITests } from '../model/ITests';
import { ITopics } from '../model/ITopics';
import { IAssTypes } from '../model/IAssTypes';

@Injectable()
export class HttpProvider {

    genQuestions(args: ITests): Observable<IQuestions[]> {
        return this.http.post<IQuestions[]>("/Questions/Generate", args)
    }

    addQuestion(quest: IQuestions): Observable<IQuestions> {
        return this.http.post<IQuestions>("/Questions/Create", quest);
    }

    addSubject(sub: ISubjects): Observable<ISubjects> {
        return this.http.post<ISubjects>("/Subjects/Create", sub);
    }

    getSubjects(): Observable<ISubjects[]> {
        return this.http.get<ISubjects[]>("/Subjects/List");
    }

    getSubject(id: number): Observable<ISubjects> {
        return this.http.get<ISubjects>(`/Subjects/Find?id=${id}`);
    }

    editSubject(sub: ISubjects): Observable<ISubjects> {
        return this.http.post<ISubjects>("/Subjects/Edit", sub);
    }

    deleteSubject(sub: ISubjects) {
        return this.http.post("/Subjects/Delete", sub);
    }

    getQuestions(id: number): Observable<IQuestions[]> {
        return this.http.get<IQuestions[]>(`/Questions/List?id=${id}`);
    }

    getTopics(id: number): Observable<ITopics[]> {
        return this.http.get<ITopics[]>(`/Questions/Topics/${id}`);
    }

    FindQuestion(id: string): Observable<IQuestions> {
        return this.http.get<IQuestions>(`/Questions/Find?id=${id}`)
    }

    editQuestion(que: IQuestions): Observable<IQuestions> {
        return this.http.post<IQuestions>("/Questions/Edit", que);
    }

    deleteQuestion(que: IQuestions): Observable<IQuestions> {
        return this.http.post<IQuestions>("/Questions/Delete", que);
    }

    topicQuestions(fm: { topic: string, sid: number }): Observable<IQuestions[]> {
        return this.http.get<IQuestions[]>(`/Questions/TopicQuestions?topic=${fm.topic}&sid=${fm.sid}`);
    }

    print(id:number) {
        return this.http.get(`/Print/Index?id=${id}`);
    }

    constructor(private http: HttpClient) {

    }
}