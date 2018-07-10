import { Component } from '@angular/core';
import { IQuestions } from '../../model/IQuestsions';
import { ActivatedRoute } from '@angular/router';
import { IClasses } from '../../model/IClasses';
import { HttpProvider } from '../../providers/http-provider';
import { HttpHandler } from '../../providers/HttpHandler';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'bs-topic-questions',
    templateUrl: './topic-questions.component.html',
    styleUrls: ['./topic-questions.component.css']
})
/** topic.questions component*/
export class TopicQuestionsComponent {
    questions: IQuestions[];
    _class: IClasses;
    constructor(route: ActivatedRoute, private http: HttpProvider, private hand: HttpHandler) {
        this.questions = route.snapshot.data['questions'] as IQuestions[];
        this._class = route.snapshot.data['class'] as IClasses;
    }

    delete(q: IQuestions) {
        if (confirm(`Deleting this question is irreversible. Do you wish to continue?`)) {
            this.http.deleteQuestion(q).subscribe(() => {
                let ix: number = this.questions.findIndex(x => x.questionsID === q.questionsID);
                this.questions.splice(ix, 1);
                alert("Question was deleted successfully");
            }, ((err: HttpErrorResponse) => this.hand.handleError(err)));
        }
        else {
            alert("Delete operation was cancelled. Dismiss this message to continue");
        }
    }
}