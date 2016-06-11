import {Component, Input} from "angular2/core";
import {Router} from "express-serve-static-core";
import {RouteParams} from "angular2/router";
import {TaskService} from "./task.service";
import {Task, OneTask} from "./task.model";
@Component({
    selector: 'task-detail',
    templateUrl: 'app/modules/task/task-detail.html',
    providers: [TaskService]
})
export class TaskDetailComponent {
    constructor(private _routeParams:RouteParams,
                private _service:TaskService) {

    }

    @Input() task:Task;

}
