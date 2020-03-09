const startButton = document.getElementById('btn__reset');
const qwerty = document.getElementById('qwerty');
const keys = document.getElementsByClassName('key');
const keyChart = {
  97 : 'a',  98 : 'b',  99 : 'c',
  100 : 'd',  101 : 'e',  102 : 'f',
  103 : 'g',  104 : 'h',  105 : 'i',
  106 : 'j',  107 : 'k',  108 : 'l',
  109 : 'm',  110 : 'n',  111 : 'o',
  112 : 'p',  113 : 'q',  114 : 'r',
  115 : 's',  116 : 't',  117 : 'u',
  118 : 'v',  119 : 'w',  120 : 'x',
  121 : 'y',  122 : 'z'
};

let currGame; // new game created when start button clicked
let currPhrase; // random phrase created during startGame()

// hides the overlay
function resetDisplay () {
  const overlay = document.getElementById('overlay');
  overlay.style.display = 'none';
}


//hides over lay, creates new game, starts game
startButton.addEventListener('click', function () {
  resetDisplay();
  currGame = new Game();
  gamePhrase = currGame.startGame();
});


//when a key is clicked, disables it, adds chosen class, and calls handleInteraction();
function markButton (key) {
  key.setAttribute('disabled','true');
  key.className = 'key chosen';
  currGame.handleInteraction(key,currPhrase);

}

//Listens for a click on the qwerty keyboard
//sets pressedKey to the key button with that letter.
// calls markButton() on it
qwerty.addEventListener('click', function (e) {
  if (e.target.className === 'key'){
    const pressedLetter = e.target.innerText;
    let pressedKey;
    for (let i = 0; i < keys.length; i++) {
      if (pressedLetter === keys[i].innerText) {
        pressedKey = keys[i];
      }
    }
    markButton(pressedKey);
}
});


//Listens for a keypress
//checks e.which against a chart of numbers for correct letter.
//sets pressedKey to the key button with that letter.
// calls markButton() on it.
document.addEventListener('keypress', function (e) {
  const pressedLetter = keyChart[e.which];
  let pressedKey;
  for (let i = 0; i < keys.length; i++) {
    if (pressedLetter === keys[i].innerText) {
      pressedKey = keys[i];
    }
  }
  markButton(pressedKey);
});
