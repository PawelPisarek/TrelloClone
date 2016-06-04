import {Component, Injector} from 'angular2/core';

import {RouteParams, ROUTER_DIRECTIVES, RouteData, Router} from "angular2/router";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {TaskService} from "./task.service";
import {Task} from "./task.model";
import {BoardService} from "../board/board.service";

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
        // this._parentParams = injector.parent.parent.get(RouteParams);
    }

    private _tasks:Task[];
    private _parentParams:RouteParams;

    ngOnInit() {
        let id = +this._parentParams.get('id');
        this._boardService.getBoards(id).subscribe(data=> {
            console.log(data);
        });

        // this._taskService.getTasks().subscribe(data=> {
        //     this._tasks = data;
        // })
    }

    onSelect(task:Task) {
        this._router.navigate(['TaskDetail', {id: task.id}])
    }
}