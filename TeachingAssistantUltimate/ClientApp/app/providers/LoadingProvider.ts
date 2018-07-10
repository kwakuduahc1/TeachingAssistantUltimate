export class LoadingProvider {
    loading: boolean;
    httping: boolean;
    constructor() {
        this.loading = false;
        this.httping = false;
    }
}