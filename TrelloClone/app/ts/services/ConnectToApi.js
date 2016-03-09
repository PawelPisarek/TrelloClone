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
var http_1 = require("angular2/http");
var models_1 = require("../models");
var ConnectToApi = (function () {
    function ConnectToApi(http) {
        this.http = http;
    }
    ConnectToApi.prototype.getBoards = function () {
        return this.http.get("https://api.trello.com/1/member/me/boards?key=9a3819808f99910b07298c67795ab160&token=1b344a228d231bd368d6c124cc50ff8805fe55abdb9721b605ba243bdbc744a2")
            .map(function (res) { return res.json(); })
            .map(function (jboards) {
            var result = [];
            if (jboards) {
                jboards.forEach(function (jboard) {
                    result.push(new models_1.Board(jboard.id, jboard.name));
                });
            }
            return result;
        });
    };
    ConnectToApi = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ConnectToApi);
    return ConnectToApi;
}());
exports.ConnectToApi = ConnectToApi;
//# sourceMappingURL=ConnectToApi.js.map