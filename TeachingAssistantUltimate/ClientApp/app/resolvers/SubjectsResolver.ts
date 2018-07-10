import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ISubjects } from "../model/ISubjects";
import { HttpProvider } from "../providers/http-provider";

@Injectable()
export class SubjectsResolver implements Resolve<ISubjects[]> {
    resolve(route: ActivatedRouteSnapshot): ISubjects[] | Observable<ISubjects[]> {
        return this.http.getSubjects();
    }

    constructor(private http: HttpProvider) {

    }
}
