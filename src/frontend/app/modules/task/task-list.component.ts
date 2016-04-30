import {Component, Injector} from 'angular2/core';
import {DashboardService} from "../dashboard/dashboard.service";
import {RouteParams, ROUTER_DIRECTIVES, RouteData} from "angular2/router";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {TaskService} from "./task.service";
import {Task} from "./task.model";

@Component({
    selector: 'task-list',
    directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES],
    templateUrl: 'app/modules/task/task-list.html',
    providers: [TaskService]
})
export class TaskListComponent {
    constructor(private _dashboardService:DashboardService, injector:Injector, private _taskService:TaskService) {
        this._parentParams = injector.parent.parent.get(RouteParams);
    }

    private _tasks:Task[];
    private _parentParams:RouteParams;

    ngOnInit() {
        let id = this._parentParams.get('id');
        this._dashboardService.getDashboard(id).subscribe(data=> {
            console.log(data);
        });

        this._taskService.getTasks().subscribe(data=> {
            this._tasks = data;
        })
    }
}