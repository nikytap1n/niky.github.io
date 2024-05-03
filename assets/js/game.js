const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
    {
        "question" : "What connects bones together?",
        "choice1" : "Joints",
        "choice2" : "idk man",
        "choice3" : "Cartilage",
        "choice4" : "Muscles",
        "answer" : 1

    },
    {
        "question" : "What are bones made of?",
        "choice1" : "Oxygen",
        "choice2" : "Collagen",
        "choice3" : "Calcium, and phosphorus",
        "choice4" : "calcium, phosphorus, and collagen",
        "answer" : 4

    },
    {
        "question" : "How many bones are in the adult human body?",
        "choice1" : "206 bones",
        "choice2" : "129 bones",
        "choice3" : "177 bones",
        "choice4" : "209 bones",
        "answer" : 1

    },
    {
        "question" : "What is the main purpose of the skeletal system?",
        "choice1" : "To make oxygen",
        "choice2" : "Storing water",
        "choice3" : "Filtering blood",
        "choice4" : "To support, protect the body, allow movement",
        "answer" : 4

    },
    {
        "question" : "What is the name of the soft tissue that covers the ends of bones at joints?",
        "choice1" : "Joints",
        "choice2" : "Cartilage",
        "choice3" : "Tendon",
        "choice4" : "Bone marrow",
        "answer" : 2
    }
    
];

//CONSTANTS
const INCORRECT_TAX = 10;
const MAX_QUESTIONS = 5;

// Start Game & Timer
startGame = () => {
  questionCounter = 0;
  score = 100;
  availableQuesions = [...questions];
  getNewQuestion();

  // Timer
  setInterval(function () {
    score--;
    scoreText.innerText = score;

    if (score === 0) {
      localStorage.setItem("mostRecentScore", score);

      //go to the end page
      return window.location.assign("../../assets/html/end.html");
    }
  }, 1000);
};

// Display Next Random Question and Answers
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    //go to the end page
    return window.location.assign("../html/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;

  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  // Get Answers
  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

//Get User's Choice
choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "incorrect") {
      decrementScore(INCORRECT_TAX);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

//Penalty for wrong choice
decrementScore = num => {
  score -= num;
  scoreText.innerText = score;
};


startGame();
