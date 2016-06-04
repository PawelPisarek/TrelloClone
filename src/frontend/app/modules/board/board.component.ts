import {Component} from "angular2/core";
import {MATERIAL_DIRECTIVES} from "ng2-material/all";
import {HTTP_PROVIDERS} from "angular2/http";
import {RouterOutlet, Router,RouteParams} from 'angular2/router';
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {ElementRef} from "angular2/core";
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
  hideInput : boolean = false;
  tasks : any[] =[
    {
      'name':"TASKNAME0",
      'board': 0
    },
    {
      'name':"TASKNAME1",
      'board': 0
    },
    {
      'name':"TASKNAME2",
      'board': 0
    },
    {
      'name':"TASKNAME3",
      'board': 0
    },
    {
      'name':"TASKNAME4",
      'board': 1
    },
    {
      'name':"TASKNAME5",
      'board': 1
    },
    {
      'name':"TASKNAME6",
      'board': 2
    }
  ];


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

  }
}
