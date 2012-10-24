describe("Todos collection", function() {

  beforeEach(function() {
    this.todo1 = new Backbone.Model({
      id: 1,
      title: "Todo 1",
      priority: 3
    });
    this.todo2 = new Backbone.Model({
      id: 2,
      title: "Todo 2",
      priority: 2
    });
    this.todo3 = new Backbone.Model({
      id: 3,
      title: "Todo 3",
      priority: 1
    });

    this.todoStub = sinon.stub(window, "Todo");
    this.todos = new Todos();
  });

  afterEach(function() {
    this.todoStub.restore();
  });

  describe("when instantiated with model literal", function() {

    beforeEach(function() {
      this.model = new Backbone.Model({
        id: 5,
        title: "Foo"
      });

      this.todoStub.returns(this.model);
      this.todos.model = Todo; // reset the model relationship to use the stub
      this.todos.add({
        id: 5,
        title: "Foo"
      });

    });

    it("should add a model", function() {
      expect(this.todos.length).toEqual(1);
    });

    it("should order models by priority", function() {
      this.todos.add([this.todo1, this.todo2, this.todo3]);
      expect(this.todos.at(0)).toBe(this.todo3);
      expect(this.todos.at(1)).toBe(this.todo2);
      expect(this.todos.at(2)).toBe(this.todo1);
    });

  });

  describe("when fetching collection from server", function() {

    beforeEach(function() {
      this.fixture = this.fixtures.Todos.valid;
      this.server = sinon.fakeServer.create();
      this.server.respondWith("GET", "/todos", this.validResponse(this.fixture));
    });

    afterEach(function() {
      this.server.restore();
    });

    it("should make the correct request", function() {
      this.todos.fetch();
      expect(this.server.requests.length).toEqual(1);
      expect(this.server.requests[0].method).toEqual("GET");
      expect(this.server.requests[0].url).toEqual("/todos");
    });

    it("should parse the todos from the response", function() {
      this.todos.fetch();

      this.server.respond();
      expect(this.todos.length).toEqual(this.fixture.response.todos.length);
      expect(this.todos.get(1).get("title")).toEqual(this.fixture.response.todos[0].title);
    });

  });


});