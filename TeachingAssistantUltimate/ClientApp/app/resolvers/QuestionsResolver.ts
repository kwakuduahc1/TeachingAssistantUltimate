import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { HttpProvider } from "../providers/http-provider";
import { IQuestions } from "../model/IQuestsions";

@Injectable()
export class QuestionsResolver implements Resolve<Observable<IQuestions[]>> {
    resolve(route: ActivatedRouteSnapshot): Observable<IQuestions[]> {
        return this.http.getQuestions(parseInt(route.paramMap.get("id") as string));
    }

    constructor(private http: HttpProvider) {

    }
}
