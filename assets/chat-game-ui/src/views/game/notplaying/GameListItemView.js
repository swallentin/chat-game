var GameListItemView = Backbone.View.extend({
  tagName: "LI",
  className: "item game-list-item",
  initialize: function() {
    this.template = Handlebars.compile( $("#GameListItemView-template").html() );
  },
  render: function() {
    var output = this.template(this.model.toJSON());
    $(this.el).html(output);
    return this;
  }
});