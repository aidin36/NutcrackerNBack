
var GameViewBase = function(renderer) {
  this.renderer = renderer;
  this.stage = new PIXI.Container();
  
  this._initializeStage();
};

GameViewBase.prototype = {
  sprites: [],
  audios: [],
  stage: NaN,
  renderer: NaN,

  // Keeps previous sprite, so we can remove it from the stage later.
  previousIndex: NaN,
  
  visualHitOK: NaN,
  visualHitNOK: NaN,
  audioHitOK: NaN,
  audioHitNOK: NaN,
  
  /*
   * Draws the visual stimulus.
   * 
   * @param index: Index of visual to show from the list of visual stimuli.
   */
  drawVisual: function(index) {
    this.stage.removeChild(this.sprites[this.previousIndex]);
    this.stage.addChild(this.sprites[index]);

    this.previousIndex = index;

    this.visualHitOK.visible = false;
    this.visualHitNOK.visible = false;
  },
  
  /*
   * Plays the audio stimulus.
   * 
   * @param index: Index of the sound to play from the list of stimuli.
   */
  playAudio: function(index) {
    this.audios[index].play();

    this.audioHitOK.visible = false;
    this.audioHitNOK.visible = false;
  },
  
  /*
   * Draws a hit mark for visual stimulu, e.g. a tick or cross on the right
   * side.
   * 
   * @param correct: True means user was correct on her hit, false otherwise.
   */
  drawVisualHitMark: function(correct) {
    if (correct) {
      this.visualHitOK.visible = true;
    }
    else {
      this.visualHitNOK.visible = true;
    }
  },

  /*
   * Draws a hit mark for audio stimulu, e.g. a tick or cross on the left
   * side.
   * 
   * @param correct: True means user was correct on her hit, false otherwise.
   */
  drawAudioHitMark: function(correct) {
    if (correct) {
      this.audioHitOK.visible = true;
    }
    else {
      this.audioHitNOK.visible = true;
    }
  },

  updateScore: function(newScore) {
    
  },

  /*
   * Re-draws the game scene.
   */
  refreshView: function() {
    this.renderer.render(this.stage);
  },
  
  /*
   * Initializes the stage.
   */
  _initializeStage: function() {
    // TODO: Hardcoded positions and sizes.
    this.visualHitOK = new PIXI.Text("✔", {fill: "green"});
    this.visualHitOK.position.set(550, 220);
    this.visualHitOK.scale.set(2, 2);
    this.visualHitOK.visible = false;

    this.visualHitNOK = new PIXI.Text("✘", {fill: "red"});
    this.visualHitNOK.position.set(550, 220);
    this.visualHitNOK.scale.set(2, 2);
    this.visualHitNOK.visible = false;

    this.audioHitOK = new PIXI.Text("✔", {fill: "green"});
    this.audioHitOK.position.set(150, 220);
    this.audioHitOK.scale.set(2, 2);
    this.audioHitOK.visible = false;

    this.audioHitNOK = new PIXI.Text("✘", {fill: "red"});
    this.audioHitNOK.position.set(150, 220);
    this.audioHitNOK.scale.set(2, 2);
    this.audioHitNOK.visible = false;

    this.stage.addChild(this.visualHitOK);
    this.stage.addChild(this.visualHitNOK);
    this.stage.addChild(this.audioHitOK);
    this.stage.addChild(this.audioHitNOK);
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

  // Loading sprites.
  for (var i = 0; i <= 8; i++)
  {
    var sprite = new PIXI.Sprite(
      PIXI.Texture.fromImage("images/odd" + i + ".png"));
    this._setSpritePosition(sprite);
    this.sprites.push(sprite);
  }

  // Loading audios.
  for (var i = 1; i <= 9; i++) {
    var audio = new Audio("audio/" + i + ".ogg");
    // Pre-loading audio.
    audio.load();
    this.audios.push(audio);
  }
};

OddGameView.prototype = Object.create(GameViewBase.prototype);

var CuteGameView = function(renderer) {
  GameViewBase.call(this, renderer);
  
};

CuteGameView.prototype = Object.create(GameViewBase.prototype);
