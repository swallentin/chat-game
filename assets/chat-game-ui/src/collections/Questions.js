var Questions = Backbone.Collection.extend({
  model: Question,
  url: function() {
    return function() {
      console.log(this.urlRoot + this.get('id'));
      return this.urlRoot + this.get('id');
    };
  },
  parse: function(res) {
    return res.alternatives;
  }
});