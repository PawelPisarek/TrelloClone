/// </// <reference path="interfaces.ts" />
var Promise = require('promise'),
    sqlite = require('sqlite3'),
    db;

const USER_TABLE_CREATE = 'CREATE TABLE "users" ( "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "email" INTEGER UNIQUE, "password" VARCHAR(32));';
const TASK_TABLE_CREATE = 'CREATE TABLE "task" ( "id" INTEGER NOT NULL, "id_boards" INTEGER NOT NULL, "id_users" INTEGER NOT NULL, "id_kategorie" INTEGER NOT NULL, "name" TEXT, "opis" VARCHAR(32), "deadline" DATATIME, PRIMARY KEY(id), FOREIGN KEY("id_boards") REFERENCES "boards"("id"), FOREIGN KEY("id_users") REFERENCES "users"("id"), FOREIGN KEY("id_kategorie") REFERENCES "kategorie"("id"));';
const KATEGORIE_TABLE_CREATE = 'CREATE TABLE "kategorie" ( "id" INTEGER NOT NULL, "name" VARCHAR(32), PRIMARY KEY(id));';
const CHECKLIST_TABLE_CREATE = 'CREATE TABLE "checklist" ( "id" INTEGER NOT NULL, "id_task" INTEGER NOT NULL, "name" VARCHAR(64), "is_check" INTEGER, PRIMARY KEY(id), FOREIGN KEY("id_task") REFERENCES task(id));';
const BOARDS_TABLE_CREATE = 'CREATE TABLE "boards" ( "id" INTEGER NOT NULL, "name" VARCHAR(64), "author" INTEGER NOT NULL, PRIMARY KEY(id), FOREIGN KEY("author") REFERENCES users(id));';
const BOARDUSERREL_TABLE_CREATE = 'CREATE TABLE "board_user_rel" ( "id_users" INTEGER NOT NULL, "id_boards" INTEGER NOT NULL, FOREIGN KEY("id_users") REFERENCES "users"("id"), FOREIGN KEY("id_boards") REFERENCES boards(id));';

