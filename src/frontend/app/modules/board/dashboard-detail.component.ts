import {Component, OnInit} from 'angular2/core';
import {RouteParams, RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {DashboardService} from "./dashboard.service";
import {TaskListComponent} from "../task/task-list.component";
import {TaskDetailComponent} from "../task/task-detail.component";

@Component({
    selector: 'dashboard-detail',
    directives: [ROUTER_DIRECTIVES],
    template: `
  <router-outlet></router-outlet>
  `
})
@RouteConfig([
    {path: '/', name: 'TaskList', component: TaskListComponent, useAsDefault: true},
    {path: '/:id', name: 'TaskDetail', component: TaskDetailComponent}

])
export class DashboardDetailComponent implements OnInit {
    constructor(private _routeParams:RouteParams, private _service:DashboardService) {
    }

    ngOnInit() {
    }
}