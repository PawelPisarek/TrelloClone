export class Task {
    constructor(public id:string,
                public board:string,
                public id_users:string,
                public id_kategorie:string,
                public name:number,
                public opis:string,
                public deadline:string) {
    }
}
export class OneTask {
    constructor(public id:string,
                public name:string,
                public column:string,
                public description:string) {
    }
}
export class CheckList {
    constructor(public id:number,
                public name:string,
                public id_task:number,
                public is_check:number) {
    }
}