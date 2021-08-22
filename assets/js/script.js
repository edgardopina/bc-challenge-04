//#region general variables
const QA_SET = [
	{
		question: "In JavaScript, what element is used to store multiple values in a single variable?",
		answers: ["Variables", "Strings", "Arrays", "Functions"],
		correctAnswer: 2,
	},
	{
		question: "What is considered to be the most popular programming language in the world?",
		answers: ["Ruby", "HTML", "Swift", "Javascript"],
		correctAnswer: 3,
	},
	{
		question: "In Javascript, what element is used to store and manipulate text, usually in multiples?",
		answers: ["Strings", "Arrays", "Recorders", "Variables"],
		correctAnswer: 0,
	},
	{
		question: "In JavaScript, what is a block of code called that is used to perform a specific task?",
		answers: ["String", "Variable", "Function", "Declaration"],
		correctAnswer: 2,
	},
	{
		question:
			"What is the element called that can continue to execute a block of code as long as the specified condition remains TRUE?",
		answers: ["Clone", "Loop", "Debugger", "Repeater"],
		correctAnswer: 1,
	},
	{
		question: "What is the format called that is used for storing and transporting data?",
		answers: ["Font", "HTML", "Syntax", "JSON"],
		correctAnswer: 3,
	},
	{
		question:
			"What is the element used – and hidden – in code that explains things and makes the content more readable?",
		answers: ["Notes", "Quotes", "Comments", "Annotations"],
		correctAnswer: 2,
	},
	{
		question:
			"What is the default behavior called that is used to move declarations to the top of the current scope?",
		answers: ["Arranging", "Hoisting", "Sorting", "Jumping"],
		correctAnswer: 1,
	},
];

const TIME_LIMIT = 10000;
const WRONG_PENALTY = 10;
const TIME_TICK = 1000;
const EXAM_QUESTIONS = QA_SET.length;
const ANSWER_BUTTONS = 4;
const BTN_ID_IDX_POS = 4;
const CORRECT_SOUND = "./assets/sfx/correctAnswer.mp3";
const CORRECT_MSG = "Correct!";
const WRONG_SOUND = "./assets/sfx/wrongAnswer.mp3";
const WRONG_MSG = "Wrong!";
const LCL_STG_KEY = "coding-quiz";

var questionCounter = 0;
var timeCounter = 0;
var intervalCtrl = 0;
var currentScorePair = { initials: "", score: 0 };
var highestScores = [];
var highScoreIndex = 0;
//#endregion general variables

//#region DOM variables
var startQuizBtn = document.querySelector("#start-quiz");
var answerChoiceBtn = document.querySelector("#answer-buttons");
var initialsBtn = document.querySelector("#initials-form");
var goBackBtn = document.querySelector("#go-back");
var clearScoresBtn = document.querySelector("#clear-scores");
var olHighestScoresList = document.querySelector("#highest-score-list");
var viewHsBtn = document.querySelector("#view-hs");

var mainDiv = document.querySelector("main");
var topBlockDiv = document.querySelector("#top-block");
var startQuizDiv = mainDiv.removeChild(document.querySelector("#start-page"));
var qAndADiv = mainDiv.removeChild(document.querySelector("#quiz-question"));
var allDoneDiv = mainDiv.removeChild(document.querySelector("#all-done"));
var highScoresDiv = mainDiv.removeChild(document.querySelector("#high-scores"));
//#endregion DOM variables

var processViewHs = function () {
	clearInterval(intervalCtrl);
	while (mainDiv.firstChild) {
		mainDiv.removeChild(mainDiv.firstChild);
	}
	mainDiv.appendChild(highScoresDiv);
	highestScores = [];
	storedScores = localStorage.getItem(LCL_STG_KEY);
	if (storedScores) {
		highestScores = JSON.parse(storedScores);
	}
	displayHighScores();
};

//#region clearScoresBtn event listener
var processClearScores = function () {
	cleanHsList();
	localStorage.setItem(LCL_STG_KEY, JSON.stringify(highestScores));
};
//#endregion clearScoresBtn event listener

//#region goBackBtn event listener
var cleanHsList = function () {
	while (olHighestScoresList.firstChild) {
		olHighestScoresList.removeChild(olHighestScoresList.firstChild);
	}
	highestScores.length = 0;
};

var processGoBack = function () {
	mainDiv.removeChild(highScoresDiv);
	mainDiv.appendChild(topBlockDiv);
	mainDiv.appendChild(startQuizDiv);
	timeCounter = 0;
	document.querySelector("#timer").innerHTML = "";
	cleanHsList();
};
//#endregion goBackBtn event listener

//#region initialsBtn event listener
var displayHighScores = function () {
	highestScores.sort((a, b) => (a.score > b.score ? -1 : 1));
	var highestScoresLength = highestScores.length;
	for (var i = 0; i < highestScoresLength; ++i) {
		var liElement = document.createElement("li");
		liElement.className = "hs-list";
		liElement.innerHTML = highestScores[i].initials + " - " + highestScores[i].score;
		olHighestScoresList.appendChild(liElement);
	}
};

