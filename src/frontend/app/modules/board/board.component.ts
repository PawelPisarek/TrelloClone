import {Component} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {HTTP_PROVIDERS} from "angular2/http";
import {RouterOutlet, Router,RouteParams} from 'angular2/router';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {BoardListComponent} from "./board.list.component";
import {BoardDetailComponent} from "./board-detail.component";
import {BoardService} from "./board.service";
import {Board} from "./board.model";
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
  board : Board = new Board(0,"",""); // jeśli nie damy = new Board(0,"","") to przy wyświetlaniu zwraca nulla a i tak w inicie getBoard() zwraca obiekt BOARD
  constructor(public route: Router,public params: RouteParams,public _service:BoardService){}

  ngOnInit(){
    this._service.getBoard(+this.params.get('id')).subscribe(data=> {
        this.board = data;
    });

  }
}
