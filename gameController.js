
var GameController = function(renderer, themeClass) {
  this._renderer = renderer;
  this._gameView = new themeClass(this._renderer);

  this._visualSequence = this._generateSequence();
  this._audioSequence = this._generateSequence();

  window.addEventListener("keydown", this._keyDownHandler.bind(this), false);

  // Starting the game.
  this.update();
  
  // Interval to update stimulu.
  this._logicTimer = window.setInterval(this._nextStimulu.bind(this), 2000);
};

GameController.prototype = {
  _renderer: NaN,
  _gameView: NaN,
  _logicTimer: NaN,
  _visualSequence: NaN,
  _audioSequence: NaN,
  _currentStimuluIndex: 0,
  _previousStimuluIndex: -1,
  _score: 0,
  // Will set to true if user previously hited a key for stimulu.
  _visualKeyHited: false,
  _audioKeyHited: false,
  
  /*
   * Updates the game logic and view.
   * Will be called in every game frame.
   */
  update: function() {
    requestAnimationFrame(this.update.bind(this));
    
    // Don't update with the same index more than once.
    if (this._currentStimuluIndex != this._previousStimuluIndex) {
      this._gameView.drawVisual(
        this._visualSequence[this._currentStimuluIndex]["value"]);
      this._gameView.playAudio(
        this._audioSequence[this._currentStimuluIndex]["value"]);
      
      this._visualKeyHited = false;
      this._audioKeyHited = false;
    }

    this._previousStimuluIndex = this._currentStimuluIndex;

    // Refreshing the view.
    this._gameView.refreshView();
  },
  
  /*
   * Handles key event of the window.
   */
  _keyDownHandler: function(event) {
    if (!this._visualKeyHited && event.keyCode == 74) {
      // User press the key of visual stimulu (J).
      this._visualKeyHited = true;
      if (this._visualSequence[this._currentStimuluIndex]["hit"]) {
        this._gameView.drawVisualHitMark(true);
        this._score += 1;
      }
      else {
        this._gameView.drawVisualHitMark(false);
        this._score -= 1;
      }
    }
    
    if (!this._audioKeyHited && event.keyCode == 70) {
      // User press the key of audio stimulu (F).
      this._audioKeyHited = true;
      if (this._audioSequence[this._currentStimuluIndex]["hit"]) {
        this._gameView.drawAudioHitMark(true);
        this._score += 1;
      }
      else {
        this._gameView.drawAudioHitMark(false);
        this._score -= 1;
      }
    }

    this._gameView.updateScore(this._score);
  },

  /*
   * This funciton would be called in an interval, and loads the next stimulu.
   */  
  _nextStimulu: function() {
    this._currentStimuluIndex += 1;
    
    // Stop the timer if stimuli ends.
    if (this._currentStimuluIndex >= 11) {
      window.clearInterval(this._logicTimer);
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
