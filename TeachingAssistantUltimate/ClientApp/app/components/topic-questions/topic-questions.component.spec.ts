/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { TopicQuestionsComponent } from './topic-questions.component';

let component: TopicQuestionsComponent;
let fixture: ComponentFixture<TopicQuestionsComponent>;

describe('topic.questions component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TopicQuestionsComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(TopicQuestionsComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});