import { HttpErrorResponse } from "@angular/common/http";

export class HttpHandler {

    message: string = "";
    processing: boolean = false;
    error: boolean = false;
    constructor() {

    }

    handleError(err: HttpErrorResponse) {
        this.error = true;
        if (err.error!.message) {
            this.message = err.error.message;
        }
        else {
            this.message = err.statusText;
        }
        alert(this.message);
    }
}
