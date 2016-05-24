/// </// <reference path="interfaces.ts" />
var Promise = require('promise'),
    sqlite = require('sqlite3'),
    db;
    
const USER_TABLE_CREATE = 'CREATE TABLE "users" ("id" INTEGER PRIMARY KEY AUTOINCREMENT, "login" VARCHAR(64) UNIQUE, "password" VARCHAR(32))';
const BOARD_TABLE_CREATE = 'CREATE TABLE "boards" ("id" INTEGER PRIMARY KEY AUTOINCREMENT, "name" VARCHAR(64), "author" INTEGER, FOREIGN KEY(author) REFERENCES user(id))';

module.exports = class SqliteConnector implements IDatabaseConnector {
    constructor(path:string) {
        db = new sqlite.Database(path);
        db.serialize(() => {
            db.get('SELECT name FROM sqlite_master WHERE type="table" AND name="users"', (err, row) => {
                if (!row) {
                    db.run(USER_TABLE_CREATE);
                    db.run(BOARD_TABLE_CREATE);
                    db.serialize(() => {
                        db.run('INSERT INTO "users" (login, password) VALUES("admin", "admin")');
                    });
                }
            });
        });
    }
    
    getUser(id: number, callback:resolver<IUser>) {
        let stmt = 'SELECT * FROM users WHERE id = ';
        db.get(stmt + id, (err, row) => {
            callback(row, err);
        });
    }
    
    getUserByLogin(name: string, callback:resolver<IUser>) {
        let stmt = 'SELECT * FROM users WHERE login = ';
        db.get(stmt + name, (err, row) => {
            callback(row, err);
        });
    }
    
    createUser(userData, callback:resolver<IUser>) {
        let values = [userData.login, userData.password].map((str) => '"' + str + '"').join(',');
        let stmt = 'INSERT INTO "users" (login, password) VALUES(' + values + ')';
        db.get(stmt, function(err, user) {
           callback(user, err); 
        });
    }
    
    getBoard(id: number, callback:resolver<IBoard>) {
        let stmt = 'SELECT * FROM boards WHERE id = ';
        db.get(stmt + id, (err, row) => {
            callback(row, err);
        });
    }
    
    getBoards(userId: number, callback:resolver<Array<IBoard>>) {
        let stmt = 'SELECT * FROM boards WHERE author = ';
        db.get(stmt + userId, (err, row) => {
            callback(row, err);
        });
    }
}