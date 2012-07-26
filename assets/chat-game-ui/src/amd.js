(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(["_", "jQuery","Backbone, Handlebars, Wami, swfobject"], factory);
    }
}(this, function (_, jQuery, Backbone, Handlebars, Wami, swfobject) {
  //= ../lib/chat-game-ui.js
}));