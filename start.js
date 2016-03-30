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

// This global variable keeps the current class that should control the game.
var currentController = NaN;

/*
 * Main loop of the game.
 */
// TODO: Move it to views.
var gameLoop = function() {
  requestAnimationFrame(gameLoop);

  if (currentController)
  {
    currentController.update();
  }
};


// Creating a renderer, and add it to the DOM.
//var renderer = new PIXI.autoDetectRenderer(800, 600);
var renderer = new PIXI.WebGLRenderer(800, 600);
renderer.backgroundColor = 0xfffff5;
document.getElementById("game-scene").appendChild(renderer.view);

gameLoop();

var menu = new MenuController(renderer);
menu.initialize();
