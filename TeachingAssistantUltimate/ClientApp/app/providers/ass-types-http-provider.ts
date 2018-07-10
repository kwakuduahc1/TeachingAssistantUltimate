import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { IAssTypes } from '../model/IAssTypes';

@Injectable()
export class AssessTypeHttpProvider {

    getAssTypes(): Observable<IAssTypes[]> {
        return this.http.get<IAssTypes[]>("/AssessTypes/List");
    }

    findAssTypes(id: number): Observable<IAssTypes> {
        return this.http.get<IAssTypes>(`/AssessTypes/Find?id=${id}`);
    }

    addAssTypes(ass: IAssTypes): Observable<IAssTypes> {
        return this.http.post<IAssTypes>('/AssessTypes/Create', ass);
    }

    editAssTypes(ass: IAssTypes): Observable<IAssTypes> {
        return this.http.post<IAssTypes>('/AssessTypes/Edit', ass);
    }

    deleteAssTypes(ass: IAssTypes): Observable<IAssTypes> {
        return this.http.post<IAssTypes>('/AssessTypes/Delete', ass);
    }

    constructor(private http: HttpClient) {

    }
}