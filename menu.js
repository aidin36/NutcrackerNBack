
var GameMenu = function(renderer) {
  this.renderer = renderer;
};

GameMenu.prototype = {
  renderer: NaN,
  initialize: function() {
    //var stage = new PIXI.Container();
    //renderer.render(stage);
    var controller = new GameController(this.renderer);
  },
};
