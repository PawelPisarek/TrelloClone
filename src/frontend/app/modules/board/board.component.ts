import {Component} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {DashboardService} from "./dashboard.service";
import {HTTP_PROVIDERS} from "angular2/http";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {DashboardListComponent} from "./dashboard.list.component";
import {DashboardDetailComponent} from "./dashboard-detail.component";
@Component({
    selector: 'board',
    templateUrl: 'app/modules/dashboard/dashboard.html',
    providers: [DashboardService, HTTP_PROVIDERS],
    directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/', name: 'DashboardList', component: DashboardListComponent, useAsDefault: true},
    {path: '/:id/...', name: 'DashboardDetail', component: DashboardDetailComponent}

])
export class BoardComponent {

}
