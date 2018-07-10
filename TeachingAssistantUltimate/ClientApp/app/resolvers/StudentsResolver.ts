import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { StudentsHttpProvider } from "../providers/students-http-provider";
import { IStudents } from "../model/IStudents";
import { parse } from "cfb/types";

@Injectable()
export class StudentsResolver implements Resolve<IStudents[]> {
    resolve(route: ActivatedRouteSnapshot): IStudents[] | Observable<IStudents[]> {
        return this.http.getAll(parseInt(route.paramMap.get("id") as string));
    }

    constructor(private http: StudentsHttpProvider) {

    }
}
