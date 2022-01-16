let randomNumber = null;
let guessed = null;
let guessCount = 0;
let messageContainer = document.getElementById('game-outcome');
let message = document.getElementById('outcomeMessage');

generateRandomNumber = () => {
  randomNumber = 1 + Math.floor(Math.random() * 100);
};

handleGuess = () => {
  guessed = document.getElementById('number').value;
  if (!guessed) {
    alert('Invalid answer, try again');
    return;
  }
  guessCount++;
  computeResult();
};

computeResult = () => {
  console.log('Guess: ' + guessed);

  let range = Math.abs(randomNumber - guessed);
  if (randomNumber == guessed) {
    decorateDisplay('You guessed right! way to go!', 'green', 'white');
  } else if (range <= 10) {
    decorateDisplay(
      'Guess again, your guess is within -/+ 10' + noOfGuesses(),
      'red',
      'white'
    );
  } else if (range >= 30) {
    decorateDisplay(
      'Guess again, your guess is too high' + noOfGuesses(),
      'blue',
      'white'
    );
  } else {
    decorateDisplay(noOfGuesses() + ' Please guess again', 'white', 'black');
  }
};

decorateDisplay = (msg, bgColor, color) => {
  message.innerHTML = msg;
  messageContainer.style.backgroundColor = bgColor;
  messageContainer.style.color = color;
};

noOfGuesses = () => {
  return guessCount >= 3 ? "<br /> You've had " + guessCount + ' guesses' : '';
};

reset = () => {
  location.reload();
};

generateRandomNumber();
