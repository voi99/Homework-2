(function () {
  const $ = (e) => document.querySelector(e);
  const $$ = (e) => document.querySelectorAll(e);

  let startBtn = $('.start-quiz');
  let startScreen = $('.start-screen');
  let nameInput = $('#name');
  let errorMessage = $('.error');
  let playerName;
  let randomOrderQuestions;
  let currentQuestion;
  let questionSection = $('.question');
  let questionText = $('.question__text');
  let answersSection = $('.question_answers');
  let confirmBtn = $('.confirm-btn');
  let nextBtn = $('.next-btn');
  let infoSection = $('.info');
  let playerDetails = $('.player-details');
  let newGame = $('.new-game');

  startBtn.addEventListener('click', handleStartQuiz);
  confirmBtn.addEventListener('click', handleConfirm);
  nextBtn.addEventListener('click', nextQuestion);
  newGame.addEventListener('click', handleNewGame);

  function handleStartQuiz(e) {
    if (nameInput.value.match(/^[a-zA-Z]+$/)) {
      playerName = nameInput.value;
      startScreen.classList.add('animate__animated', 'animate__fadeOut');
      setTimeout(() => {
        startScreen.style.display = 'none';
        randomOrderQuestions = questions.sort(() => 0.5 - Math.random());
        currentQuestion = 0;
        questionSection.style.display = 'block';
        show();
        updateScore(true);
        nextQuestion();
      }, 1000);
    } else {
      errorMessage.style.display = 'block';
      errorMessage.innerHTML = 'Please enter valid name!';
    }
  }

  function updateScore(bool) {
    if (bool) {
      playerDetails.classList.remove('end-game');
      playerDetails.textContent = `${playerName}[${currentQuestion}/${questions.length}]`;
    } else {
      const sadEmoji = document.createElement('i');
      sadEmoji.classList.add('fas', 'fa-sad-tear', 'fa-2x');
      playerDetails.classList.add('end-game');
      playerDetails.innerHTML = `You Lost ${playerName} <br/> Score[${currentQuestion}/${questions.length}]<br/>`;
      playerDetails.appendChild(sadEmoji);
      newGame.style.display = 'block';
    }
  }

  function deletePreviousAnswers() {
    try {
      const answers = $$('.answer');
      Array.from(answers).forEach((answer) => answer.remove());
    } catch {}
  }

  function nextQuestion() {
    deletePreviousAnswers();
    showQuestion(randomOrderQuestions[currentQuestion]);
    updateUI();
  }

  function updateUI() {
    confirmBtn.style.display = 'block';
    infoSection.classList.remove(infoSection.classList[1]);
    infoSection.style.display = 'none';
    nextBtn.style.display = 'none';
  }

  function showQuestion(q) {
    questionText.innerHTML = q.question;
    q.offeredAnswers.forEach((answer) => {
      let button = document.createElement('button');
      button.innerHTML = answer.answerText;
      button.classList.add('answer');
      if (answer.isTrue) {
        button.dataset.isTrue = answer.isTrue;
      }
      button.addEventListener('click', selectAnswer);
      answersSection.appendChild(button);
    });
  }

  function selectAnswer(e) {
    if (e.target.classList.contains('selected')) {
      e.target.classList.remove('selected');
    } else {
      e.target.classList.add('selected');
    }
  }

  function handleConfirm() {
    const answers = $$('[data-is-true]');
    const playerAnswers = $$('.selected');
    if (
      answers.length === playerAnswers.length &&
      Array.from(answers).every((answer) =>
        Array.from(playerAnswers).includes(answer)
      )
    ) {
      showAfterConfirm(true);
    } else {
      showAfterConfirm(false);
    }
  }

  function showAfterConfirm(bool) {
    confirmBtn.style.display = 'none';
    infoSection.style.display = 'block';
    infoSection.innerHTML = questions[currentQuestion].explanation;
    const buttons = $$('.answer');
    Array.from(buttons).forEach((a) => {
      a.removeEventListener('click', selectAnswer);
      a.style.pointerEvents = 'none';
    });
    if (bool) {
      infoSection.classList.add('correctAnswer');
      currentQuestion++;
      if (currentQuestion >= questions.length) {
        handleWin();
        return;
      }
      nextBtn.style.display = 'block';
      updateScore(true);
    } else {
      infoSection.classList.add('wrongAnswer');
      updateScore(false);
    }
  }

  function handleNewGame() {
    try {
      $('#win').remove();
    } catch {}
    newGame.style.display = 'none';
    handleStartQuiz();
  }

  function show() {
    questionText.style.display = 'block';
    answersSection.style.display = 'flex';
    playerDetails.style.display = 'block';
  }

  function handleWin() {
    questionText.style.display = 'none';
    answersSection.style.display = 'none';
    infoSection.style.display = 'none';
    playerDetails.style.display = 'none';
    const div = document.createElement('div');
    div.id = 'win';
    const i = document.createElement('i');
    i.classList.add('fas', 'fa-smile-beam', 'fa-2x');
    i.style.padding = '0.4rem';
    const p = document.createElement('p');
    p.textContent = `Congratulations ${playerName}. You Won!`;
    div.appendChild(p);
    div.appendChild(i);
    questionSection.appendChild(div);
    newGame.style.display = 'block';
  }

  const questions = [
    {
      question: 'How many computer languages are in use?',
      offeredAnswers: [
        { answerText: '2000', isTrue: true },
        { answerText: '5000', isTrue: false },
        { answerText: '50', isTrue: false },
        { answerText: '20', isTrue: false },
      ],
      explanation:
        'There are about 2,000 computer languages in active use, whereas there were only 15 in use in 1970.',
    },
    {
      question: 'Which of these is not an early computer?',
      offeredAnswers: [
        { answerText: 'ENIAC', isTrue: false },
        { answerText: 'UNIVAC', isTrue: false },
        { answerText: 'NASA', isTrue: true },
        { answerText: 'SAGE', isTrue: false },
      ],
      explanation:
        'NASA stands for the National Aeronautics and Space Administration. It is an agency of the U.S. government.',
    },
    {
      question: 'Who founded Apple Computer?',
      offeredAnswers: [
        { answerText: 'Stephen Fry', isTrue: false },
        { answerText: 'Bill Gates', isTrue: false },
        { answerText: 'Steve Jobs', isTrue: true },
        { answerText: 'Stephen Hawking', isTrue: false },
      ],
      explanation:
        'Steve Jobs founded Apple Computer with Steve Wozniak and another partner in 1976. Jobs became the chairman and CEO of Apple in 1996.',
    },
    {
      question: 'Which of these is not a peripheral, in computer terms?',
      offeredAnswers: [
        { answerText: 'Keyboard', isTrue: false },
        { answerText: 'Monitor', isTrue: false },
        { answerText: 'Mouse', isTrue: false },
        { answerText: 'Motherboard', isTrue: true },
      ],
      explanation:
        'A peripheral is a device that attaches to a computer. The motherboard is within the computer and controls its ability to receive and process electronic signals.',
    },

    {
      question:
        'Which of the following is not one of the early “protocols,” or ways to use the Internet?',
      offeredAnswers: [
        { answerText: 'Blogging', isTrue: true },
        { answerText: 'Telnet', isTrue: false },
        { answerText: 'Gopher', isTrue: false },
        { answerText: 'FTP', isTrue: false },
      ],
      explanation:
        'The early use of the Internet relied on protocols for transferring files or remote control of other terminals. Blogging did not emerge until later, in the 1990s.',
    },

    {
      question: 'What does the Internet prefix WWW stand for?',
      offeredAnswers: [
        { answerText: 'Wide Width Wickets', isTrue: false },
        { answerText: 'World Wide Web', isTrue: true },
        { answerText: 'Worldwide Weather', isTrue: false },
        { answerText: 'Western Washington World', isTrue: false },
      ],
      explanation:
        'The World Wide Web dramatically increased the use of the Internet. Tim Berners-Lee established the convention in 1989.',
    },

    {
      question: 'Which of these is a file format for digital images?',
      offeredAnswers: [
        { answerText: 'CIA', isTrue: false },
        { answerText: 'JPG', isTrue: true },
        { answerText: 'ICBM', isTrue: false },
        { answerText: 'IBM', isTrue: false },
      ],
      explanation:
        'With JPEG, a digital image can be compressed to 5 percent of its original size, making it easy to transfer electronically and store.',
    },
    {
      question: 'Which of these devices are input devices?',
      offeredAnswers: [
        { answerText: 'Computer monitor', isTrue: false },
        { answerText: 'Keyboard', isTrue: true },
        { answerText: 'Printer', isTrue: false },
        { answerText: 'Mouse', isTrue: true },
      ],
      explanation:
        'The keyboard is the most frequent and widely used input device for entering data into a computer.The computer is dependent on you to move the mouse; it won’t move by itself. As a result, it’s an input device.',
    },
    {
      question: 'Which of these operating systems are Linux distros?',
      offeredAnswers: [
        { answerText: 'Pop OS', isTrue: true },
        { answerText: 'Ubuntu', isTrue: true },
        { answerText: 'macOS Monterey', isTrue: false },
        { answerText: 'Zorin OS', isTrue: true },
      ],
      explanation:
        'Pop OS, Ubuntu and Zorin OS are one of the most popular Linux distros.',
    },

    {
      question: 'Which of these devices are Samsung smartphones?',
      offeredAnswers: [
        { answerText: 'P40 Pro', isTrue: false },
        { answerText: 'Z Fold3', isTrue: true },
        { answerText: '11 Pro Max', isTrue: false },
        { answerText: 'S21 Ultra', isTrue: true },
      ],
      explanation:
        'Galaxy Note20 Ultra and Galaxy Z Fold3 are the most popular Samsung smartphones for 2021.',
    },

    {
      question:
        'To which of these devices is the cellular telephone most closely related?',
      offeredAnswers: [
        { answerText: 'Telegraph', isTrue: false },
        { answerText: 'Radio', isTrue: true },
        { answerText: 'Light bulb', isTrue: false },
        { answerText: 'Telescope', isTrue: false },
      ],
      explanation:
        'The cellular telephone carries voice, text, and other digital signals via radio waves, like a two-way police radio.',
    },
  ];
})();
