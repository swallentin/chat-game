describe("AppRouter", function () {

  beforeEach(function(){

    this.collection = new Backbone.Collection();

    this.fetchStub = sinon.stub(this.collection, "fetch")
      .returns(null);

    this.todoListViewStub = sinon.stub(window, "TodoListView")
      .returns(new Backbone.View());

    this.todosCollectionStub = sinon.stub(window, "Todos")
      .returns(this.collection);

    this.router = new AppRouter();

  });

  afterEach(function(){
    window.TodoListView.restore();
    window.Todos.restore();
  });

  describe("Index handler", function() {

    describe("when no todo list exists", function(){

      beforeEach(function(){
        this.router.index();
      });

      it("creates a Todo list collection", function() {
        expect(this.todosCollectionStub).toHaveBeenCalledOnce();
        expect(this.todosCollectionStub).toHaveBeenCalledWithExactly();
      });

      it("creates a Todo list view", function() {
        expect(this.todoListViewStub).toHaveBeenCalledOnce();
        expect(this.todoListViewStub).toHaveBeenCalledWith({
            collection: this.collection
          });
      });

      it("fetches the Todo list from the server", function() {
        expect(this.fetchStub).toHaveBeenCalledOnce();
        expect(this.fetchStub).toHaveBeenCalledWith();
      });

    });
  });

});