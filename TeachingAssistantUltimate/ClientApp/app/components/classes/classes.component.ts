import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpHandler } from '../../providers/HttpHandler';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IClasses } from '../../model/IClasses';
import { ClassessHttpProvider } from '../../providers/classes-http-provider';
import * as XLSX from 'xlsx';
import { IStudents } from '../../model/IStudents';
import { StudentsService } from '../../../Services/students.service';

@Component({
    selector: 'bs-classes',
    templateUrl: './classes.component.html',
    styleUrls: ['./classes.component.css']
})
/** classes component*/
export class ClassesComponent {
    data: Array<Array<any>> = [];
    form: FormGroup;
    classes: IClasses[];
    ngOnInit(): void {

    }
    constructor(private route: ActivatedRoute, fb: FormBuilder, private htpp: ClassessHttpProvider, public hand: HttpHandler, private router: Router, private stds_serv: StudentsService) {
        this.form = this.InitForm(fb);
        this.classes = this.route.snapshot.data["classes"] as IClasses[];
    }


    InitForm(fb: FormBuilder): FormGroup {
        return fb.group({
            className: ["", Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
            indexPrefix: ["", Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
            padding:[0,Validators.compose([Validators.required, Validators.min(0), Validators.max(5)])]
        })
    }

    add(cl: IClasses) {
        this.hand.processing = true;
        this.hand.error = false;
        this.htpp.add(cl).subscribe(res => {
            this.classes.unshift(res);
            this.hand.message = `${cl.className} was added successfully`;
            this.form = this.InitForm(new FormBuilder());
        }, (err: HttpErrorResponse) => {
            this.hand.handleError(err);
        });
        this.hand.processing = false;
    }

    delete(cl: IClasses) {
        if (confirm(`Are you sure you want to delete ${cl.className} from the list?`)) {
            this.hand.processing = true;
            this.hand.error = false;
            this.hand.message = "";
            this.htpp.delete(cl).subscribe(res => {
                this.hand.error = false;
                let ix: number = this.classes.findIndex(q => q.classesID === cl.classesID);
                this.classes.splice(ix, 1);
                this.hand.message = `${cl.className} was deleted`;
            }, ((err: HttpErrorResponse) => {
                this.hand.handleError(err);
            }));
            this.hand.processing = false;
        }
    }

    onFileChange(evt: any, c: IClasses) {
        /* wire up file reader */
        const target: DataTransfer = <DataTransfer>(evt.target);
        if (target.files.length !== 1) throw new Error('Cannot use multiple files');
        const reader: FileReader = new FileReader();
        reader.onload = (e: any) => {
            /* read workbook */
            const bstr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

            /* grab first sheet */
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];
            /* save data */
            this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
            let stds: IStudents[] = [];
            this.data.forEach(x => stds.push({
                classesID: c.classesID, indexNumber: x[1], name: x[0]
            } as IStudents));
            this.stds_serv.set(stds);
            this.router.navigate(['/preview-students', c.classesID]);
        };
        reader.readAsBinaryString(target.files[0]);
    }
}