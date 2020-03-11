/* Treehouse FSJS Techdegree
 * Project 4 - OOP Game App
 * Phrase.js */

class Phrase {
  constructor(phrase) {
    this.phrase = phrase;
  }

  /**
   * Display phrase on game scoreboard
   */
  addPhraseToDisplay() {
    const divList = document.querySelector('#phrase ul');
    const phraseLetters = this.phrase.split('');
    for (let i = 0; i < phraseLetters.length; i++) {
      const letterBlock = document.createElement('li');
      if (phraseLetters[i] === ' ') {
        letterBlock.textContent = phraseLetters[i];
        letterBlock.className = 'space';
      } else {
        letterBlock.textContent = phraseLetters[i];
        letterBlock.className = `hide letter ${phraseLetters[i]}`;
      }
      divList.appendChild(letterBlock);
    }
  }

  /**
   * Checks if passed letter is in phrase
   * @param (string) letter - Letter to check
   */
  checkLetter(letter) {
    const activeLetter = document.querySelector(`li.hide.letter.${letter}`);
    if (activeLetter) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Displays passed letter on screen after a match is found
   * @param (string) letter - Letter to display
   */
  showMatchedLetter(letter) {
    const activeLetter = document.querySelectorAll(`li.hide.letter.${letter}`);
    if (this.checkLetter(letter)) {
      for (let i = 0; i < activeLetter.length; i++) {
        activeLetter[i].className = `show letter ${letter}`;
      }
    }
  }

}
