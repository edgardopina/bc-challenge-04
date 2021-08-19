//#region variables
const QA_SET = [
	{
		question: "FIRST QUESTION What are the three foundational Web technologies?",
		answers: ["Web, CSS, Node", "HTML, CSS, JavaScript", "Node, JSON, CSS", "HTML, CSS, Java"],
		correctAnswer: 2,
	},
	{
		question: "SECOND QUESTION What are the three foundational Web technologies?",
		answers: ["Web, CSS, Node", "HTML, CSS, JavaScript", "Node, JSON, CSS", "HTML, CSS, Java"],
		correctAnswer: 1,
	},
	{
		question: "THIRD QUESTION What are the three foundational Web technologies?",
		answers: ["Web, CSS, Node", "HTML, CSS, JavaScript", "Node, JSON, CSS", "HTML, CSS, Java"],
		correctAnswer: 3,
	},
];

const TIME_LIMIT = 15;
const WRONG_PENALTY = 5;
const TIME_OUT = 1000;
const EXAM_QUESTIONS = 3;
const BUTTONS = 4;
const BTN_ID_IDX_POS = 4;
const CORRECT_SOUND = "./assets/sfx/correctAnswer.mp3";
const CORRECT_MSG = "Correct!";
const WRONG_SOUND = "./assets/sfx/wrongAnswer.mp3";
const WRONG_MSG = ""

var questionCounter = 0;
var timeCounter = 0;
var currentScore = 0;
var intervalCtrl = 0;

var startQuizBtn = document.querySelector("#start-quiz");
var answerChoiceBtn = document.querySelector(".answer-buttons");
var allDoneBtn = document.querySelector("#initials-btn");

var mainDiv = document.querySelector("main");
var startQuizDiv = mainDiv.removeChild(document.querySelector("#start-page"));
var qAndADiv = mainDiv.removeChild(document.querySelector("#quiz-question"));
var allDoneDiv = mainDiv.removeChild(document.querySelector("#all-done"));
var highScores = mainDiv.removeChild(document.querySelector("#high-scores"));

//#endregion variables

var checkRemainingTime = function () {
	if (timeCounter < 0) {
		timeCounter = 0;
		document.querySelector("#timer").innerHTML = timeCounter;
		showallDoneDiv();
	}
	document.querySelector("#timer").innerHTML = timeCounter;
};

var showallDoneDiv = function () {
	clearInterval(intervalCtrl);
	if (document.querySelector("#quiz-question")) {
		mainDiv.removeChild(qAndADiv);
	}
	mainDiv.appendChild(allDoneDiv);
	document.querySelector("#final-score").innerHTML = timeCounter;
};

var timeHandler = function () {
	timeCounter--;
	document.querySelector("#timer").innerHTML = timeCounter;
	if (timeCounter === 0) {
		showallDoneDiv();
	}
};

var checkCorrectness = function () {
	var choiceIndex = event.target.id.substring(BTN_ID_IDX_POS); // get choice index
	var result = document.querySelector("#right-wrong");
	var resultSound = document.querySelector("#result-audio");
	if (parseInt(choiceIndex) === QA_SET[questionCounter].correctAnswer) {
		result.textContent = CORRECT_MSG;
		resultSound.src = CORRECT_SOUND;
	} else {
		result.textContent = WRONG_MSG;
		resultSound.src = WRONG_SOUND;
		timeCounter -= WRONG_PENALTY;
		checkRemainingTime();
	}
	resultSound.play(); // plays sound - use <link rel="shortcut icon" href="#"> in index.html
};

var processEachQuestion = function () {
	if (questionCounter < EXAM_QUESTIONS) {
		checkCorrectness();
	}
	questionCounter++;
	if (questionCounter < EXAM_QUESTIONS) {
		displayOneQuestion();
	} else {
		showallDoneDiv();
	}
};

var displayOneQuestion = function () {
	qAndADiv.querySelector("#question").innerHTML = QA_SET[questionCounter].question;
	for (var i = 0; i < BUTTONS; ++i) {
		qAndADiv.querySelector("#btn-" + i).innerHTML = i + 1 + ". " + QA_SET[questionCounter].answers[i];
	}
};

var startControls = function () {
	timeCounter = TIME_LIMIT;
	document.querySelector("#timer").innerHTML = timeCounter;
	intervalCtrl = setInterval(timeHandler, TIME_OUT);
};

var showqAndADiv = function () {
	mainDiv.removeChild(startQuizDiv);
	mainDiv.appendChild(qAndADiv);
};

var processQAndADiv = function () {
	showqAndADiv();
	startControls();
	displayOneQuestion();
};

mainDiv.appendChild(startQuizDiv);

startQuizBtn.addEventListener("click", processQAndADiv);
answerChoiceBtn.addEventListener("click", processEachQuestion);
