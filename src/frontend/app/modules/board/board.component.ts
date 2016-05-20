import {Component} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {HTTP_PROVIDERS} from "angular2/http";
import {RouterOutlet, Router,RouteParams} from 'angular2/router';
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
// @RouteConfig([
//     {path: '/', name: 'BoardComponent', component: BoardComponent, useAsDefault: true},
//
// ])
export class BoardComponent {
  private boardName:string;
  constructor(public route: Router, params: RouteParams){
      this.boardId = params.get('id');
  }
  ngOnInit(){

  }
}
