import { Component } from '@angular/core';
import { IAssTypes } from '../../model/IAssTypes';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpHandler } from '../../providers/HttpHandler';
import { AssessTypeHttpProvider } from '../../providers/ass-types-http-provider';

@Component({
    selector: 'bs-ass-types',
    templateUrl: './ass-types.component.html',
    styleUrls: ['./ass-types.component.css']
})
/** ass-types component*/
export class AssTypesComponent {
    types: IAssTypes[];
    form: FormGroup;
    constructor(private route: ActivatedRoute, fb: FormBuilder, private htpp: AssessTypeHttpProvider, public hand: HttpHandler) {
        this.form = this.InitForm(fb);
        this.types = this.route.snapshot.data["types"] as IAssTypes[];
    }


    InitForm(fb: FormBuilder): FormGroup {
        return fb.group({
            assessmentType: ["", Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
            total: ["", Validators.compose([Validators.required, Validators.min(5), Validators.max(70)])]
        })
    }

    add(sub: IAssTypes) {
        this.hand.processing = true;
        this.hand.error = false;
        this.htpp.addAssTypes(sub).subscribe((res:IAssTypes) => {
            this.types.unshift(res);
            this.hand.message = `${res.assessmentType} was added successfully`;
            this.form = this.InitForm(new FormBuilder());
        }, (err: HttpErrorResponse) => {
            this.hand.handleError(err);
        });
        this.hand.processing = false;
    }

    delete(ass: IAssTypes) {
        if (confirm(`Are you sure you want to delete ${ass.assessmentType} from the list?`)) {
            this.hand.processing = true;
            this.hand.error = false;
            this.hand.message = "";
            this.htpp.deleteAssTypes(ass).subscribe(res => {
                this.hand.error = false;
                let ix: number = this.types.findIndex(q => q.assessmentTypesID === ass.assessmentTypesID);
                this.types.splice(ix, 1);
                this.hand.message = `${ass.assessmentType} was deleted`;
            }, ((err: HttpErrorResponse) => {
                this.hand.handleError(err);
            }));
            this.hand.processing = false;
        }
    }
}