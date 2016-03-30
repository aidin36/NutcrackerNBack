/*
 * This file is part of NutcrackerNBack.
 * Copyright (C) 2016, Aidin Gharibnavaz <aidin@aidinhut.com>
 *
 * NutcrackerNBack is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * NutcrackerNBack is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with NutcrackerNBack. If not, see <http://www.gnu.org/licenses/>.
 */

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
