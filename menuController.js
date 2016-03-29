
var MenuController = function(renderer) {
  this._renderer = renderer;
};

MenuController.prototype = {
  _renderer: NaN,
  _menuView: NaN,
  _continueRunning: true,

  initialize: function() {
    this._menuView = new MenuView(this._renderer);
    this._menuView.refreshView();

    this._menuView.onOddThemeButtonClick = this._startOddThemeGame.bind(this);
    this._menuView.onAnimalsThemeButtonClick = this._startAnimalThemeGame.bind(this);

    this.update();
  },

  update: function() {
    if (this._continueRunning) {
      requestAnimationFrame(this.update.bind(this));

      this._menuView.refreshView();
    }
  },

  _startOddThemeGame: function(event) {
    new GameController(this._renderer, OddGameView);
  },

  _startAnimalThemeGame: function(event) {
    new GameController(this._renderer, AnimalGameView);
  },
};
