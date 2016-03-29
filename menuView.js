
var MenuView = function(renderer) {
  this._renderer = renderer;
  this._stage = new PIXI.Container();

  this._initializeStage();
};

MenuView.prototype = {
  _renderer: NaN,
  _stage: NaN,
  
  // Events for clicking buttons.
  onOddThemeButtonClick: NaN,
  onAnimalsThemeButtonClick: NaN,


  /*
   * Re-draw the stage on the renderer.
   */
  refreshView: function() {
    this._renderer.render(this._stage);
  },

  _initializeStage: function() {
    //TODO: hardcoded sprite size. Because texture is not loaded yet, and sprite don't know its size.
    var oddThemeButton = new PIXI.Sprite.fromImage("images/OddThemeButton.png");
    oddThemeButton.position.x = (this._renderer.width / 2) - (300 / 2);
    oddThemeButton.position.y = (this._renderer.height / 2) - (300 / 2); 
    oddThemeButton.mousedown = this._onOddThemeButton.bind(this);
    oddThemeButton.interactive = true;

    var animalsThemeButton = new PIXI.Sprite.fromImage("images/AnimalsThemeButton.png");
    animalsThemeButton.position.x = (this._renderer.width / 2) - (300 / 2);
    animalsThemeButton.position.y = (this._renderer.height / 2) - (300 / 2) + 40; 
    animalsThemeButton.mousedown = this._onAnimalsThemeButton.bind(this);
    animalsThemeButton.interactive = true;

    this._stage.addChild(oddThemeButton);
    this._stage.addChild(animalsThemeButton);
  },

  /*
   * Will be called when user clicks on the Odd Theme button.
   */
  _onOddThemeButton: function(event) {
    if (this.onOddThemeButtonClick) {
      this.onOddThemeButtonClick(event);
    }
  },

  /*
   * Will be called when user clicks on the Animal Theme button.
   */
  _onAnimalsThemeButton: function(event) {
    if (this.onAnimalsThemeButtonClick) {
      this.onAnimalsThemeButtonClick(event);
    }
  },
};
