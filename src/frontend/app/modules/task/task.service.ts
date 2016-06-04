import {Injectable} from "angular2/core";
import {Http, Response, Headers} from "angular2/http";
import {Task, OneTask} from "./task.model";
@Injectable()
export class TaskService {
    constructor(private http:Http) {

    }

    getTasks(idBoard) {
        var header = new Headers();
        let token = localStorage.getItem('token');
        header.append('x-access-token', token);
        return this.http.get(`http://localhost:8081/api/tasks/${idBoard}`,
            {headers: header})
            .map(res=> (<Response>res).json())
            .map((apiTasks)=> {
                const results = [];
                if (apiTasks) {
                    apiTasks.forEach((task:Task)=> {
                        results.push(new Task(task.id, task.id_boards, task.id_users, task.id_kategorie, task.name, task.opis, task.deadline))
                    })
                }
                return results;
            })
    }

    getTask(id:string) {
        return this.http.get(`http://localhost:8081/api/task/${id}`)
            .map(res=>(<Response>res).json())
            .map((task:OneTask)=> {
                return new OneTask(task.id, task.name, task.column, task.description)
            })
    }

}