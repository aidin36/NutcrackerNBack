
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

var menu = new GameMenu(renderer);
menu.initialize();
