import { Component } from '@angular/core';
import { IAssTypes } from '../../model/IAssTypes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHandler } from '../../providers/HttpHandler';
import { AssessTypeHttpProvider } from '../../providers/ass-types-http-provider';

@Component({
    selector: 'bs-edit-ass-type',
    templateUrl: './edit-ass-type.component.html',
    styleUrls: ['./edit-ass-type.component.css']
})
/** edit-ass-type component*/
export class EditAssTypeComponent {
    type: IAssTypes;
    form: FormGroup;
    constructor(private route: ActivatedRoute, private router: Router, fb: FormBuilder, private htpp: AssessTypeHttpProvider, public hand: HttpHandler) {
        this.type = this.route.snapshot.data["type"] as IAssTypes;
        this.form = this.InitForm(fb);
    }

    InitForm(fb: FormBuilder): FormGroup {
        return fb.group({
            assessmentType: [this.type.assessmentType, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
            total: [this.type.total, Validators.compose([Validators.required, Validators.min(5), Validators.max(70)])]
        })
    }

    edit(sub: IAssTypes) {
        this.hand.processing = true;
        this.hand.error = false;
        if (this.type.assessmentType === sub.assessmentType && this.type.total === sub.total) {
            alert("Nothing has changed. Operation was aborted");
        }
        else {
            this.type.assessmentType = sub.assessmentType;
            this.type.total == sub.total;
            this.htpp.editAssTypes(this.type).subscribe((res: IAssTypes) => {
                this.hand.message = `${res.assessmentType} was edited successfully`;
                this.router.navigate(['/types'])
            }, (err: HttpErrorResponse) => {
                this.hand.handleError(err);
            });
        }
        this.hand.processing = false;
    }

    delete() {
        if (confirm(`Are you sure you want to delete ${this.type.assessmentType} from the list?`)) {
            this.hand.processing = true;
            this.hand.error = false;
            this.hand.message = "";
            this.htpp.deleteAssTypes(this.type).subscribe(res => {
                this.hand.error = false;
                this.hand.message = `${this.type.assessmentType} was deleted`;
                this.router.navigate(['/types'])
            }, ((err: HttpErrorResponse) => {
                this.hand.handleError(err);
            }));
            this.hand.processing = false;
        }
    }
}