import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ISubjects } from "../model/ISubjects";
import { ResultsHttpProvider } from "../providers/results-http-provider";

@Injectable()
export class ClassSubjectsResolver implements Resolve<ISubjects[]> {
    resolve(route: ActivatedRouteSnapshot): ISubjects[] | Observable<ISubjects[]> {
        return this.http.classSubjects(parseInt(route.paramMap.get("id") as string));
    }

    constructor(private http: ResultsHttpProvider) {

    }
}
