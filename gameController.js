
var GameController = function(renderer) {
  this.renderer = renderer;
  this.gameView = new OddGameView(this.renderer);

  this.visualSequence = this._generateSequence();
  this.audioSequence = this._generateSequence();

  window.addEventListener("keydown", this._keyDownHandler.bind(this), false);

  // Starting the game.
  this.update();
  
  // Interval to update stimulu.
  this.logicTimer = window.setInterval(this._nextStimulu.bind(this), 2000);
};

GameController.prototype = {
  renderer: NaN,
  gameView: NaN,
  logicTimer: NaN,
  visualSequence: NaN,
  audioSequence: NaN,
  currentStimuluIndex: 0,
  previousStimuluIndex: -1,
  score: 0,
  // Will set to true if user previously hited a key for stimulu.
  visualKeyHited: false,
  audioKeyHited: false,
  
  /*
   * Updates the game logic and view.
   * Will be called in every game frame.
   */
  update: function() {
    requestAnimationFrame(this.update.bind(this));
    
    // Don't update with the same index more than once.
    if (this.currentStimuluIndex != this.previousStimuluIndex) {
      this.gameView.drawVisual(
        this.visualSequence[this.currentStimuluIndex]["value"]);
      this.gameView.playAudio(
        this.audioSequence[this.currentStimuluIndex]["value"]);
      
      this.visualKeyHited = false;
      this.audioKeyHited = false;
    }

    this.previousStimuluIndex = this.currentStimuluIndex;

    // Refreshing the view.
    this.gameView.refreshView();
  },
  
  /*
   * Handles key event of the window.
   */
  _keyDownHandler: function(event) {
    if (!this.visualKeyHited && event.keyCode == 74) {
      // User press the key of visual stimulu (J).
      this.visualKeyHited = true;
      if (this.visualSequence[this.currentStimuluIndex]["hit"]) {
        this.gameView.drawVisualHitMark(true);
        this.score += 1;
      }
      else {
        this.gameView.drawVisualHitMark(false);
        this.score -= 1;
      }
    }
    
    if (!this.audioKeyHited && event.keyCode == 70) {
      // User press the key of audio stimulu (F).
      this.audioKeyHited = true;
      if (this.audioSequence[this.currentStimuluIndex]["hit"]) {
        this.gameView.drawAudioHitMark(true);
        this.score += 1;
      }
      else {
        this.gameView.drawAudioHitMark(false);
        this.score -= 1;
      }
    }

    this.gameView.updateScore(this.score);
  },

  /*
   * This funciton would be called in an interval, and loads the next stimulu.
   */  
  _nextStimulu: function() {
    this.currentStimuluIndex += 1;
    
    // Stop the timer if stimuli ends.
    if (this.currentStimuluIndex >= 11) {
      window.clearInterval(this.logicTimer);
    }
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
