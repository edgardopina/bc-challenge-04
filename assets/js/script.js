//#region general variables
const QA_SET = [
	{
		question: "FIRST QUESTION What are the three foundational Web technologies?",
		answers: ["Web, CSS, Node", "HTML, CSS, JavaScript", "Node, JSON, CSS", "HTML, CSS, Java"],
		correctAnswer: 1,
	},
	{
		question: "SECOND QUESTION What are the three foundational Web technologies?",
		answers: ["Web, CSS, Node", "HTML, CSS, JavaScript", "Node, JSON, CSS", "HTML, CSS, Java"],
		correctAnswer: 3,
	},
	{
		question: "THIRD QUESTION What are the three foundational Web technologies?",
		answers: ["Web, CSS, Node", "HTML, CSS, JavaScript", "Node, JSON, CSS", "HTML, CSS, Java"],
		correctAnswer: 2,
	},
	{
		question: "FOURTH QUESTION What are the three foundational Web technologies?",
		answers: ["Web, CSS, Node", "HTML, CSS, JavaScript", "Node, JSON, CSS", "HTML, CSS, Java"],
		correctAnswer: 0,
	},
];

const TIME_LIMIT = 20;
const WRONG_PENALTY = 10;
const TIME_TICK = 1000;
const PAUSE = 000;
const EXAM_QUESTIONS = QA_SET.length;
const BUTTONS = 4;
const BTN_ID_IDX_POS = 4;
const CORRECT_SOUND = "./assets/sfx/correctAnswer.mp3";
const CORRECT_MSG = "Correct!";
const WRONG_SOUND = "./assets/sfx/wrongAnswer.mp3";
const WRONG_MSG = "Wrong!";
const LCL_STG_KEY = "coding-quiz";

var questionCounter = 0;
var timeCounter = 0;
var intervalCtrl = 0;
var timeOutCtrl = 0;
var currentScorePair = { initials: "", value: 0 };
var highestScores = [];
var highScoreIndex = 0;
//#endregion variables

//#region DOM variables
var startQuizBtn = document.querySelector("#start-quiz");
var answerChoiceBtn = document.querySelector("#answer-buttons");
var initialsBtn = document.querySelector("#initials-btn");
var goBackBtn = document.querySelector("#go-back");
var clearScoresBtn = document.querySelector("#clear-scores");

var mainDiv = document.querySelector("main");
var topBlockDiv = document.querySelector("#top-block");
var startQuizDiv = mainDiv.removeChild(document.querySelector("#start-page"));
var qAndADiv = mainDiv.removeChild(document.querySelector("#quiz-question"));
var allDoneDiv = mainDiv.removeChild(document.querySelector("#all-done"));
var highScoresDiv = mainDiv.removeChild(document.querySelector("#high-scores"));
//#endregion DOM variables

//region goBackBtn event listener
var processGoBack = function () {
	timeCounter = 0;
	questionCounter = 0;
	mainDiv.removeChild(highScoresDiv);
	mainDiv.appendChild(topBlockDiv);
	document.querySelector("#timer").innerHTML = timeCounter;
	mainDiv.appendChild(startQuizDiv);
};
//endregion goBackBtn event listener

//#region initialsBtn event listener
var displayHighScores = function () {
	var a = 0;
};

var showHighScores = function () {
	mainDiv.removeChild(allDoneDiv);
	mainDiv.removeChild(topBlockDiv);
	mainDiv.appendChild(highScoresDiv);
	displayHighScores();
};

var processLocalStorage = function () {
	currentScorePair.initials = document.querySelector("#input-initials").value;
	currentScorePair.value = timeCounter;
	console.log(currentScorePair);
	storedScores = localStorage.getItem(LCL_STG_KEY);

	if (!storedScores) {
		highestScores.push(currentScorePair);
		localStorage.setItem(LCL_STG_KEY, JSON.stringify(highestScores));
		window.alert(
			"Congrats " + currentScorePair.initials + "! Your FIRST recorded score is " + currentScorePair.value
		);
	} else {
		storedScores = JSON.parse(storedScores);
		console.log(storedScores);

		var lastRecordedScore = storedScores.match((x) => x.initials);

		// if (timeCounter > currentInitialsLastScore)
		// {
		// 	localStorage.setItem(LCL_STG_KEY + initials, timeCounter);
		// 	window.alert("PREVIOUS score " + currentInitialsLastScore + ". NEW HIGHEST score " + timeCounter);
		// } else if (timeCounter === currentInitialsLastScore) {
		// 	window.alert("Your got the same score than last time. Keep trying!");
		// } else {
		// 	window.alert("Previous score is better than today's score. Keep trying!");
		// }
	}
};

var processAllDone = function () {
	processLocalStorage();
	showHighScores();
};
//#endregion initialsBtn event listener

//#region answerChoiceBtn event listener
var showAllDoneDiv = function () {
	mainDiv.removeChild(qAndADiv);
	mainDiv.appendChild(allDoneDiv);
	document.querySelector("#final-score").innerHTML = timeCounter;
};

var checkCorrectness = function () {
	var choiceIndex = event.target.id.substring(BTN_ID_IDX_POS); // get choice index
	var result = document.querySelector("#right-wrong");
	var resultSound = document.querySelector("#result-audio");
	if (parseInt(choiceIndex) === QA_SET[questionCounter].correctAnswer) {
		result.innerHTML = CORRECT_MSG;
		resultSound.src = CORRECT_SOUND;
		resultSound.play(); // see <link rel="shortcut icon" href="#"> in index.
	} else {
		result.innerHTML = WRONG_MSG;
		resultSound.src = WRONG_SOUND;
		timeCounter -= WRONG_PENALTY;
		resultSound.play(); // plays sound - use <link rel="shortcut icon" href="#"> in index.
		if (timeCounter <= 0) {
			timeCounter = 0;
			clearInterval(intervalCtrl);
			document.querySelector("#timer").innerHTML = timeCounter;
		}
	}
	// document.querySelector("#timer").innerHTML = timeCounter;
};

var processEachQuestion = function () {
	checkCorrectness();
	questionCounter++;
	if (questionCounter < EXAM_QUESTIONS && timeCounter > 0) {
		displayOneQuestion();
	} else {
		clearInterval(intervalCtrl);
		setTimeout(showAllDoneDiv, PAUSE);
	}
};
//#endregion answerChoiceBtn event listener

//#region startQuizBtn event listener
var displayOneQuestion = function () {
	qAndADiv.querySelector("#question").innerHTML = QA_SET[questionCounter].question;
	for (var i = 0; i < BUTTONS; ++i) {
		qAndADiv.querySelector("#btn-" + i).innerHTML = i + 1 + ". " + QA_SET[questionCounter].answers[i];
	}
};

var timeHandler = function () {
	if (timeCounter > 0) {
		timeCounter--;
	}
	document.querySelector("#timer").innerHTML = timeCounter;
	if (timeCounter === 0) {
		clearInterval(intervalCtrl);
		setTimeout(showAllDoneDiv, PAUSE);
	}
};

var startControls = function () {
	timeCounter = TIME_LIMIT;
	document.querySelector("#timer").innerHTML = timeCounter;
	intervalCtrl = setInterval(timeHandler, TIME_TICK);
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
//#endregion startQuizBtn event listener

mainDiv.appendChild(startQuizDiv);

startQuizBtn.addEventListener("click", processQAndADiv);
answerChoiceBtn.addEventListener("click", processEachQuestion);
initialsBtn.addEventListener("click", processAllDone);
goBackBtn.addEventListener("click", processGoBack);
