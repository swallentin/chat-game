beforeEach(function(){
  this.templates = _.extend(this.templates || {}, {
    GameStateView: '<div class="game-info left">' +
											'<div class="avatar">' +
												'<img src="{{topic.imgUrl}}">' +
											'</div>' +
											'<span class="text">{{topic.description}}</span>' +
										'</div>' +
										'<div class="game-info right game-status">' + 
											'<div class="avatar">' + 
												'<img src="{{playerA.profileImgUrl}}"/>' +
											'</div>' + 
											'<div class="avatar">' + 
												'<img src="{{playerB.profileImgUrl}}"/>' + 
											'</div>' +
											'<span class="text">{{score}} x</span>' +
											'<i class="icon-star icon-yellow game-score"></i>' +
										'</div>'
  });
});
