describe("TodoView", function(){

  beforeEach(function() {
    this.model = new Backbone.Model({
      id:1,
      title: "My Todo",
      priority: 2,
      done: false
    })
    this.view = new TodoView({
      model: this.model,
      template: this.templates.todo
    })
    setFixtures('<ul class="todos"></ul>');
  });

  afterEach(function(){
  });

  describe("Rendering", function() {

    it("returns the view object", function(){
      expect(this.view.render()).toEqual(this.view);
    });

    xit("produces the correct html", function() {
      this.view.render();
      expect(this.view.el.innerHTML)
        .toEqual('<a href="#todo/1"><h2>My Todo</h2></a>');
    });

  });

  describe("Template", function() {
    
    beforeEach(function() {
      $(".todos").append(this.view.render().el);
    })

    it("has the correct URL", function() {
      expect($(this.view.el).find("a"))
        .toHaveAttr("href", "#todo/1");
    });

    it("has the correct title text", function(){
      expect($(this.view.el).find('h2'))
        .toHaveText("My Todo");
    });

  });

  describe("When todo is done", function(){

    beforeEach(function() {
      this.model.set({done: true}, {silent:true});
      $(".todos").append(this.view.render().el);
    });

    it("has a done class", function() {
      expect($(".todos a:first-child"))
        .toHaveClass("done");
    });

  });

  describe("Edit state", function() {

    describe("when edit button handler fired", function() {

      beforeEach(function() {
        this.clock = sinon.useFakeTimers();
        $("ul.todos").append(this.view.render().el);
        this.li = $('ul.todos. li:first');
        this.li.find("a.edit").trigger("click");
      });

      beforeEach(function() {
        this.clock.restore();
      });

      it("shows the edit input field", function() {
        this.clock.tick(600);
        expect(this.li.find("input.edit"))
          .toBeVisible();
        expect(this.li.find("h2"))
          .not.toBeVisible();
      });

    })

  });

});