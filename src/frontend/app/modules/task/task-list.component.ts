import {Component} from 'angular2/core';
import {DashboardService} from "../dashboard/dashboard.service";
import {RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";

@Component({
    selector: 'task-list',
    directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES],
    template: `
  asdsad
  `
})
export class TaskListComponent {
    constructor(private _routeParams:RouteParams, private _service:DashboardService) {
    }

    ngOnInit() {
        let id = this._routeParams.get('idDashboard');
        this._service.getDashboard(id).subscribe(data=> {
            console.log(data + "brak dostępu do id?");
        });
    }
}