var showHighScores = function () {
	mainDiv.removeChild(topBlockDiv);
	mainDiv.removeChild(allDoneDiv);
	mainDiv.appendChild(highScoresDiv);
	displayHighScores();
};

var processLocalStorage = function () {
	currentScorePair.initials = document.querySelector("#input-initials").value;
	currentScorePair.score = timeCounter;
	highestScores = [];
	storedScores = localStorage.getItem(LCL_STG_KEY);
	if (!storedScores) {
		highestScores.push(currentScorePair);
		window.alert("Congrats " + currentScorePair.initials + "! Your FIRST score is " + currentScorePair.score);
	} else {
		highestScores = JSON.parse(storedScores);
		var previousScore = 0;
		var initialsIndex = highestScores.findIndex((i) => i.initials === currentScorePair.initials);
		if (initialsIndex < 0) {
			highestScores.push(currentScorePair);
			window.alert("Congrats " + currentScorePair.initials + "! Your FIRST score is " + currentScorePair.score);
		} else {
			previousScore = highestScores[initialsIndex].score;
			if (currentScorePair.score > previousScore) {
				window.alert("PREVIOUS score: " + previousScore + ". NEW HIGHEST score: " + currentScorePair.score);
				highestScores[initialsIndex].score = currentScorePair.score;
			} else if (currentScorePair.score === previousScore) {
				window.alert("You got the same score than last time. Keep trying!");
			} else {
				window.alert("Previous score is better than today's score. Keep trying!");
			}
		}
	}
	localStorage.setItem(LCL_STG_KEY, JSON.stringify(highestScores));
};

var processAllDone = function (event) {
	event.preventDefault();
	if (!document.querySelector("#input-initials").value) {
		window.alert("Please enter your initials.");
		return false;
	}
	processLocalStorage();
	showHighScores();
};
//#endregion initialsBtn event listener

//#region answerChoiceBtn event listener
var showAllDoneDiv = function () {
	mainDiv.removeChild(qAndADiv);
	mainDiv.appendChild(allDoneDiv);
	document.querySelector("#input-initials").value = "";
	document.querySelector("#final-score").innerHTML = timeCounter;
	document.querySelector("#timer").innerHTML = timeCounter;
};

var checkCorrectness = function () {
	var choiceIndex = event.target.id.substring(BTN_ID_IDX_POS); // get choice index
	var resultQandA = document.querySelector("#right-wrong-qa");
	resultQandA.value = "";
	var resultAllDone = allDoneDiv.querySelector("#right-wrong-ad");
	resultAllDone.value = "";
	console.log(resultAllDone, resultQandA);
	var resultSound = document.querySelector("#result-audio");
	if (parseInt(choiceIndex) === QA_SET[questionCounter].correctAnswer) {
		resultQandA.innerHTML = CORRECT_MSG;
		resultAllDone.innerHTML = CORRECT_MSG;
		resultSound.src = CORRECT_SOUND;
		resultSound.play(); // see <link rel="shortcut icon" href="#"> in index.
	} else {
		resultQandA.innerHTML = WRONG_MSG;
		resultAllDone.innerHTML = WRONG_MSG;
		resultSound.src = WRONG_SOUND;
		timeCounter -= WRONG_PENALTY;
		resultSound.play(); // plays sound - use <link rel="shortcut icon" href="#"> in index.
		if (timeCounter <= 0) {
			timeCounter = 0;
			clearInterval(intervalCtrl);
			document.querySelector("#timer").innerHTML = timeCounter;
		}
	}
};

var processEachQuestion = function () {
	checkCorrectness();
	questionCounter++;
	if (questionCounter < EXAM_QUESTIONS && timeCounter > 0) {
		displayOneQuestion();
	} else {
		answerChoiceBtn.disabled = true;
		clearInterval(intervalCtrl);
		showAllDoneDiv();
	}
};
//#endregion answerChoiceBtn event listener

//#region startQuizBtn event listener
var displayOneQuestion = function () {
	qAndADiv.querySelector("#question").innerHTML = QA_SET[questionCounter].question;
	for (var i = 0; i < ANSWER_BUTTONS; ++i) {
		qAndADiv.querySelector("#btn-" + i).innerHTML = i + 1 + ". " + QA_SET[questionCounter].answers[i];
	}
};

var timeHandler = function () {
	if (timeCounter > 0) {
		timeCounter--;
	}
	/******************* */
	document.querySelector("#timer").innerHTML = timeCounter;
	if (timeCounter === 0) {
		clearInterval(intervalCtrl);
		showAllDoneDiv();
	}
};

var startControls = function () {
	timeCounter = TIME_LIMIT;
	questionCounter = 0;
	document.querySelector("#right-wrong-qa").value = "";
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
initialsBtn.addEventListener("submit", processAllDone);
goBackBtn.addEventListener("click", processGoBack);
clearScoresBtn.addEventListener("click", processClearScores);
viewHsBtn.addEventListener("click", processViewHs);
