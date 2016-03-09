import {Component} from 'angular2/core';
import {Board} from "../models";

@Component({
    selector: 'board-card',
    inputs: ['board'],
    template: `
<md-card>
      <md-card-title>
        <md-card-title-text>
          <span class="md-headline">{{board.name}}</span>
          <span class="md-subhead">{{board.id}}</span>
        </md-card-title-text>
        <md-card-title-media>
          <img class="card-media md-media-sm" src="https://justindujardin.github.io/ng2-material/public/images/avatars/avatar13.svg">
        </md-card-title-media>
      </md-card-title>
      <md-card-actions layout="row" layout-align="end center">
        <button md-button>Action 1</button>
        <button md-button>Action 2</button>
      </md-card-actions>
    </md-card>
  
  `
})
export class BoardCard {
    board:Board;
}
