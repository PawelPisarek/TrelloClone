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
var BoardCard = (function () {
    function BoardCard() {
    }
    BoardCard = __decorate([
        core_1.Component({
            selector: 'board-card',
            inputs: ['board'],
            template: "\n<md-card>\n      <md-card-title>\n        <md-card-title-text>\n          <span class=\"md-headline\">{{board.name}}</span>\n          <span class=\"md-subhead\">{{board.id}}</span>\n        </md-card-title-text>\n        <md-card-title-media>\n          <img class=\"card-media md-media-sm\" src=\"https://justindujardin.github.io/ng2-material/public/images/avatars/avatar13.svg\">\n        </md-card-title-media>\n      </md-card-title>\n      <md-card-actions layout=\"row\" layout-align=\"end center\">\n        <button md-button>Action 1</button>\n        <button md-button>Action 2</button>\n      </md-card-actions>\n    </md-card>\n  \n  "
        }), 
        __metadata('design:paramtypes', [])
    ], BoardCard);
    return BoardCard;
}());
exports.BoardCard = BoardCard;
//# sourceMappingURL=BoardCard.js.map