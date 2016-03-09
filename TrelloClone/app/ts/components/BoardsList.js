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
var ConnectToApi_1 = require("../services/ConnectToApi");
var BoardCard_1 = require("./BoardCard");
var BoardsList = (function () {
    function BoardsList(_service) {
        this._service = _service;
    }
    BoardsList.prototype.ngOnInit = function () {
        var _this = this;
        this._service.getBoards().subscribe(function (boards) { return _this.boards = boards; });
    };
    BoardsList = __decorate([
        core_1.Component({
            selector: 'boards-list',
            providers: [ConnectToApi_1.ConnectToApi],
            directives: [BoardCard_1.BoardCard],
            template: "\n<md-content class=\"md-padding\" layout=\"row\" layout-wrap layout-align=\"center start\">\n  <div flex=\"50\" flex-xs=\"100\" layout=\"column\">\n   <board-card *ngFor=\"#board of boards\" [board]=\"board\"></board-card>\n  </div>\n</md-content>\n  \n  "
        }), 
        __metadata('design:paramtypes', [ConnectToApi_1.ConnectToApi])
    ], BoardsList);
    return BoardsList;
}());
exports.BoardsList = BoardsList;
//# sourceMappingURL=BoardsList.js.map