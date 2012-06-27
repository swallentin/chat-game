describe("Game View, placeholder for main view presented during game play.", function(){

  beforeEach(function(){
    this.view = new GameView();
  });

  describe("when instantiated", function(){


    describe("Rendering", function() {

      it("should return the view object", function(){
        expect(this.view.render()).toEqual(this.view);
      });

      it("should render a div", function() {
        this.view.render();
        expect(this.view.el.nodeName).toEqual("DIV");
      });

      it("should have the 'gameview' class", function() {
        this.view.render();
        expect(this.view.el.nodeName).toEqual("DIV");
      });

    });

  });

});