import { Component } from '@angular/core';
import { IStudents } from '../../model/IStudents';
import { IClasses } from '../../model/IClasses';
import { StudentsService } from '../../../Services/students.service';
import { StudentsHttpProvider } from '../../providers/students-http-provider';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpHandler } from '../../providers/HttpHandler';
import { ISubjects } from '../../model/ISubjects';
import { IAssTypes } from '../../model/IAssTypes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IResults } from '../../model/IResults';
import { ResultsHttpProvider } from '../../providers/results-http-provider';
import { IResultsDisplay } from '../../model/IResultsDisplay';

@Component({
    selector: 'bs-add-results',
    templateUrl: './add-results.component.html',
    styleUrls: ['./add-results.component.css']
})
/** add-results component*/
export class AddResultsComponent {
    students: IStudents[];
    _class: IClasses;
    subjects: ISubjects[];
    types: IAssTypes[];
    form: FormGroup;
    res_form: FormGroup[];
    max: number = 20;
    status: boolean = true;
    constructor(stds: StudentsService, private http: ResultsHttpProvider, private hand: HttpHandler, private router: Router, route: ActivatedRoute) {
        this.students = route.snapshot.data["students"];
        this._class = route.snapshot.data["class"];
        this.subjects = route.snapshot.data["subjects"];
        this.types = route.snapshot.data["types"];
        this.res_form = this.initResForm(new FormBuilder());
        this.form = this.initForm(new FormBuilder());
    }

    initForm(fb: FormBuilder): FormGroup {
        return fb.group({
            subjectsID: ['', Validators.compose([Validators.required])],
            assessmentTypesID: ['', Validators.compose([Validators.required])],
            tag: ["", Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
            max: [this.max, Validators.compose([Validators.required, Validators.max(100), Validators.min(5)])]
        });
    }

    initResForm(fb: FormBuilder): FormGroup[] {
        let form: FormGroup[] = [];
        this.students.forEach(x => {
            form.push(fb.group({
                score: [0, Validators.compose([Validators.required, Validators.min(0), Validators.max(this.max)])],
                name: [x.name],
                indexNumber: [x.indexNumber],
                studentsID: [x.studentsID]
            }))
        });
        return form;
    }
    save(fm: FormGroup, fgs: FormGroup[]) {
        let res: IResults[] = [];
        fgs.forEach(x => res.push({
            assessmentTypesID: fm.value["assessmentTypesID"],
            score: x.value["score"],
            studentsID: x.value["studentsID"],
            subjectsID: fm.value["subjectsID"],
            totalScore: fm.value["max"],
            tag:fm.value['tag']
        } as IResults));
        this.http.add(res).subscribe((res: IResultsDisplay[]) => {
            alert("Results were saved in the database successfully");
            this.router.navigate(['/classes']);
        }, (err: HttpErrorResponse) => this.hand.handleError(err));
    }

    form_valid(): boolean {
        return this.form.valid && this.res_form.every(x => x.valid);
    }
}