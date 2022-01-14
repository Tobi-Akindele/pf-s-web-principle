const data = [
  {
    id: 1,
    hint: 'To further a loss with mockery or indignity; to worsen an unfavorable situation.',
    idiom: 'Add insult to injury',
  },
  {
    id: 2,
    hint: 'Without any hesitation; instantly.',
    idiom: 'At the drop of a hat',
  },
  {
    id: 3,
    hint: 'It is up to you to make the next decision or step',
    idiom: 'Ball is in your court',
  },
  {
    id: 4,
    hint: 'Avoiding the main topic. Not speaking directly about the issue.',
    idiom: 'Beat around the bush',
  },
  {
    id: 5,
    hint: 'To take on a task that is way to big.',
    idiom: 'Bite off more than you can chew',
  },
  {
    id: 6,
    hint: "Something good that isn't recognized at first.",
    idiom: 'Blessing in disguise',
  },
  {
    id: 7,
    hint: 'To work late into the night, alluding to the time before electric lighting.',
    idiom: 'Burn the midnight oil',
  },
  {
    id: 8,
    hint: 'When something is done badly to save money.',
    idiom: 'Cut corners',
  },
  {
    id: 9,
    hint: 'When you are extremely desperate you need to take drastic actions.',
    idiom: 'Drastic times call for drastic measures',
  },
  {
    id: 10,
    hint: "The show has come to an end. It's all over.",
    idiom: 'Elvis has left the building',
  },
];

let idiom = '';
let wrongGuessLimit = 6;
let wrongGuess = 0;
let guessed = [];
let idiomStatus = '';

function generateQuestion() {
  const question = data[Math.floor(Math.random() * data.length)];
  idiom = question.idiom.toUpperCase();

  document.getElementById('hint').innerHTML = question.hint;
}

function loadButtons() {
  let buttons = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    .split('')
    .map(
      (letter) =>
        `
      <button class="hangman-keypad" id='` +
        letter +
        `'
              onClick="handleGuess('` +
        letter +
        `')">
          ` +
        letter +
        `
      </button>
 `
    )
    .join('');

  document.getElementById('game-alphabet').innerHTML = buttons;
}

function handleGuess(letter) {
  console.log(letter);
  guessed.indexOf(letter) === -1 ? guessed.push(letter) : null;
  document.getElementById(letter).setAttribute('disabled', true);

  if (idiom.indexOf(letter) >= 0) {
    guessedPhrase();
  }
}

function maskWord(word) {
  return word
    .split('')
    .map((letter) => (guessed.indexOf(letter) >= 0 ? letter : ' _ '))
    .join('');
}

function guessedPhrase() {
  let maskedWords = [];
  idiom
    .split(' ')
    .map((word) => {
      maskedWords.push(
        maskWord(word).concat(
          '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'
        )
      );
    })
    .join('');
  idiomStatus = maskedWords.join('');
  document.getElementById('question').innerHTML = idiomStatus;
}

document.getElementById('wrongGuess').innerHTML = wrongGuess;
document.getElementById('wrongGuessLimit').innerHTML = wrongGuessLimit;

generateQuestion();
loadButtons();
guessedPhrase();
