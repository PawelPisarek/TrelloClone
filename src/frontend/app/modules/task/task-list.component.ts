import {Component, Injector, Input} from 'angular2/core';

import {RouteParams, ROUTER_DIRECTIVES, RouteData, Router} from "angular2/router";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {TaskService} from "./task.service";
import {Task} from "./task.model";
import {BoardService} from "../board/board.service";
import {Board} from "../board/board.model";
import {error} from "util";

@Component({
    selector: 'task-list',
    directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES],
    templateUrl: 'app/modules/task/task-list.html',
    providers: [TaskService]
})
export class TaskListComponent {
    constructor(private _boardService:BoardService,
                injector:Injector,
                private _taskService:TaskService,
                private _router:Router) {
    }

    @Input() board:Board;
    private _tasks:Task[];

    ngOnInit() {

        this._taskService.getTasks(this.board.id).subscribe(data=> {
            this._tasks = data;
        }, error=> {
            console.log(error);
        })
    }

    onSelect(task:Task) {
        this._router.navigate(['TaskDetail', {id: task.id}])
    }
}