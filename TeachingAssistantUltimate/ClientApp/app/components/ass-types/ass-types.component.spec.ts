/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { AssTypesComponent } from './ass-types.component';

let component: AssTypesComponent;
let fixture: ComponentFixture<AssTypesComponent>;

describe('ass-types component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AssTypesComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(AssTypesComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});