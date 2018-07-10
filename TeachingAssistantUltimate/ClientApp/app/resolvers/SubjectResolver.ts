import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ISubjects } from "../model/ISubjects";
import { HttpProvider } from "../providers/http-provider";

@Injectable()
export class SubjectResolver implements Resolve<Observable<ISubjects>> {
    resolve(route: ActivatedRouteSnapshot): Observable<ISubjects> {
        return this.http.getSubject(parseInt(route.paramMap.get("id") as string)) as Observable<ISubjects>;
    }

    constructor(private http: HttpProvider) {

    }
}
