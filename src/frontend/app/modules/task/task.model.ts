export class Task {
    constructor(public id:string,
                public tags:Array<string>,
                public label:string,
                public column:number,
                public author:string,
                public users:Array<string>) {
    }
}
export class OneTask {
    constructor(public id:string,
                public name:string,
                public column:string,
                public description:string) {
    }
}