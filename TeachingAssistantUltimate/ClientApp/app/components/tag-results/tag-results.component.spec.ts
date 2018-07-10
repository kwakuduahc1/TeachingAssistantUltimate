/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { TagResultsComponent } from './tag-results.component';

let component: TagResultsComponent;
let fixture: ComponentFixture<TagResultsComponent>;

describe('tag-results component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ TagResultsComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(TagResultsComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});