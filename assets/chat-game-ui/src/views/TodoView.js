var TodoView = Backbone.View.extend({
  tagName: "li",
  initialize: function(options) {
    _.bindAll(this, "edit");
    this.template = Handlebars.compile(options.template || "");
  },
  render: function() {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  },
  events: {
    "click a.edit": "edit"
  },
  edit: function() {
    this.$("h2").fadeOut();
    this.$("input.edit").fadeIn();
  }
});