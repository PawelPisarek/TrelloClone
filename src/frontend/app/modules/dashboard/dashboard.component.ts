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
  list: Object[] = [];
	constructor(){
    
      this.addItem("testid","testname","testautor");
      this.addItem("testid2","testname2","testautor2");
      this.addItem("testid3","testname3","testautor3");
      this.addItem("testid4","testname4","testautor4");
      this.addItem("testid5","testname5","testautor5");
      this.addItem("testid6","testname6","testautor6");
      this.addItem("testid7","testname7","testautor7");
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
