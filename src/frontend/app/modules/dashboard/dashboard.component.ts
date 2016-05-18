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
@RouteConfig([
    {path: '/...', name: 'Board', component: BoardComponent, useAsDefault: true}

])
export class DashboardComponent {
  list: Object[]=[];
 _boards:Array<Board>;
  constructor(private _service:BoardService, private  _router:Router){
	}


  ngOnInit() {
      this._service.getBoards().subscribe(data=> {
          this._boards = data;
          console.log(data[0].id);
          for(var index in data)
          {
            console.log(data[index].name);
            this.addItem(data[index].id,data[index].name,data[index].author);
          }
      });

  }

  onSelect(board:Board) {
      this._router.navigate(['BoardDetail', {id: board.id}]);
  }

  addItem(_id: string,_name: string,_author: string)
  {
      this.list.splice(0,0,
      {
        'id': _id,
        'name': _name,
        'author': _author
      });
  }
}
