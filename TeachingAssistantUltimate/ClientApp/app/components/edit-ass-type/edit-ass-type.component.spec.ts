/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { EditAssTypeComponent } from './edit-ass-type.component';

let component: EditAssTypeComponent;
let fixture: ComponentFixture<EditAssTypeComponent>;

describe('edit-ass-type component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ EditAssTypeComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(EditAssTypeComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});