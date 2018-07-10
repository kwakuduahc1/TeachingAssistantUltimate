import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { IResults } from '../model/IResults';
import { IResultsDisplay } from '../model/IResultsDisplay';
import { ISubjects } from '../model/ISubjects';
import { IResultsEntry } from '../model/IResultsEntry';
import { ITags } from '../model/ITags';

@Injectable()
export class ResultsHttpProvider {

    viewResults(cid: number, sid: number): Observable<IResultsDisplay> {
        return this.http.get<IResultsDisplay>(`/Results/List?cid=${cid}&sid=${sid}`);
    }

    classSubjects(id: number): Observable<ISubjects[]> {
        return this.http.get<ISubjects[]>(`/Results/ClassSubjects?id=${id}`);
    }

    getTags(cid: number): Observable<ITags[]> {
        return this.http.get<ITags[]>(`Results/Tags?cid=${cid}`)
    }

    resultsByTags(tag: string, cid: number, sid: number): Observable<IResultsDisplay[]> {
        return this.http.get<IResultsDisplay[]>(`Results/TagResults?cid=${cid}&tag=${tag}&sid=${sid}`)
    }

    getAll(cid: number, sid: number): Observable<IResults[]> {
        return this.http.get<IResults[]>(`/Results/List?id=${cid}&sid=${sid}`);
    }


    find(id: number): Observable<IResults> {
        return this.http.get<IResults>(`/Results/Find?id=${id}`);
    }

    add(res: IResultsEntry[]): Observable<IResultsDisplay[]> {
        return this.http.post<IResultsDisplay[]>('/Results/Create', res);
    }

    edit(res: IResults): Observable<IResults> {
        return this.http.post<IResults>('/Results/Edit', res);
    }

    delete(res: IResults): Observable<IResults> {
        return this.http.post<IResults>('/Results/Delete', res);
    }

    constructor(private http: HttpClient) {

    }
}