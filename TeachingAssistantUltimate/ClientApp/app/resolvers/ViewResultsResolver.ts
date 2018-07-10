import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ISubjects } from "../model/ISubjects";
import { ResultsHttpProvider } from "../providers/results-http-provider";
import { IResultsDisplay } from "../model/IResultsDisplay";

@Injectable()
export class SubjectsResolver implements Resolve<IResultsDisplay> {
    resolve(route: ActivatedRouteSnapshot): IResultsDisplay | Observable<IResultsDisplay> {
        return this.http.viewResults(parseInt(route.paramMap.get("cid") as string), parseInt(route.paramMap.get("sid") as string));
    }

    constructor(private http: ResultsHttpProvider) {

    }
}
