
var GameController = function(renderer) {
  this.renderer = renderer;
  this.gameView = new OddGameView(this.renderer);

  currentController = this;
};

GameController.prototype = {
  renderer: NaN,
  gameView: NaN,
  initialize: function() {
    this.gameView.drawVisual(1);
  },
  
  /*
   * Updates the game logic and view.
   * Will be called in every game frame.
   */
  update: function() {
    this.gameView.refreshView();
  }
};

var GameViewBase = function(renderer) {
  this.renderer = renderer;
  this.stage = new PIXI.Container();
};

GameViewBase.prototype = {
  sprites: [],
  stage: NaN,
  renderer: NaN,
  
  /*
   * Draws the visual stimulus.
   * 
   * @param index: Index of visual to show from the list of visual stimuli.
   */
  drawVisual: function(index) {
    this.stage.addChild(this.sprites[index]);
  },
  
  /*
   * Plays the audio stimulus.
   * 
   * @param index: Index of the sound to play from the list of stimuli.
   */
  playAudio: function(index) {
    
  },
  
  /*
   * Re-draws the game scene.
   */
  refreshView: function() {
    this.renderer.render(this.stage);
  },
  
  /*
   * Sets the position and scale of the given sprite.
   */
  _setSpritePosition: function(sprite) {
    //TODO: hardcoded sprite size. Because texture is not loaded yet, and sprite don't know its size.
    sprite.position.x = (this.renderer.width / 2) - (300 / 2);
    sprite.position.y = (this.renderer.height / 2) - (300 / 2); 
  },
};

var OddGameView = function(renderer) {
  GameViewBase.call(this, renderer);

  for (var i = 1; i < 10; i++)
  {
    var sprite = new PIXI.Sprite(
      PIXI.Texture.fromImage("images/odd" + i + ".png"));
    this._setSpritePosition(sprite);
    this.sprites.push(sprite);
  }
};

OddGameView.prototype = Object.create(GameViewBase.prototype);

var CuteGameView = function(renderer) {
  GameViewBase.call(this, renderer);
  
};

CuteGameView.prototype = Object.create(GameViewBase.prototype);
