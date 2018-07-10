import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { IQuestions } from "../model/IQuestsions";
import { ITags } from "../model/ITags";
import { ResultsHttpProvider } from "../providers/results-http-provider";

@Injectable()
export class TagsResolver implements Resolve<Observable<ITags[]>> {
    resolve(route: ActivatedRouteSnapshot): Observable<ITags[]> {
        return this.http.getTags(parseInt(route.paramMap.get("id") as string));
    }

    constructor(private http: ResultsHttpProvider) {

    }
}
