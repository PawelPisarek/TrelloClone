import {Component, OnInit} from 'angular2/core';
import {RouteParams} from "angular2/router";
import {DashboardService} from "./dashboard.service";

@Component({
    selector: 'dashboard-detail',
    template: `
  
  `
})
export class DashboardDetailComponent implements OnInit {
    constructor(private _routeParams:RouteParams, private _service:DashboardService) {
    }

    ngOnInit() {
        let id = this._routeParams.get('id');
        this._service.getDashboard(id).subscribe(data=> {
            console.log(data);
        })
    }
}