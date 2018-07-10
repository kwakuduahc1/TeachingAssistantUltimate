/// <reference path="../../../../node_modules/@types/jasmine/index.d.ts" />
import { TestBed, async, ComponentFixture, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { BrowserModule, By } from "@angular/platform-browser";
import { PreviewStudentsComponent } from './preview-students.component';

let component: PreviewStudentsComponent;
let fixture: ComponentFixture<PreviewStudentsComponent>;

describe('preview-students component', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ PreviewStudentsComponent ],
            imports: [ BrowserModule ],
            providers: [
                { provide: ComponentFixtureAutoDetect, useValue: true }
            ]
        });
        fixture = TestBed.createComponent(PreviewStudentsComponent);
        component = fixture.componentInstance;
    }));

    it('should do something', async(() => {
        expect(true).toEqual(true);
    }));
});