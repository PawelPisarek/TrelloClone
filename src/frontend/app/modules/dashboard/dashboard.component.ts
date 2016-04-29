import {Component, OnInit} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {DashboardService} from "./dashboard.service";
import {HTTP_PROVIDERS} from "angular2/http";
@Component({
    selector: 'dashboard',
    templateUrl: 'app/modules/dashboard/dashboard.html',
    providers: [DashboardService, HTTP_PROVIDERS],
    directives: [MATERIAL_DIRECTIVES]
})
export class Dashboard implements OnInit {
    constructor(private _service:DashboardService) {
    }

    private _dashboards:Array<Dashboard>;

    ngOnInit() {
        this._service.getDashboard().subscribe(data=> {
            this._dashboards = data;
        });
    }
}
