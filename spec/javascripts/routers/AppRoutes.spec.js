describe("AppRouter routes", function () {

  beforeEach(function() {
    this.router = new AppRouter;
    this.routerSpy = sinon.spy();
    try {
      Backbone.history.start({silent:true, pushState: true})
    } catch(e) {}
    this.router.navigate("elsewhere");
  });

  it("fires the todo detail route", function(){
    this.router.bind("route:todo", this.routerSpy);
    this.router.navigate("todo/1", true);
    expect(this.routerSpy).toHaveBeenCalledOnce();
    expect(this.routerSpy).toHaveBeenCalledWith("1");
  });

  it("fires the index route with a blank hash", function() {
    this.router.bind("route:index", this.routerSpy);
    this.router.navigate("", true);
    expect(this.routerSpy).toHaveBeenCalledOnce();
    expect(this.routerSpy).toHaveBeenCalledWith();
  });
});