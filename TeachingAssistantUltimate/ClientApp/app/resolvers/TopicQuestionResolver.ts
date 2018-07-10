import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { HttpProvider } from "../providers/http-provider";
import { IQuestions } from "../model/IQuestsions";

@Injectable()
export class TopicQuestionsResolver implements Resolve<Observable<IQuestions[]>> {
    resolve(route: ActivatedRouteSnapshot): Observable<IQuestions[]> {
        return this.http.topicQuestions({ topic: route.paramMap.get("top") as string, sid: parseInt(route.paramMap.get("id") as string) });
    }

    constructor(private http: HttpProvider) {

    }
}
