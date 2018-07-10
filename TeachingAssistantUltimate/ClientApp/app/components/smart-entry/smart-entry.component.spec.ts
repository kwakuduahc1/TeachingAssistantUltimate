/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { SmartEntryComponent } from './smart-entry.component';

let component: SmartEntryComponent;
let fixture: ComponentFixture<SmartEntryComponent>;

describe('smart-entry component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SmartEntryComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(SmartEntryComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});