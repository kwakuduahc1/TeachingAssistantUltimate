import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ISubjects } from '../../model/ISubjects';
import { HttpHandler } from '../../providers/HttpHandler';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpProvider } from '../../providers/http-provider';

@Component({
    selector: 'app-subjects',
    templateUrl: './subjects.component.html',
    styleUrls: ['./subjects.component.css']
})
/** subjects component*/
export class SubjectsComponent implements OnInit {
    form: FormGroup;
    subjects: ISubjects[];
    ngOnInit(): void {

    }
    constructor(private route: ActivatedRoute, fb: FormBuilder, private htpp: HttpProvider, public hand: HttpHandler) {
        this.form = this.InitForm(fb);
        this.subjects = this.route.snapshot.data["subjects"] as ISubjects[];
    }


    InitForm(fb: FormBuilder): FormGroup {
        return fb.group({
            subject: ["", Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(200)])],
            subjectCode: ["", Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])]
        })
    }

    add(sub: ISubjects) {
        this.hand.processing = true;
        this.hand.error = false;
        this.htpp.addSubject(sub).subscribe(res => {
            this.subjects.unshift(res);
            this.hand.message = "subject added successfully";
            this.form = this.InitForm(new FormBuilder());
        }, (err: HttpErrorResponse) => {
            this.hand.handleError(err);
        });
        this.hand.processing = false;
    }

    delete(sub: ISubjects) {
        if (confirm(`Are you sure you want to delete ${sub.subject} from the list?`)) {
            this.hand.processing = true;
            this.hand.error = false;
            this.hand.message = "";
            console.log("About to delete");
            this.htpp.deleteSubject(sub).subscribe(res => {
                this.hand.error = false;
                let ix: number = this.subjects.findIndex(q => q.subjectsID === sub.subjectsID);
                this.subjects.splice(ix, 1);
                this.hand.message = `${sub.subject} was deleted`;
            }, ((err: HttpErrorResponse) => {
                this.hand.handleError(err);
            }));
            this.hand.processing = false;
        }
    }
}