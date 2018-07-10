import { Component } from '@angular/core';
import { StudentsService } from '../../../Services/students.service';
import { IStudents } from '../../model/IStudents';
import { StudentsHttpProvider } from '../../providers/students-http-provider';
import { HttpHandler } from '../../providers/HttpHandler';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { IClasses } from '../../model/IClasses';
import { ISubjects } from '../../model/ISubjects';

@Component({
    selector: 'bs-preview-students',
    templateUrl: './preview-students.component.html',
    styleUrls: ['./preview-students.component.css']
})
/** preview-students component*/
export class PreviewStudentsComponent {
    students: IStudents[];
    _class: IClasses;
    constructor(stds: StudentsService, private http: StudentsHttpProvider, private hand: HttpHandler, private router:Router, route:ActivatedRoute) {
        this.students = stds.get();
        this._class = route.snapshot.data["class"];
    }
    save() {
        this.http.add(this.students).subscribe((res: IStudents[]) => {
            this.router.navigate(['/classes']);
        }, (err: HttpErrorResponse) => this.hand.handleError(err));
    }

}