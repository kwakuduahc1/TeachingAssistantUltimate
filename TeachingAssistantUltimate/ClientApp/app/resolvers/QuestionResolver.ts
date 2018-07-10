import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { HttpProvider } from "../providers/http-provider";
import { IQuestions } from "../model/IQuestsions";

@Injectable()
export class QuestionResolver implements Resolve<Observable<IQuestions>> {
    resolve(route: ActivatedRouteSnapshot): Observable<IQuestions> {
        return this.http.FindQuestion(route.paramMap.get("id") as string) as Observable<IQuestions>;
    }

    constructor(private http: HttpProvider) {

    }
}
