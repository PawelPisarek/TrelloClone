import {Component} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {HTTP_PROVIDERS} from "angular2/http";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {BoardComponent} from "../board/board.component";
@Component({
    selector: 'dashboard',
    templateUrl: 'app/modules/dashboard/dashboard.html',
    providers: [ HTTP_PROVIDERS],
    directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/...', name: 'Board', component: BoardComponent, useAsDefault: true}

])
export class DashboardComponent {

	constructor(){

	}

}
