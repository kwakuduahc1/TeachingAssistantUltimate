import { Component } from '@angular/core';
import { ITags } from '../../model/ITags';
import { ISubjects } from '../../model/ISubjects';
import { IResults } from '../../model/IResults';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHandler } from '../../providers/HttpHandler';
import { ResultsHttpProvider } from '../../providers/results-http-provider';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { IClasses } from '../../model/IClasses';
import { HttpErrorResponse } from '@angular/common/http';
import { IResultsDisplay } from '../../model/IResultsDisplay';
import { IAssTypes } from '../../model/IAssTypes';
import { rootRenderNodes } from '@angular/core/src/view';
import { IResultsEntry } from '../../model/IResultsEntry';

@Component({
    selector: 'bs-tag-results',
    templateUrl: './tag-results.component.html',
    styleUrls: ['./tag-results.component.css']
})
/** tag-results component*/
export class TagResultsComponent {
    tags: ITags[];
    _class: IClasses;
    subjects: ISubjects[];
    results: IResultsDisplay[] = [];
    form: FormGroup;
    editForm!: FormGroup;;
    status: boolean = true;
    types: IAssTypes[];

    constructor(route: ActivatedRoute, public hand: HttpHandler, private http: ResultsHttpProvider, private router: Router) {
        this.tags = route.snapshot.data["tags"] as ITags[];
        this.types = route.snapshot.data["types"] as IAssTypes[];
        this.subjects = route.snapshot.data["subjects"] as ISubjects[];
        this._class = route.snapshot.data["class"] as IClasses;
        this.form = new FormBuilder().group({
            tag: ["", Validators.compose([Validators.required, Validators.min(1)])],
            subjectsID: ["", Validators.compose([Validators.required, Validators.min(1)])]
        });
        this.editForm = new FormBuilder().group({
            studentsID: new FormControl({ value: "", disabled: true }),
            name: new FormControl({ value: "", disabled: true }),
            resultsID: new FormControl({ value: "", disabled: true }),
            indexNumber: new FormControl({ value: "", disabled: true }),
            assessmentTypesID: new FormControl({ value: "", disabled: true }),
            score: new FormControl({ value: "", disabled: false }, Validators.compose([Validators.required, Validators.min(0), Validators.max(0)])),
            totalScore: new FormControl({ value: "", disabled: true }),
            tag: new FormControl({ value: "", disabled: true }),
            subjectsID: new FormControl({ value: "", disabled: true })
        });
    }

    search(fm: { tag: ITags, subjectsID: number }) {
        this.hand.processing = true;
        this.hand.error = false;
        this.http.resultsByTags(fm.tag.tag, this._class.classesID, fm.subjectsID).subscribe(res => this.results = res, (err: HttpErrorResponse) => this.hand.handleError(err))
        this.hand.processing = false;
    }

    edit(res: any) {
        this.editForm = new FormBuilder().group({
            studentsID: [res.studentsID],
            name: [res.name],
            resultsID: [res.resultsID],
            indexNumber: [res.indexNumber],
            assessmentTypesID: [res.assessmentTypesID],
            score: [res.score, [Validators.compose([Validators.required, Validators.min(0), Validators.max(res.totalScore)])]],
            totalScore: [res.totalScore],
            tag: [res.tag],
            subjectsID: [res.subjectsID]
        });
        this.editForm.updateValueAndValidity({ onlySelf: true, emitEvent: true })
        this.status = false
    }

    cancelEdit() {
        this.status = true;
        console.log(this.status);
    }

    save(res: any) {
        if (confirm("Do you want to make the changes?")) {
            this.hand.processing = true;
            this.hand.error = false;
            this.http.edit(res as IResults).subscribe(_res => {
                alert("Changes were made successfully");
                this.search(this.form.value);
                this.status = !this.status;
            }, (err: HttpErrorResponse) => this.hand.handleError(err));
        }
        this.hand.processing = false;
    }
}