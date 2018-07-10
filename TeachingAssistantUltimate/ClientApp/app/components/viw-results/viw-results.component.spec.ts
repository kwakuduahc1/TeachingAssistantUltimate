/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { ViwResultsComponent } from './viw-results.component';

let component: ViwResultsComponent;
let fixture: ComponentFixture<ViwResultsComponent>;

describe('viw-results component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ViwResultsComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(ViwResultsComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});