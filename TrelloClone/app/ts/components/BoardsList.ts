import {Component} from 'angular2/core';

@Component({
    selector: 'boards-list',
    template: `
<md-content class="md-padding" layout="row" layout-wrap layout-align="center start">
  <div flex="50" flex-xs="100" layout="column">
    <md-card>
      <md-card-title>
        <md-card-title-text>
          <span class="md-headline">Card with image</span>
          <span class="md-subhead">Large</span>
        </md-card-title-text>
        <md-card-title-media>
          <img class="card-media md-media-lg" src="https://justindujardin.github.io/ng2-material/public/images/avatars/avatar10.svg">
        </md-card-title-media>
      </md-card-title>
      <md-card-actions layout="row" layout-align="end center">
        <button md-button>Action 1</button>
        <button md-button>Action 2</button>
      </md-card-actions>
    </md-card>
    <md-card>
      <md-card-title>
        <md-card-title-text>
          <span class="md-headline">Card with  image</span>
          <span class="md-subhead">Extra Large</span>
        </md-card-title-text>
      </md-card-title>
      <md-card-content layout="row" layout-align="space-between">
        <img class="card-media md-media-xl" src="https://justindujardin.github.io/ng2-material/public/images/avatars/avatar12.svg">
        <md-card-actions layout="column">
          <button md-button class="md-icon-button" aria-label="Favorite">
            <i md-icon>favorite</i>
          </button>
          <button md-button class="md-icon-button" aria-label="Settings">
            <i md-icon>menu</i>
          </button>
          <button md-button class="md-icon-button" aria-label="Share">
            <i md-icon>share_arrow</i>
          </button>
        </md-card-actions>
      </md-card-content>
    </md-card>
  </div>
  <div flex="50" flex-xs="100" layout="column">
    <md-card>
      <md-card-title>
        <md-card-title-text>
          <span class="md-headline">Card with image</span>
          <span class="md-subhead">Small</span>
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
    <md-card>
      <md-card-title>
        <md-card-title-text>
          <span class="md-headline">Card with image</span>
          <span class="md-subhead">Medium</span>
        </md-card-title-text>
        <md-card-title-media>
          <img class="card-media md-media-md" src="https://justindujardin.github.io/ng2-material/public/images/avatars/avatar11.svg">
        </md-card-title-media>
      </md-card-title>
      <md-card-actions layout="row" layout-align="end center">
        <button md-button>Action 1</button>
        <button md-button>Action 2</button>
      </md-card-actions>
    </md-card>
  </div>
</md-content>
  
  `
})
export class BoardsList {
}