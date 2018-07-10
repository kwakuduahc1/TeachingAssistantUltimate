import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { IClasses } from '../model/IClasses';

@Injectable()
export class ClassessHttpProvider {

    getAll(): Observable<IClasses[]> {
        return this.http.get<IClasses[]>("/Classes/List");
    }

    find(id: number): Observable<IClasses> {
        return this.http.get<IClasses>(`/Classes/Find?id=${id}`);
    }

    add(ass: IClasses): Observable<IClasses> {
        return this.http.post<IClasses>('/Classes/Create', ass);
    }

    edit(ass: IClasses): Observable<IClasses> {
        return this.http.post<IClasses>('/Classes/Edit', ass);
    }

    delete(ass: IClasses): Observable<IClasses> {
        return this.http.post<IClasses>('/Classes/Delete', ass);
    }

    constructor(private http: HttpClient) {

    }
}