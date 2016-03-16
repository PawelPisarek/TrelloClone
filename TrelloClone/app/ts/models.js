"use strict";
var Board = (function () {
    function Board(id, name) {
        this.id = id;
        this.name = name;
    }
    return Board;
}());
exports.Board = Board;
var User = (function () {
    function User() {
    }
    return User;
}());
exports.User = User;
var Thread = (function () {
    function Thread() {
    }
    return Thread;
}());
exports.Thread = Thread;
var Message = (function () {
    function Message(obj) {
        this.id = obj && obj.id || 'ssasdasds0';
        this.isRead = obj && obj.isRead || false;
        this.sentAt = obj && obj.sentAt || new Date();
        this.author = obj && obj.author || null;
        this.text = obj && obj.text || null;
        this.thread = obj && obj.thread || null;
    }
    return Message;
}());
exports.Message = Message;
//# sourceMappingURL=models.js.map