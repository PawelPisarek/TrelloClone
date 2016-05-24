interface resolver<T> {
    (resolved: T, error: string):void
}

interface IUser {
    id: number,
    login: string,
    password: string
}

interface IBoard {
    id: number;
    name: string,
    author: number
}

interface IDatabaseConnector {
    getUser(id: number, callback: resolver<IUser>): void,
    getUserByLogin(login: string, callback: resolver<IUser>): void,
    createUser(userData: Object, callback: resolver<IUser>): void,
    getBoard(id: number, callback: resolver<IBoard>): void,
    getBoards(userId: number, callback: resolver<Array<IBoard>>): void
}