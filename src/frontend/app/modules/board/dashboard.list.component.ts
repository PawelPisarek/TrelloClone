import {Component, OnInit} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";
import {DashboardService} from "./dashboard.service";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {Dashboard} from "./dashboard.model";
import {Router} from "angular2/router";
@Component({
    selector: 'dashboard-list',
    templateUrl: 'app/modules/board/dashboard-list.html',
    providers: [DashboardService, HTTP_PROVIDERS],
    directives: [MATERIAL_DIRECTIVES]
})
export class DashboardListComponent implements OnInit {
    constructor(private _service:DashboardService, private  _router:Router) {
    }

    private _dashboards:Array<Dashboard>;

    ngOnInit() {
        this._service.getDashboards().subscribe(data=> {
            this._dashboards = data;
        });
    }

    onSelect(dashboard:Dashboard) {
        this._router.navigate(['DashboardDetail', {id: dashboard.id}]);
    }
}
