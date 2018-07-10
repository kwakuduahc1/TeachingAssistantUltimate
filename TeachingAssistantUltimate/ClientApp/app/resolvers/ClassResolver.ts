import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { IClasses } from "../model/IClasses";
import { ClassessHttpProvider } from "../providers/classes-http-provider";

@Injectable()
export class ClassResolver implements Resolve<Observable<IClasses>> {
    resolve(route: ActivatedRouteSnapshot): Observable<IClasses> {
        return this.http.find(parseInt(route.paramMap.get("id") as string)) as Observable<IClasses>;
    }

    constructor(private http: ClassessHttpProvider) {

    }
}
