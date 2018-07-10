import { Component } from '@angular/core';
import { ISubjects } from '../../model/ISubjects';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpProvider } from '../../providers/http-provider';
import { HttpHandler } from '../../providers/HttpHandler';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IQuestions } from '../../model/IQuestsions';
import { IOptions } from '../../model/IOptions';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'bs-edit-question',
    templateUrl: './edit-question.component.html',
    styleUrls: ['./edit-question.component.css']
})
/** edit.question component*/
export class EditQuestionComponent {
    form: FormGroup;
    question: IQuestions;
    isSimple: boolean = false;

    constructor(private route: ActivatedRoute, private router: Router, private htpp: HttpProvider, public hand: HttpHandler) {
        this.question = this.route.snapshot.data["question"] as IQuestions;
        this.form = this.InitForm(new FormBuilder());
    }

    useSimple() {
        this.isSimple = !this.isSimple;
    }

    InitForm(fb: FormBuilder) {
        return fb.group({
            question: [this.question.question, Validators.compose([Validators.required, Validators.minLength(1)])],
            topic: [this.question.topic, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(200)])]
        })
    }

    add(q: IQuestions) {
        this.question.question = q.question;
        this.question.topic = q.topic;
        this.hand.processing = true;
        this.hand.error = false;
        this.htpp.editQuestion(this.question).subscribe((res: any) => {
           // this.hand.message = "Question was successfully edited";
            console.log(this.question);
            this.router.navigate(['/topic-questions', q.topic, this.question.subjectsID]);
        }, (err: HttpErrorResponse) => {
            this.hand.handleError(err);
        });
        this.hand.processing = false;
    }
}