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

//Game variables
let idiom = '';
let questionId = 0;
let wrongGuessLimit = 6;
let wrongGuess = 0;
let guessed = [];
let idiomStatus = '';
let highScores = [];

//Timer variables;
let hour = 0;
let minute = 0;
let seconds = 0;
let totalSeconds = 0;
let intervalId = null;

function startTimer(interval) {
  intervalId = setInterval(timer, interval);
  function timer() {
    ++totalSeconds;
    hour = Math.floor(totalSeconds / 3600);
    minute = Math.floor((totalSeconds - hour * 3600) / 60);
    seconds = totalSeconds - (hour * 3600 + minute * 60);

    document.getElementById('hour').innerHTML = formatToTwoDigits(hour);
    document.getElementById('minute').innerHTML = formatToTwoDigits(minute);
    document.getElementById('seconds').innerHTML = formatToTwoDigits(seconds);
  }
}

function stopTimer() {
  clearInterval(intervalId);
}

function formatToTwoDigits(number) {
  return ('0' + number).slice(-2);
}

function loadHighscores() {
  highScores = JSON.parse(
    localStorage.getItem(questionId + '_highscores') || '[]'
  );
  showHighScores(highScores);
}

function showHighScores(scores) {
  document.getElementById('first').innerHTML = scores
    ? secToHHMM(scores[0])
    : '';
  document.getElementById('second').innerHTML = scores
    ? secToHHMM(scores[1])
    : '';
  document.getElementById('third').innerHTML = scores
    ? secToHHMM(scores[2])
    : '';
}

function secToHHMM(secs) {
  if (secs) {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - hours * 3600) / 60);
    let seconds = secs - hours * 3600 - minutes * 60;
    let H = hours <= 0 ? '' : hours === 1 ? hours + ' hour' : hours + ' hours';
    let M =
      minutes <= 0
        ? ''
        : minutes === 1
        ? minutes + ' minute'
        : minutes + ' minutes';
    let S =
      seconds <= 0
        ? ''
        : seconds === 1
        ? seconds + ' second'
        : seconds + ' seconds';

    return H + ' ' + M + ' ' + S;
  } else {
    return '';
  }
}

function generateQuestion() {
  const question = data[Math.floor(Math.random() * data.length)];
  idiom = question.idiom.toUpperCase();
  questionId = question.id;

  showHighScores(
    JSON.parse(localStorage.getItem(question.id + '_highscores') || '[]')
  );
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
  guessed.indexOf(letter) === -1 ? guessed.push(letter) : null;
  document.getElementById(letter).setAttribute('disabled', true);

  if (idiom.indexOf(letter) >= 0) {
    guessedPhrase();
    checkGameState();
  } else if (idiom.indexOf(letter) === -1) {
    wrongGuess++;
    updateWrongGuessState();
    checkGuessLimit();
  }
}

function checkGameState() {
  idiomStatus = idiomStatus.replace(/&nbsp;&nbsp;/g, ' ');
  idiomStatus = idiomStatus.trim();
  if (idiom === idiomStatus) {
    document.getElementById('game-alphabet').innerHTML =
      'Congratulations you solved this question in ' + secToHHMM(totalSeconds);
    computeHighscores();
    showHighScores(highScores);
    stopTimer();
  }
}

function computeHighscores() {
  let nHighScores = [];
  highScores = JSON.parse(
    localStorage.getItem(questionId + '_highscores') || '[]'
  );
  highScores.push(totalSeconds);
  highScores.sort();
  for (let i = 0; i < 3; i++) {
    nHighScores[i] = highScores[i];
  }
  highScores = nHighScores;
  localStorage.setItem(questionId + '_highscores', JSON.stringify(highScores));
}

function updateWrongGuessState() {
  document.getElementById('hanging').src =
    '../hangman/graphics/' + wrongGuess + '.png';
  document.getElementById('wrongGuess').innerHTML = wrongGuess;
}

function checkGuessLimit() {
  if (wrongGuess === wrongGuessLimit) {
    document.getElementById('question').innerHTML = 'Answer: ' + idiom;
    document.getElementById('game-alphabet').innerHTML = 'Game Over !!!';
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
      maskedWords.push(maskWord(word).concat('&nbsp;&nbsp;'));
    })
    .join('');
  idiomStatus = maskedWords.join('');
  document.getElementById('question').innerHTML = idiomStatus;
}

document.getElementById('wrongGuess').innerHTML = wrongGuess;
document.getElementById('wrongGuessLimit').innerHTML = wrongGuessLimit;

function reset() {
  location.reload();
}

loadHighscores();
generateQuestion();
loadButtons();
guessedPhrase();
startTimer(1000);
