import {Component} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {HTTP_PROVIDERS} from "angular2/http";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {BoardComponent} from "../board/board.component";
import {BoardService} from "../board/board.service";
import {Board} from "../board/board.model";
import {Router} from "angular2/router";

@Component({
    selector: 'dashboard',
    templateUrl: 'app/modules/dashboard/dashboard.html',
    providers: [BoardService,HTTP_PROVIDERS],
    directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES]
})
// @RouteConfig([
//     //{path: '/board', name: 'Board', component: BoardComponent, useAsDefault: true}
//
// ])
export class DashboardComponent {
  boards: Board[] = [];
  constructor(private _service:BoardService, private  _router:Router){}

  ngOnInit() {
      this._service.getBoards(1).subscribe(data=> {
          this.boards = data;
      });
  }
  addBoard(name:string){
    this.boards.push(new Board(this.boards.length+1,name,'TuMusiBycWpisanyAutor'));
  }
  gotoDetail(board: Board) {
    let link = ['Board', { id: board.id }];
    console.log(board);
    this._router.navigate(link);
  }

}
