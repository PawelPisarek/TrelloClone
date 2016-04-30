export class Task {
    constructor(public tags:Array<string>,
                public label:string,
                public column:number,
                public author:string,
                public users:Array<string>) {
    }
}