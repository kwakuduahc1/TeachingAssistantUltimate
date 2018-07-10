import { Component } from '@angular/core';
import { ISubjects } from '../../model/ISubjects';
import { HttpProvider } from '../../providers/http-provider';
import { HttpHandler } from '../../providers/HttpHandler';
import { ActivatedRouteSnapshot, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'bs-edit-subject',
    templateUrl: './edit-subject.component.html',
    styleUrls: ['./edit-subject.component.css']
})
/** edit.subject component*/
export class EditSubjectComponent {
    subject: ISubjects;
    form: FormGroup;
    constructor(private http:HttpProvider, public hand:HttpHandler, route:ActivatedRoute, private nav:Router) {
        this.subject = route.snapshot.data['subject'] as ISubjects;
        this.form = this.InitForm(new FormBuilder());
    }

    InitForm(fb: FormBuilder): FormGroup {
        return fb.group({
            subject: [this.subject.subject, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(200)])]
        })
    }

    edit(sub: ISubjects) {
        console.log(this.subject);
        this.subject.subject = sub.subject;
        this.hand.processing = true;
        this.hand.error = false;
        this.hand.message = "";
        this.http.editSubject(this.subject).subscribe(res => {
            this.nav.navigate(["/subjects"]);
        }, (err: HttpErrorResponse) => {
            this.hand.handleError(err);
        });
        this.hand.processing = false;
    }

    delete(sub: ISubjects) {
        alert("Deleted");
    }
}