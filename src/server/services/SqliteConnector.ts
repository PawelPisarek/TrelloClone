/// </// <reference path="interfaces.ts" />
var Promise = require('promise'),
    sqlite = require('sqlite3'),
    db;

const USER_TABLE_CREATE = 'CREATE TABLE "users" ( "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "email" INTEGER UNIQUE, "password" VARCHAR(32));';
const TASK_TABLE_CREATE = 'CREATE TABLE "task" ( "id" INTEGER NOT NULL, "id_boards" INTEGER NOT NULL, "id_users" INTEGER NOT NULL, "id_kategorie" INTEGER NOT NULL, "name" TEXT, "opis" VARCHAR(32), "deadline" DATATIME, PRIMARY KEY(id), FOREIGN KEY("id_boards") REFERENCES "boards"("id"), FOREIGN KEY("id_users") REFERENCES "users"("id"), FOREIGN KEY("id_kategorie") REFERENCES "kategorie"("id"));';
const KATEGORIE_TABLE_CREATE = 'CREATE TABLE "kategorie" ( "id" INTEGER NOT NULL, "name" VARCHAR(32), PRIMARY KEY(id));';
const CHECKLIST_TABLE_CREATE = 'CREATE TABLE "checklist" ( "id" INTEGER NOT NULL, "id_task" INTEGER NOT NULL, "name" NUMERIC, "is_check" INTEGER, PRIMARY KEY(id), FOREIGN KEY("id_task") REFERENCES task(id));';
const BOARDS_TABLE_CREATE = 'CREATE TABLE "boards" ( "id" INTEGER NOT NULL, "name" VARCHAR(64), "author" INTEGER NOT NULL, PRIMARY KEY(id), FOREIGN KEY("author") REFERENCES users(id));';
const BOARDUSERREL_TABLE_CREATE = 'CREATE TABLE "board_user_rel" ( "id_users" INTEGER NOT NULL, "id_boards" INTEGER NOT NULL, FOREIGN KEY("id_users") REFERENCES "users"("id"), FOREIGN KEY("id_boards") REFERENCES boards(id));';

module.exports = class SqliteConnector implements IDatabaseConnector {
    constructor(path:string) {
        db = new sqlite.Database(path);
        db.serialize(() => {
            db.get('SELECT name FROM sqlite_master WHERE type="table" AND name="users"', (err, row) => {
                if (!row) {
                    db.run(USER_TABLE_CREATE);
					db.run(KATEGORIE_TABLE_CREATE);
                    db.run(BOARDS_TABLE_CREATE);
                    db.run(BOARDUSERREL_TABLE_CREATE);
                    db.run(TASK_TABLE_CREATE);
                    db.run(CHECKLIST_TABLE_CREATE);
                    db.serialize(() => {
                        db.run('INSERT INTO "users" (email, password) VALUES("admin", "admin")');
                    });
                }
            });
        });
    }

    getUser(id:number, callback:resolver<IUser>) {
        let stmt = 'SELECT id, email FROM users WHERE id = ';
        db.get(stmt + id, (err, row) => {
            callback(row, err);
        });
    }

    getUserAuthByLogin(name:string, callback:resolver<IUser>) {
        let stmt = 'SELECT * FROM users WHERE email = "' + name + '"';
        db.get(stmt, (err, row) => {
            callback(row, err);
        });
    }

    createUser(userData, callback:resolver<IUser>) {
        let values = [userData.email, userData.password].map((str) => '"' + str + '"').join(',');
        let stmt = 'INSERT INTO "users" (email, password) VALUES(' + values + ')';
        db.get(stmt, function(err, user) {
           callback(user, err);
        });
    }

    createBoard(userData, callback:resolver<IUser>) {
        let values = [userData.name, userData.author].map((str) => '"' + str + '"').join(',');
        let stmt = 'INSERT INTO "boards" (name,author)  VALUES(' + values + ')';
        db.get(stmt, function (err, user) {
            callback(user, err);
        });
        
    }

    getBoards(userId:number, callback:resolver<Array<IBoard>>) {
        let stmt = 'SELECT * FROM boards WHERE author = ';
        let dane = [];
        new Promise(function (resolve, reject) {

            db.each(stmt + userId, (err, row) => {

                dane.push(row);

            });
            setTimeout(function () {

                resolve(dane);
            }, 500);


        }).then(dane => {

            callback(dane, 'blad');
        });
    }
    getTasks(idBoard:number, callback:resolver<Array<IBoard>>) {
        let stmt = 'SELECT * FROM task WHERE id_boards = ';
        let dane = [];
        new Promise(function (resolve, reject) {

            db.each(stmt + idBoard, (err, row) => {

                dane.push(row);

            });
            setTimeout(function () {

                resolve(dane);
            }, 500);


        }).then(dane => {

            callback(dane, 'blad');
        });
    }

}