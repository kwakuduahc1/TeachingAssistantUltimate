import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { HttpProvider } from "../providers/http-provider";
import { IQuestions } from "../model/IQuestsions";
import { ITopics } from "../model/ITopics";

@Injectable()
export class TopicsResolver implements Resolve<Observable<ITopics[]>> {
    resolve(route: ActivatedRouteSnapshot): Observable<ITopics[]> {
        return this.http.getTopics(parseInt(route.paramMap.get("id") as string));
    }

    constructor(private http: HttpProvider) {

    }
}
