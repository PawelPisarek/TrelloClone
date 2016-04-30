import {Injectable} from "angular2/core";
import {Http, Response} from "angular2/http";
import {Task} from "./task.model";
export class ApiTasks {
    public tasks:Array<Task>;
}
@Injectable()
export class TaskService {
    constructor(private http:Http) {

    }

    getTasks() {
        return this.http.get("http://localhost:8081/tasks")
            .map(res=> (<Response>res).json())
            .map((apiTasks:ApiTasks)=> {
                const results = [];
                if (apiTasks) {
                    apiTasks.tasks.forEach((task:Task)=> {
                        results.push(new Task(task.tags, task.label, task.column, task.author, task.users))
                    })
                }
                return results;
            })
    }

}