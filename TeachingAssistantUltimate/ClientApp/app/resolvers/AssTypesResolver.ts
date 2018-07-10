import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { HttpProvider } from "../providers/http-provider";
import { IAssTypes } from "../model/IAssTypes";
import { AssessTypeHttpProvider } from "../providers/ass-types-http-provider";

@Injectable()
export class AssTypesResolver implements Resolve<Observable<IAssTypes[]>> {
    resolve(route: ActivatedRouteSnapshot): Observable<IAssTypes[]> {
        return this.http.getAssTypes();
    }

    constructor(private http: AssessTypeHttpProvider) {

    }
}
