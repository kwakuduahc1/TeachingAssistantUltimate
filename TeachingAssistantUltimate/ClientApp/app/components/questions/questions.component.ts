import { Component } from '@angular/core';
import { ISubjects } from '../../model/ISubjects';
import { ActivatedRoute } from '@angular/router';
import { HttpProvider } from '../../providers/http-provider';
import { HttpHandler } from '../../providers/HttpHandler';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IQuestions } from '../../model/IQuestsions';
import { IOptions } from '../../model/IOptions';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'bs-questions',
    templateUrl: './questions.component.html',
    styleUrls: ['./questions.component.css']
})
/** questions component*/
export class QuestionsComponent {
    form: FormGroup;
    questions: IQuestions[];
    options: Array<{ option: string }>;
    subject: ISubjects;
    isSimple: boolean = false;
    ngOnInit(): void {
    }
    constructor(private route: ActivatedRoute, private htpp: HttpProvider, public hand: HttpHandler) {
        this.form = this.InitForm(new FormBuilder());
        this.questions = this.route.snapshot.data["questions"] as IQuestions[];
        this.subject = this.route.snapshot.data["subject"] as ISubjects;
        this.questions = [];
        this.options = this.addOpts(4);
    }

    useSimple() {
        this.isSimple = !this.isSimple;
    }

    addOpts(num: number) {
        let options: Array<{ option: string }> = [];
        switch (num) {
            case 2:
                for (var i = 0; i < num; i++) {
                    var value = i % 2 === 1 ? 'True' : 'False';
                    options.push({ option: value });
                }
                break;
            default:
                for (var i = 0; i < num; i++) {
                    options.push({ option: "" });
                }
                break;
        }
        return options;
    }
    InitForm(fb: FormBuilder) {
        return fb.group({
            question: ["", Validators.compose([Validators.required, Validators.minLength(1)])],
            topic: ["", Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(200)])]
        })
    }

    setOptions() {
        let ix = this.options.length === 4 ? 2 : 4;
        this.options = this.addOpts(ix);
    }
    add(q: IQuestions) {
        q.options = this.options as IOptions[];
        q.subjectsID = this.subject.subjectsID;
        this.hand.processing = true;
        this.hand.error = false;
        this.htpp.addQuestion(q).subscribe(res => {
            this.questions.unshift(res);
            this.hand.message = "Question added to your bank";
            this.form.controls['question'].reset();
            this.options.forEach(x => x.option = "");
            let doc = document.getElementById('question') as HTMLInputElement;
            doc.focus();
        }, (err: HttpErrorResponse) => {
            this.hand.handleError(err);
        });
        this.hand.processing = false;
    }
}