import { Injectable } from '@angular/core';
import { IStudents } from '../app/model/IStudents';

@Injectable()
export class StudentsService {
    private stds!: IStudents[];
    constructor() {
    }

    get():IStudents[] {
        return this.stds;
    }

    set(stds: IStudents[]) {
        this.stds = stds;
    }
}