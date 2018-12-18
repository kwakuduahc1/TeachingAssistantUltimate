import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IStudents } from '../../model/IStudents';
import { IResults } from '../../model/IResults';
import { ActivatedRoute, Router } from '@angular/router';
import { IClasses } from '../../model/IClasses';
import { HttpHandler } from '../../providers/HttpHandler';
import { HttpErrorResponse } from '@angular/common/http';
import { ResultsHttpProvider } from '../../providers/results-http-provider';
import { ISubjects } from '../../model/ISubjects';
import { IAssTypes } from '../../model/IAssTypes';
import { IResultsEntry } from '../../model/IResultsEntry';
import { IResultsDisplay } from '../../model/IResultsDisplay';

@Component({
    selector: 'bs-smart-entry',
    templateUrl: './smart-entry.component.html',
    styleUrls: ['./smart-entry.component.css']
})
/** smart-entry component*/
export class SmartEntryComponent {
    form: FormGroup;
    students: IStudents[];
    results: IResultsEntry[] = [];
    _class: IClasses;
    subjects: ISubjects[];
    types: IAssTypes[]
    maxScore: number = 20;
    canUpload: boolean = false;
    constructor(private http: ResultsHttpProvider, private router: Router, fb: FormBuilder, route: ActivatedRoute, public hand: HttpHandler) {
        this.form = this.initForm(fb);
        this.students = route.snapshot.data["students"];
        this._class = route.snapshot.data["class"];
        this.subjects = route.snapshot.data["subjects"];
        this.types = route.snapshot.data["types"];
    }

    private initForm(fb: FormBuilder): FormGroup {
        return fb.group({
            number: [0, Validators.compose([Validators.required, Validators.min(1)])],
            score: [0, Validators.compose([Validators.required, Validators.min(0), Validators.max(this.maxScore)])],
            type: ["", Validators.compose([Validators.required, Validators.min(1)])],
            tag: ["", Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
            sid: ["", Validators.compose([Validators.required, Validators.min(1)])],
            max: [this.maxScore, Validators.compose([Validators.required, Validators.min(1), Validators.max(100)])]
        });
    }

    private getIx(num: string) {
        return `${this._class.indexPrefix}${this.getPad(num)}`;
    }

    addScore(res: { number: string, score: number, type: number, sid: number, tag: string, max: number }) {
        let ixn = this.getIx(res.number);
        let std: IStudents = this.students.find(x => x.indexNumber === ixn) as IStudents;
        if (!std)
            std = this.students.find(x => x.indexNumber === res.number) as IStudents;
        if (!std) {
            alert(`No student was found matching the index number : ${ixn} provided`);
            this.focus();
            return;
        }
        else if (this.results.some(x => x.studentsID === std.studentsID)) {
            alert("Results for this student has previously been added");
            this.focus();
            return;
        }
        else if (res.score > res.max) {

        }
        else {
            let _res: IResultsEntry = {
                assessmentTypesID: res.type, score: res.score, studentsID: std.studentsID, subjectsID: res.sid, totalScore: this.maxScore,
                tag: res.tag, indexNumber: std.indexNumber,
                name: std.name
            } as IResultsEntry;
            this.results.unshift(_res);
            this.form.controls['number'].reset();
            this.form.controls['score'].reset();
            this.focus();
        }
    }

    focus() {
        let inp = document.getElementById('number') as HTMLInputElement;
        inp.focus();
    }

    remove(std: IResultsEntry) {
        let ix: number = this.results.findIndex(x => x.studentsID === std.studentsID);
        this.results.splice(ix, 1);
    }

    save(res: { number: number, score: number, type: number, sid: number, tag: string }) {
        if (this.results.length !== this.students.length) {
            if (confirm("There were some students without results. Do you want to continue by setting their score to Zero (0)")) {
                this.students.forEach(x => {
                    if (!this.results.some(t => t.studentsID === x.studentsID)) {
                        this.results.unshift({
                            assessmentTypesID: res.type, score: 0, studentsID: x.studentsID, subjectsID: res.sid, totalScore: this.maxScore, tag: res.tag, name: x.name, indexNumber: x.indexNumber
                        } as IResultsEntry)
                    }
                });

                alert("Results have been prepared. Kindly click on the upload button.\nAlternative press the space bar or enter if you are using any assistive technology after you have dismissed this alert by pressing the escape key");
                this.canUpload = true;
                let but = document.getElementById('upload') as HTMLButtonElement;
                but.focus();
            }
            else {
                alert("The process was canceled. Add the results of the missing students or let the system set it to zero");
            }
        }
        else this.addResults();
    }

    addResults() {
        this.http.add(this.results).subscribe((res: IResultsDisplay[]) => {
            alert("Results were loaded to the database successfully");
            this.router.navigate(['/classes']);
        }, (err: HttpErrorResponse) => this.hand.handleError(err));
    }

    private getPad(num: string): string {
        let ixn: string;
        switch (this._class.padding) {
            case 1:
                ixn = "0";
                break;
            case 2:
                ixn = "00";
                break;
            case 3:
                ixn = "000";
                break;
            case 4:
                ixn = "0000";
                break;
            default:
                ixn = "";
        }
        switch (num.length) {
            case 2:
                ixn = ixn.substr(1) + num;
                break;
            case 3:
                ixn = ixn.substr(2) + num;
                break;
            case 4:
                ixn = ixn.substr(3) + num;
                break;
            default:
                ixn = ixn + num;
        }
        return ixn;
    }


}