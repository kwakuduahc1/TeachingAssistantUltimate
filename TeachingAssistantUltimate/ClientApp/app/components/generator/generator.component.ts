import { Component } from '@angular/core';
import { ITopics } from '../../model/ITopics';
import { ISubjects } from '../../model/ISubjects';
import { IQuestions } from '../../model/IQuestsions';
import { ActivatedRoute } from '@angular/router';
import { HttpProvider } from '../../providers/http-provider';
import { ITests } from '../../model/ITests';
import { PrintProviderService } from '../../providers/print-provider.service';

@Component({
    selector: 'bs-generator',
    templateUrl: './generator.component.html',
    styleUrls: ['./generator.component.css']
})
/** generator component*/
export class GeneratorComponent {
    topics: ITopics[];
    subject: ISubjects;
    max: number = 1;
    questions: IQuestions[] = [];
    usid: number = 0;
    constructor(private route: ActivatedRoute, private http: HttpProvider, private printer: PrintProviderService) {
        this.topics = route.snapshot.data["topics"] as ITopics[];
        this.subject = route.snapshot.data["subject"] as ISubjects;
        this.max = this.topics.length * 4;
    }

    ngOnInit() {
        var num = this.max / this.topics.length;
        this.topics.map((x) => x.number = num);
    }

    total(): boolean {
        return this.topics.reduce((pv, cv) => pv + cv.number, 0) === this.max;
    }

    setQuestions(quests: IQuestions[]) {
        this.questions = quests;
    }
    generate(tops: ITopics[]) {
        let vm: ITests = { subjectsID: this.subject.subjectsID, topics: tops };
        this.http.genQuestions(vm).subscribe(x => this.setQuestions(x));
    }

    print(): void {
        this.printer.print(`${this.subject.subject} : ${this.subject.subjectCode}`);
    }
}