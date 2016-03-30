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
