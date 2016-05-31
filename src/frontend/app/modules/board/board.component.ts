import {Component} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {HTTP_PROVIDERS} from "angular2/http";
import {RouterOutlet, Router,RouteParams} from 'angular2/router';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {ElementRef} from "angular2/core";
import {BoardListComponent} from "./board.list.component";
import {BoardDetailComponent} from "./board-detail.component";
import {BoardService} from "./board.service";
import {Board} from "./board.model";
declare var jQuery: any;
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
  constructor(private _elRef: ElementRef, public route: Router,public params: RouteParams,public _service:BoardService){}

  clicked(){
    console.log('clicked');
  }
  ngOnInit(){
    jQuery(this._elRef.nativeElement).find("#sortable1, #sortable2").sortable({
      connectWith: ".connectedSortable"
    }).disableSelection();
    this._service.getBoard(+this.params.get('id')).subscribe(data=> {
        this.board = data;
    });

  }
}
