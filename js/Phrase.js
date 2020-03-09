class Phrase {
  constructor (phrase) {
    this.phrase = phrase;
  } //end constructor

/**
* adds placeholders to display for each letter of the phrase
*/

addPhraseToDisplay () {
  let phraseArray = this.phrase.split('');
  const phraseUl = document.getElementsByTagName('ul');


  for (var i = 0; i < phraseArray.length; i++){
    let li = document.createElement('li');
    if (phraseArray[i] !== ' ') {
      li.innerText = phraseArray[i];
      li.className = `hide letter ${phraseArray[i]}`;
      phraseUl[0].appendChild(li);
    } else {
      li.innerText = `${phraseArray[i]} `;
      li.className = `hide space`;
      phraseUl[0].appendChild(li);
    }
  }
}

/**
* checks to see if letter selected is in phrase
* returns boolian if it finds a letter in the phraseArray that matches the key pressed, it returns true; else false.
*/

checkLetter (key) {
  let phraseArray = this.phrase.split('');
  return phraseArray.find(letter => letter === key);

}

/**
* reveals letter(s) on board that match
* gets any element that has a class with the letter from the key event
* cycles through those li elements and changes the class from hide to show
*/

showMatchedLetter (key) {
  let letter = key.innerText;
  let li = document.getElementsByClassName(letter);
  for (let i = 0; i < li.length; i++) {
    li[i].className = `show letter ${letter}`;
  }
}

}//end class
