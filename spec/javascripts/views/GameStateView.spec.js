describe("Game State View, the header presented during game play.", function(){

  beforeEach(function(){
    this.model = new Backbone.Model({
      topic: {
        imgUrl: '/topic/img',
        description: '/topic',
      },
      playerA: {
        profileImgUrl: '/playerA/profile/img'
      },
      playerB: {
        profileImgUrl: '/playerB/profile/img'
      },
      score: 21
    });
    this.view = new GameStateView({
      model: this.model,
      template: this.templates.GameStateView
    });
  });

  describe("when instantiated", function(){

    it("should return the view object when rendering", function(){
      expect(this.view.render()).toEqual(this.view);
    });

    describe("Rendering", function() {
      beforeEach(function(){
        this.view.render();
      });


      it("should render a div", function() {
        expect(this.view.el.nodeName).toEqual("DIV");
      });

      it("should render the correct classes", function() {
        expect(this.view.el).toHaveClass("game-state-info");
        expect(this.view.el).toHaveClass("btn-inverse");
      });


    });

  });

});