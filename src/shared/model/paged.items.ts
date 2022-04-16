export class PagedItems {
    pageSize: number;
    pageNumber: number;
    data: any;
    count:number;

    constructor(pageSize: number, pageNumber: number, data:any, count:number) {
        this.count = count;
        this.pageNumber = pageNumber;
        this.pageSize = pageSize;
        this.data =data;
        
    }
}