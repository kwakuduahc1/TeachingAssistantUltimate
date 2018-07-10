/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { AddResultsComponent } from './add-results.component';

let component: AddResultsComponent;
let fixture: ComponentFixture<AddResultsComponent>;

describe('add-results component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AddResultsComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(AddResultsComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});