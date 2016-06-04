export class Task {
    constructor(public id:string,
                public id_boards:string,
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