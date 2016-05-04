import {Component, OnInit} from 'angular2/core';
import {RouteParams, RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {TaskListComponent} from "../task/task-list.component";
import {TaskDetailComponent} from "../task/task-detail.component";
import {BoardService} from "./board.service";

@Component({
    selector: 'board-detail',
    directives: [ROUTER_DIRECTIVES],
    template: `
  <router-outlet></router-outlet>
  `
})
@RouteConfig([
    {path: '/', name: 'TaskList', component: TaskListComponent, useAsDefault: true},
    {path: '/:id', name: 'TaskDetail', component: TaskDetailComponent}

])
export class BoardDetailComponent implements OnInit {
    constructor(private _routeParams:RouteParams, private _service:BoardService) {
    }

    ngOnInit() {
    }
}