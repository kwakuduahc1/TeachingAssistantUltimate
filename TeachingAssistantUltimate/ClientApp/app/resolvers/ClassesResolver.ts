import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { HttpProvider } from "../providers/http-provider";
import { ClassessHttpProvider } from "../providers/classes-http-provider";
import { IClasses } from "../model/IClasses";

@Injectable()
export class ClassesResolver implements Resolve<Observable<IClasses[]>> {
    resolve(route: ActivatedRouteSnapshot): Observable<IClasses[]> {
        return this.http.getAll();
    }

    constructor(private http: ClassessHttpProvider) {

    }
}
