import {Component, Injector} from 'angular2/core';
import {DashboardService} from "../dashboard/dashboard.service";
import {RouteParams, ROUTER_DIRECTIVES, RouteData} from "angular2/router";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";

@Component({
    selector: 'task-list',
    directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES],
    template: `
  asdsad
  `
})
export class TaskListComponent {
    constructor(private _service:DashboardService, injector:Injector) {
        this.parentParams = injector.parent.parent.get(RouteParams);
    }

    parentParams:RouteParams;

    ngOnInit() {
        let id = this.parentParams.get('id');
        this._service.getDashboard(id).subscribe(data=> {
            console.log(data);
        });
    }
}