var GameListItemView = Backbone.View.extend({
  className: 'item game-list-item',
  tagName: 'LI',
  initialize: function() {
    this.template = Handlebars.compile( $("#GameListItemView-template").html() );
  },
  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }
});