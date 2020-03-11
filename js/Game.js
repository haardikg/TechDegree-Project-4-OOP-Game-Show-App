/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Game.js */

class Game {
  constructor(missed, phrases, activePhrase) {
    this.missed = 0;
    this.phrases = this.createPhrases();
    this.activePhrase = null;
  }

  /**
   * Create phrases for use in game
   * @return (array) An array of phrases that could be used in the game
   */
  createPhrases() {
    const phrases = [
      new Phrase('easy peasy lemon squeezy'),
      new Phrase('apple of my eye'),
      new Phrase('down to the wire'),
      new Phrase('rome was not built in a day'),
      new Phrase('too many cooks in the kitchen')
    ];
    return phrases;
  }

  /**
   * Begins game by selecting random phrase and displaying it to user
   */
  startGame() {
    // Add value attr to qwerty button elements
    const keyButtons = document.querySelectorAll(`button.key`);
    for (let i = 0; i < keyButtons.length; i++) {
      keyButtons[i].value = keyButtons[i].textContent;
    }
    // hide screen overlay
    const overlay = document.querySelector('#overlay');
    overlay.style.display = 'none';
    // call getRandomPhrase() to get phrase from array, store in activePhrase
    this.activePhrase = this.getRandomPhrase();
    // add the phrase to gameboard w/ addPhraseToDisplay()
    this.activePhrase.addPhraseToDisplay();

  }

  /**
   * Restarts game by selecting new random phrase and displaying it to user
   */
  resetGame() {
    // remove all 'li' elements from the Phrase 'ul'
    const selectedLetters = document.querySelectorAll(`#phrase ul li`);
    for (let i = 0; i < selectedLetters.length; i++) {
      selectedLetters[i].remove();
    }
    // enable all of the onscreen keyboard btns and update each to use '.key'
    const keyButton = document.querySelectorAll(`#qwerty div button`);
    for (let i = 0; i < keyButton.length; i++) {
      keyButton[i].className = 'key';
      keyButton[i].disabled = false;
    }
    // Reset all heart images
    this.missed = 0;
    const hearts = document.querySelectorAll('li.tries');
    for (let i = 0; i < 5; i++) {
      hearts[i].innerHTML = '<img src="images/liveHeart.png" alt="Heart Icon" height="35" width="30">';
    }
  }

  /**
   * Selects randome phrase from phrases property
   * @return (Object) Phrase object chosed to be used
   */
  getRandomPhrase() {
    let randomPhrase = this.phrases[Math.floor(Math
      .random() * this.phrases.length)];
    return randomPhrase;
  }

  /**
   * Method for calling other methods to get game going
   * Will handle disabling chosen letters so user cannot repeat guess
   */
  handleInteraction(button) {
    const keyButton = document.querySelector(`button[value="${button}"]`);
    const activeLetters = this.activePhrase.phrase.split('');
    const selectedLetter = document.querySelectorAll(`li.show.letter`);

    this.activePhrase.showMatchedLetter(button);

    if (activeLetters.includes(keyButton.value)) {
      keyButton.className = 'chosen';
      keyButton.disabled = true;
      if (this.checkForWin()) {
        this.gameOver(true);
      }
    } else if (activeLetters.includes(keyButton.value) === false) {
      keyButton.className = 'wrong';
      keyButton.disabled = true;
      this.removeLife();
    }

    if (this.missed === 5) {
      this.gameOver(this.checkForWin());
    }

  }

  /**
   * Increases the value of the missed property
   * Removes a life from the scorebaord
   * Checks if player has remaining lives and ends game if player is out
   */
  removeLife() {
    this.missed += 1;
    const hearts = document.querySelectorAll('li.tries');
    for (let i = 0; i < this.missed; i++) {
      hearts[i].innerHTML = '<img src="images/lostHeart.png" alt="Heart Icon" height="35" width="30">';
    }
  }

  /**
   * Checks for winning move
   * @return (boolean) True is game has been won, false if loss
   */
  checkForWin() {
    const activeLetters = this.activePhrase.phrase.split('');
    const selectedLetter = document.querySelectorAll(`li.show.letter`);

    for (let i = 0; i < activeLetters.length; i++) {
      if (activeLetters[i] === ' ') {
        activeLetters.pop(activeLetters[i]);
      }
    }

    for (let i = 0; i < activeLetters.length; i++) {
      if (selectedLetter.length === activeLetters.length) {
        return true;
      } else {
        return false;
      }
    }
  }

  /**
   * Displays game over message
   * @param (boolean) gameWon - Whether or not the user won the game
   */
  gameOver(gameWon) {
    const overlay = document.querySelector('#overlay');
    const overlayDiv = document.querySelector('#game-over-message');
    const startButton = document.querySelector('#btn__reset');
    const startMessage = document.querySelector('.title');
    if (gameWon) {
      overlayDiv.textContent = 'You won!!!';
      overlay.className = 'win';
      startButton.value = 'play_again';
      startButton.textContent = 'Play Again';
      startMessage.className = 'title winning';
    } else {
      overlayDiv.textContent = 'You lost :(';
      overlay.className = 'lose';
      startButton.textContent = 'Play Again';
      startButton.value = 'play_again';
      startMessage.className = 'title not_winning';
    }
    overlay.style.display = 'block';
  }

}
