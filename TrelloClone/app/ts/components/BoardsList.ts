import {Component, OnInit} from 'angular2/core';
import {ConnectToApi} from "../services/ConnectToApi";
import {Board} from "../models";
import {BoardCard} from "./BoardCard";

@Component({
    selector: 'boards-list',
    providers: [ConnectToApi],
    directives: [BoardCard],
    template: `
<md-content class="md-padding" layout="row" layout-wrap layout-align="center start">
  <div flex="50" flex-xs="100" layout="column">
   <board-card *ngFor="#board of boards" [board]="board"></board-card>
  </div>
</md-content>
  
  `
})
export class BoardsList implements OnInit {
    private boards:Board[];

    constructor(private _service:ConnectToApi) {
    }

    ngOnInit():void {
        this._service.getBoards().subscribe((boards)=>this.boards = boards);

    }
}
