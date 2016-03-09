"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var BoardsList = (function () {
    function BoardsList() {
    }
    BoardsList = __decorate([
        core_1.Component({
            selector: 'boards-list',
            template: "\n<md-content class=\"md-padding\" layout=\"row\" layout-wrap layout-align=\"center start\">\n  <div flex=\"50\" flex-xs=\"100\" layout=\"column\">\n    <md-card>\n      <md-card-title>\n        <md-card-title-text>\n          <span class=\"md-headline\">Card with image</span>\n          <span class=\"md-subhead\">Large</span>\n        </md-card-title-text>\n        <md-card-title-media>\n          <img class=\"card-media md-media-lg\" src=\"https://justindujardin.github.io/ng2-material/public/images/avatars/avatar10.svg\">\n        </md-card-title-media>\n      </md-card-title>\n      <md-card-actions layout=\"row\" layout-align=\"end center\">\n        <button md-button>Action 1</button>\n        <button md-button>Action 2</button>\n      </md-card-actions>\n    </md-card>\n    <md-card>\n      <md-card-title>\n        <md-card-title-text>\n          <span class=\"md-headline\">Card with  image</span>\n          <span class=\"md-subhead\">Extra Large</span>\n        </md-card-title-text>\n      </md-card-title>\n      <md-card-content layout=\"row\" layout-align=\"space-between\">\n        <img class=\"card-media md-media-xl\" src=\"https://justindujardin.github.io/ng2-material/public/images/avatars/avatar12.svg\">\n        <md-card-actions layout=\"column\">\n          <button md-button class=\"md-icon-button\" aria-label=\"Favorite\">\n            <i md-icon>favorite</i>\n          </button>\n          <button md-button class=\"md-icon-button\" aria-label=\"Settings\">\n            <i md-icon>menu</i>\n          </button>\n          <button md-button class=\"md-icon-button\" aria-label=\"Share\">\n            <i md-icon>share_arrow</i>\n          </button>\n        </md-card-actions>\n      </md-card-content>\n    </md-card>\n  </div>\n  <div flex=\"50\" flex-xs=\"100\" layout=\"column\">\n    <md-card>\n      <md-card-title>\n        <md-card-title-text>\n          <span class=\"md-headline\">Card with image</span>\n          <span class=\"md-subhead\">Small</span>\n        </md-card-title-text>\n        <md-card-title-media>\n          <img class=\"card-media md-media-sm\" src=\"https://justindujardin.github.io/ng2-material/public/images/avatars/avatar13.svg\">\n        </md-card-title-media>\n      </md-card-title>\n      <md-card-actions layout=\"row\" layout-align=\"end center\">\n        <button md-button>Action 1</button>\n        <button md-button>Action 2</button>\n      </md-card-actions>\n    </md-card>\n    <md-card>\n      <md-card-title>\n        <md-card-title-text>\n          <span class=\"md-headline\">Card with image</span>\n          <span class=\"md-subhead\">Medium</span>\n        </md-card-title-text>\n        <md-card-title-media>\n          <img class=\"card-media md-media-md\" src=\"https://justindujardin.github.io/ng2-material/public/images/avatars/avatar11.svg\">\n        </md-card-title-media>\n      </md-card-title>\n      <md-card-actions layout=\"row\" layout-align=\"end center\">\n        <button md-button>Action 1</button>\n        <button md-button>Action 2</button>\n      </md-card-actions>\n    </md-card>\n  </div>\n</md-content>\n  \n  "
        }), 
        __metadata('design:paramtypes', [])
    ], BoardsList);
    return BoardsList;
}());
exports.BoardsList = BoardsList;
//# sourceMappingURL=BoardsList.js.map