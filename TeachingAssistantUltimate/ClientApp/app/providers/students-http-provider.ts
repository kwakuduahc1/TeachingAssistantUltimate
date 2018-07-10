import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { IStudents } from '../model/IStudents';

@Injectable()
export class StudentsHttpProvider {

    getAll(id:number): Observable<IStudents[]> {
        return this.http.get<IStudents[]>(`/Students/List?id=${id}`);
    }

    find(id: number): Observable<IStudents> {
        return this.http.get<IStudents>(`/Students/Find?id=${id}`);
    }

    add(stds: IStudents[]): Observable<IStudents[]> {
        return this.http.post<IStudents[]>('/Students/Create', stds);
    }

    edit(std: IStudents): Observable<IStudents> {
        return this.http.post<IStudents>('/Students/Edit', std);
    }

    delete(std: IStudents): Observable<IStudents> {
        return this.http.post<IStudents>('/Students/Delete', std);
    }

    constructor(private http: HttpClient) {

    }
}