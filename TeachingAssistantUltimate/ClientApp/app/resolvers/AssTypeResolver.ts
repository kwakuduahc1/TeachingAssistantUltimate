import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { HttpProvider } from "../providers/http-provider";
import { IAssTypes } from "../model/IAssTypes";
import { AssessTypeHttpProvider } from "../providers/ass-types-http-provider";

@Injectable()
export class AssTypeResolver implements Resolve<Observable<IAssTypes>> {
    resolve(route: ActivatedRouteSnapshot): Observable<IAssTypes> {
        return this.http.findAssTypes(parseInt(route.paramMap.get("id") as string)) as Observable<IAssTypes>;
    }

    constructor(private http: AssessTypeHttpProvider) {

    }
}
