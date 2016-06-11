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
  user: string = "TUTAJ POBRAC USERA";
  boards: Board[] = [];
  constructor(private _service:BoardService, private  _router:Router){}

  ngOnInit() {
      this._service.getBoards().subscribe(data=> {
          this.boards = data;
          console.log(this.boards);
      },error => {
          console.log(error);
      });
  }
  addBoard(name:string){
    this.boards.push(new Board(this.boards.length+1,name,'TuMusiBycWpisanyAutor'));
      this._service.createBoard(new Board(this.boards.length+1,name,'TuMusiBycWpisanyAutor'))
          .subscribe(data=>{
              console.log(data);
          })
  }
  gotoDetail(board: Board) {
    let link = ['Board', { id: board.id }];
    this._router.navigate(link);
  }

}
