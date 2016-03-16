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
var common_1 = require('angular2/common');
var models_1 = require('../models');
var ChatWindow = (function () {
    function ChatWindow() {
        this.draftMessage = new models_1.Message({ text: '' });
    }
    ChatWindow.prototype.onEnter = function (event) {
        console.log(event);
        event.preventDefault();
    };
    ChatWindow = __decorate([
        core_1.Component({
            selector: 'chat-window',
            directives: [
                common_1.FORM_DIRECTIVES],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            template: "\n    <div class=\"chat-window-container\">\n      <div class=\"chat-window\">\n        <div class=\"panel-container\">\n          <div class=\"panel panel-default\">\n\n            <div class=\"panel-heading top-bar\">\n              <div class=\"panel-title-container\">\n                <h3 class=\"panel-title\">\n                  <span class=\"glyphicon glyphicon-comment\"></span>\n                  Chat - \n                </h3>\n              </div>\n              <div class=\"panel-buttons-container\">\n                <!-- you could put minimize or close buttons here -->\n              </div>\n            </div>\n\n            <div class=\"panel-body msg-container-base\">\n              <!--<chat-message-->\n                   <!--*ngFor=\"#message of messages | async\"-->\n                   <!--[message]=\"message\">-->\n              <!--</chat-message>-->\n            </div>\n\n            <div class=\"panel-footer\">\n              <div class=\"input-group\">\n                <input type=\"text\" \n                       class=\"chat-input\"\n                       placeholder=\"Write your message here...\"\n                       (keydown.enter)=\"onEnter($event)\"\n                       [(ngModel)]=\"draftMessage.text\" />\n                <span class=\"input-group-btn\">\n                  <button class=\"btn-chat\"\n                     (click)=\"onEnter($event)\"\n                     >Send</button>\n                </span>\n              </div>\n            </div>\n\n          </div>\n        </div>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], ChatWindow);
    return ChatWindow;
}());
exports.ChatWindow = ChatWindow;
//# sourceMappingURL=ChatWindow.js.map