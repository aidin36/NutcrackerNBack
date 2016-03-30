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

var GameViewBase = function(renderer) {
  this._renderer = renderer;
  this._stage = new PIXI.Container();
  
  this._initializeStage();
};

GameViewBase.prototype = {
  _sprites: [],
  _audios: [],
  _stage: NaN,
  _renderer: NaN,

  // Keeps previous sprite, so we can remove it from the stage later.
  _previousIndex: NaN,
  
  _visualHitOKSprite: NaN,
  _visualHitNOKSprite: NaN,
  _audioHitOKSprite: NaN,
  _audioHitNOKSprite: NaN,

  _scoreText: NaN,
  
  /*
   * Draws the visual stimulus.
   * 
   * @param index: Index of visual to show from the list of visual stimuli.
   */
  drawVisual: function(index) {
    this._stage.removeChild(this._sprites[this._previousIndex]);
    this._stage.addChild(this._sprites[index]);

    this._previousIndex = index;

    this._visualHitOKSprite.visible = false;
    this._visualHitNOKSprite.visible = false;
  },
  
  /*
   * Plays the audio stimulus.
   * 
   * @param index: Index of the sound to play from the list of stimuli.
   */
  playAudio: function(index) {
    this._audios[index].play();

    this._audioHitOKSprite.visible = false;
    this._audioHitNOKSprite.visible = false;
  },
  
  /*
   * Draws a hit mark for visual stimulu, e.g. a tick or cross on the right
   * side.
   * 
   * @param correct: True means user was correct on her hit, false otherwise.
   */
  drawVisualHitMark: function(correct) {
    if (correct) {
      this._visualHitOKSprite.visible = true;
    }
    else {
      this._visualHitNOKSprite.visible = true;
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
      this._audioHitOKSprite.visible = true;
    }
    else {
      this._audioHitNOKSprite.visible = true;
    }
  },

  updateScore: function(newScore) {
    this._scoreText.text = "Score: " + newScore;
  },

  /*
   * Re-draws the game scene.
   */
  refreshView: function() {
    this._renderer.render(this._stage);
  },
  
  /*
   * Initializes the stage.
   */
  _initializeStage: function() {
    // TODO: Hardcoded positions and sizes.
    this._visualHitOKSprite = new PIXI.Text("✔",
      {fill: "green", font: "bold 42pt Arial"});
    this._visualHitOKSprite.position.set(550, 220);
    this._visualHitOKSprite.visible = false;

    this._visualHitNOKSprite = new PIXI.Text("✘",
      {fill: "red", font: "bold 42pt Arial"});
    this._visualHitNOKSprite.position.set(550, 220);
    this._visualHitNOKSprite.visible = false;

    this._audioHitOKSprite = new PIXI.Text("✔",
      {fill: "green", font: "bold 42pt Arial"});
    this._audioHitOKSprite.position.set(150, 220);
    this._audioHitOKSprite.visible = false;

    this._audioHitNOKSprite = new PIXI.Text("✘",
      {fill: "red", font: "bold 42pt Arial"});
    this._audioHitNOKSprite.position.set(150, 220);
    this._audioHitNOKSprite.visible = false;

    this._stage.addChild(this._visualHitOKSprite);
    this._stage.addChild(this._visualHitNOKSprite);
    this._stage.addChild(this._audioHitOKSprite);
    this._stage.addChild(this._audioHitNOKSprite);

    // Creating a text to show the Score
    this._scoreText = new PIXI.Text("Score: 0",
      {fill: "blue"});
    this._scoreText.position.set(10, 10);
    this._stage.addChild(this._scoreText);
  },
  
  /*
   * Sets the position and scale of the given sprite.
   */
  _setSpritePosition: function(sprite) {
    //TODO: hardcoded sprite size. Because texture is not loaded yet, and sprite don't know its size.
    sprite.position.x = (this._renderer.width / 2) - (300 / 2);
    sprite.position.y = (this._renderer.height / 2) - (300 / 2); 
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
    this._sprites.push(sprite);
  }

  // Loading audios.
  for (var i = 1; i <= 9; i++) {
    var audio = new Audio("audio/" + i + ".ogg");
    // Pre-loading audio.
    audio.load();
    this._audios.push(audio);
  }
};

OddGameView.prototype = Object.create(GameViewBase.prototype);

var CuteGameView = function(renderer) {
  GameViewBase.call(this, renderer);
  
};

CuteGameView.prototype = Object.create(GameViewBase.prototype);
