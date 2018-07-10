import { Component } from '@angular/core';
import { IClasses } from '../../model/IClasses';
import { ISubjects } from '../../model/ISubjects';
import { IResultsDisplay } from '../../model/IResultsDisplay';
import { ActivatedRoute, Router } from '@angular/router';
import { ResultsHttpProvider } from '../../providers/results-http-provider';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHandler } from '../../providers/HttpHandler';
import { PrintProviderService } from '../../providers/print-provider.service';

@Component({
    selector: 'bs-viw-results',
    templateUrl: './viw-results.component.html',
    styleUrls: ['./viw-results.component.css']
})
/** viw-results component*/
export class ViwResultsComponent {
    _class: IClasses;
    subjects: ISubjects[];
    results: IResultsDisplay = { resultsID: 0, results: [], types: [] };
    subject: any;
    header: string = "";
    constructor(route: ActivatedRoute, private router: Router, private http: ResultsHttpProvider, private hand: HttpHandler, private printer: PrintProviderService) {
        this._class = route.snapshot.data['class'] as IClasses;
        this.subjects = route.snapshot.data['subjects'] as ISubjects[];
    }

    get(id: number) {
        this.http.viewResults(this._class.classesID, id).subscribe(res => this.results = res, ((err: HttpErrorResponse) => this.hand.handleError(err)))
    }

    print(): void {
        this.printer.print(`${this.subjects[0].subject} : ${this.subjects[0].subjectCode}`);
    }
}