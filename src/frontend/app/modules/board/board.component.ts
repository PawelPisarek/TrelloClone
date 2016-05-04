import {Component} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {HTTP_PROVIDERS} from "angular2/http";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {BoardListComponent} from "./board.list.component";
import {BoardDetailComponent} from "./board-detail.component";
import {BoardService} from "./board.service";
@Component({
    selector: 'board',
    templateUrl: 'app/modules/board/board.html',
    providers: [BoardService, HTTP_PROVIDERS],
    directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/', name: 'BoardList', component: BoardListComponent, useAsDefault: true},
    {path: '/:id/...', name: 'BoardDetail', component: BoardDetailComponent}

])
export class BoardComponent {

}