function mysql_real_escape_string (str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
        switch (char) {
            case "\0":
                return "\\0";
            case "\x08":
                return "\\b";
            case "\x09":
                return "\\t";
            case "\x1a":
                return "\\z";
            case "\n":
                return "\\n";
            case "\r":
                return "\\r";
            case "\"":
            case "'":
            case "\\":
            case "%":
                return "\\"+char;
        }
    });
}

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
					
					db.serialize(() => {
                        db.run('INSERT INTO "kategorie" (name) VALUES ("STORIES"), ("TODO"), ("IN PROGRESS"), ("TESTING"), ("DONE")');
                    });
                }
            });
        });
    }


	
	//USER------------------------------------------------------------------------------------------------
	
    getUser(id:number, callback:resolver<IUser>) {
		let stmt = `SELECT id, email FROM users WHERE id = ${id}`;
		db.get(stmt, (err, row) => {
			callback(row, err);
		});
    }

    getUserAuthByLogin(name:string, callback:resolver<IUser>) {
		let email = mysql_real_escape_string(name);
		
        let stmt = `SELECT * FROM users WHERE email = "${email}"`;
        db.get(stmt, (err, row) => {
            callback(row, err);
        });
    }
	
    createUser(userData, callback:resolver<IUser>) {
		let mail = mysql_real_escape_string(userData.email);
		let pass = mysql_real_escape_string(userData.password);
		
        let values = [mail, pass].map((str) => '"' + str + '"').join(',');
        let stmt = 'INSERT INTO "users" (email, password) VALUES(' + values + ')';
        db.get(stmt, function(err, user) {
           callback(user, err);
        });
    }	
	
	
	
	//DASHBOARD------------------------------------------------------------------------------------------------
	
    getBoards(userId:number, callback:resolver<Array<IBoard>>) {
        let stmt = `SELECT * FROM boards WHERE author = ${userId}`;
        let dane = [];

        db.each(stmt, (err, row) => {
            dane.push(row);
        }, function(err,count) {
            callback(dane, err);
        });
    }
	
	
	
	//BOARD------------------------------------------------------------------------------------------------
	
	getBoard(boardData, callback:resolver<IBoard>) {
        let id = boardData.boardID;
        let userID = boardData.userID;

        let stmt = `SELECT * FROM boards WHERE id = ${id} and author = ${userID} LIMIT 1`;
        db.get(stmt, (err, row) => {
            callback(row, err);
        });
    }
	
    createBoard(boardData, callback:resolver<IUser>) {
		let boardName = boardData.name;
		let userID = boardData.author;
		
        let values = [boardName, userID].map((str) => '"' + str + '"').join(',');
        let stmt = 'INSERT INTO "boards" (name,author)  VALUES(' + values + ')';
        db.get(stmt, function (err, user) {
            callback(user, err);
        });  
    }	
	

	
	//KATEGORIA------------------------------------------------------------------------------------------------
	
	getKategorie(callback:resolver<Array<IUser>>) {
		let stmt = 'SELECT * FROM kategorie';
        let dane = [];

        db.each(stmt, (err, row) => {
            dane.push(row);
        }, function(err,count) {
            callback(dane, err);
        });
    }
	
	
	
	//TASK------------------------------------------------------------------------------------------------
	
	getTasks(params, callback:resolver<Array<IBoard>>) {
		let boardID = parseInt(params.id);
		let katID = parseInt(params.idCategory);
		
		let stmt = `SELECT * FROM task WHERE id_boards = ${boardID} and id_kategorie = ${katID}`;
		let dane = [];

		db.each(stmt, (err, row) => {
			dane.push(row);
		}, function(err,count) {
            callback(dane, err);
        });
    }

    getTask(taskID:number, callback:resolver<Array<IBoard>>) {
        let id = taskID;

        let stmt = `SELECT * FROM task WHERE id = ${id}`;
        let dane = [];

        db.each(stmt, (err, row) => {
            dane.push(row);
        }, function(err,count) {
            callback(dane, err);
        });
    }
	
	moveTask(taskID:number, newKatID:number, callback:resolver<Array<IBoard>>) {
		let stmt = `UPDATE task set id_kategorie = ${newKatID} WHERE id = ${taskID}`;
		db.get(stmt, function (err, user) {
            callback(user, err);
        }); 
    }
	
	createTask(taskData, callback:resolver<IUser>) {
		let taskName = mysql_real_escape_string(taskData.name);
		let taskOpis = mysql_real_escape_string(taskData.opis);
		let deadline = mysql_real_escape_string(taskData.deadline);
		let boardID = parseInt(taskData.id_board);
		let userID = parseInt(taskData.id_user);
		let katID = parseInt(taskData.id_kategoria);
		
        let values = [taskName, taskOpis, deadline, boardID, userID, katID].map((str) => '"' + str + '"').join(',');
        let stmt = 'INSERT INTO "task" (name,opis,deadline,id_boards,id_users,id_kategorie)  VALUES(' + values + ')';
        db.get(stmt, function (err, user) {
            callback(user, err);
        });  
    }

    editTask(taskData, callback:resolver<IUser>) {
        let taskName = mysql_real_escape_string(taskData.name);
        let taskOpis = mysql_real_escape_string(taskData.opis);
        let deadline = mysql_real_escape_string(taskData.deadline);
        let taskID = parseInt(taskData.id_task);
        let boardID = parseInt(taskData.id_board);
        let userID = parseInt(taskData.id_user);
        let katID = parseInt(taskData.id_kategoria);
        
        let values = [taskName, taskOpis, deadline, boardID, userID, katID].map((str) => '"' + str + '"').join(',');
        let stmt = 'UPDATE "task" SET name = "' + taskName + '", opis = "' + taskOpis + '", deadline = "' + deadline + '", id_boards = ' + boardID + ', id_kategorie = ' + katID + ' WHERE  id = ' + taskID + ' and id_user = ' + userID + ' ';
        db.get(stmt, function (err, user) {
            callback(user, err);
        });  
    }
	
	
	
	//CHECKLIST------------------------------------------------------------------------------------------------
	
	getChecklist(taskID:number, callback:resolver<Array<IBoard>>) {
		let stmt = `SELECT * FROM checklist WHERE id_task = ${taskID}`;
		let dane = [];

        db.each(stmt, (err, row) => {
            dane.push(row);
        }, function(err,count) {
            callback(dane, err);
        });
    }
	
	updateChecklist(checklistID:number, checked:number, callback:resolver<Array<IBoard>>) {
	
		let isCheck;
		if(checked == 1) isCheck = 1;
		else isCheck = 0;
			
		let stmt = `UPDATE checklist set is_check = ${isCheck} WHERE id = ${checklistID}`;
		db.get(stmt, function (err, user) {
            callback(user, err);
        }); 
    }
	
	createChecklist(checklistData, callback:resolver<IUser>) {
		let checklistName = mysql_real_escape_string(checklistData.name);
		let taskID = parseInt(checklistData.id_task);
		let isCheck = parseInt(checklistData.is_check);
		
        let values = [checklistName, taskID, isCheck].map((str) => '"' + str + '"').join(',');
        let stmt = 'INSERT INTO "checklist" (name,id_task,is_check)  VALUES(' + values + ')';
        db.get(stmt, function (err, user) {
            callback(user, err);
        });  
    }

}
