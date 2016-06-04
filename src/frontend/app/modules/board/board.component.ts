import {Component} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {HTTP_PROVIDERS} from "angular2/http";
import {RouterOutlet, Router,RouteParams} from 'angular2/router';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {ElementRef} from "angular2/core";
import {BoardService} from "./board.service";
import {Board} from "./board.model";
import {TaskListComponent} from "../task/task-list.component";
import {Category} from "../category/category.model";
import {CategoryService} from "../category/category.service";
import {TaskNewComponent} from "../task/task-new.component";
declare var jQuery: any;
@Component({
    selector: 'board',
    templateUrl: 'app/modules/board/board.html',
    providers: [BoardService, HTTP_PROVIDERS, CategoryService],
    directives: [MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES, TaskListComponent,TaskNewComponent]
})
// @RouteConfig([
//     {path: '/', name: 'BoardComponent', component: BoardComponent, useAsDefault: true},
//
// ])
export class BoardComponent {
  board : Board ;
      // = new Board(0,"",""); // jeśli nie damy = new Board(0,"","") to przy wyświetlaniu zwraca nulla a i tak w inicie getBoard() zwraca obiekt BOARD
  constructor(private _elRef: ElementRef,
              public route: Router,
              public params: RouteParams,
              public _service:BoardService,
              public _categoryService:CategoryService) {
  }

    hideInput:boolean = false;
    private categories:Category[];

  showInput()
  {
    if(this.hideInput == true)
    {
      this.hideInput=false;
    }else{
      this.hideInput=true;
    }
  }
  clicked(){
    console.log('clicked');
  }

    getCategory() {
        this._categoryService.getCategories()
            .subscribe(data=> {
                this.categories = data;
            }, error=> {
                console.log(error);
            });
    }
  ngOnInit(){
    jQuery(this._elRef.nativeElement).find("#sortable1, #sortable2").sortable({
      connectWith: ".connectedSortable"
    }).disableSelection();
      let id = +this.params.get('id');
      this._service.getBoard(id)
          .subscribe(data=> {
              this.board = data;
          }, error=> {
              console.log(error);
          });

      this.getCategory();

  }
}
