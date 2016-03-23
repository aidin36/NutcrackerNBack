
var GameController = function(renderer) {
  this.renderer = renderer;
  this.gameView = new OddGameView(this.renderer);

  this.visualSequence = this._generateSequence();
  this.audioSequence = this._generateSequence();

  // Starting the game by handing the control to this controller.
  currentController = this;
  
  window.setInterval(this._nextStimulu.bind(this), 3000);
};

GameController.prototype = {
  renderer: NaN,
  gameView: NaN,
  visualSequence: NaN,
  audioSequence: NaN,
  currentStimuluIndex: 0,
  
  /*
   * Updates the game logic and view.
   * Will be called in every game frame.
   */
  update: function() {
    this.gameView.drawVisual(
      this.visualSequence[this.currentStimuluIndex]["value"]);
    console.log(this.currentStimuluIndex);
    
    this.gameView.refreshView();
  },
  
  _nextStimulu: function() {
    console.log("Tick " + this.currentStimuluIndex);
    this.currentStimuluIndex += 1;
  },
  
  /*
   * Generates a sequence of random numbers between 0 and 8
   */
  _generateSequence: function() {
    result = [];
    
    var counter = 0;
    var previousValue = -1;
    var prepreviousValue = -1;
    
    while (counter < 12) {
      // Random number between zero and 8 (include 8 itself).
      var value = Math.floor(Math.random() * 9);
      
      // Avoding two same stimulu after each others.
      if (value != previousValue) {
        var hit = false;

        // Checking if it's a 2-back.
        if (value == prepreviousValue) {
          hit = true;
        }
        result.push({"value": value,
                     "hit": hit});

        // Preparing for the next loop.
        counter += 1;
        prepreviousValue = previousValue;
        previousValue = value;
      }
    }
    
    return result;
  },
};

var GameViewBase = function(renderer) {
  this.renderer = renderer;
  this.stage = new PIXI.Container();
};

GameViewBase.prototype = {
  sprites: [],
  stage: NaN,
  renderer: NaN,
  // Keeps previous sprite, so we can remove it from the stage later.
  previouslyDrawnVisual: NaN,
  
  /*
   * Draws the visual stimulus.
   * 
   * @param index: Index of visual to show from the list of visual stimuli.
   */
  drawVisual: function(index) {
    // Don't bother setting a new child, if visual hasn't changed yet.
    if (this.previouslyDrawnVisual != this.sprites[index]) {
      this.stage.removeChild(this.previouslyDrawnVisual);
      this.stage.addChild(this.sprites[index]);
      this.previouslyDrawnVisual = this.sprites[index];
    }
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

  for (var i = 0; i < 9; i++)
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
