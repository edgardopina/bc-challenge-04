const QA_SET = [
	{
		question: "FIRST QUESTION What are the three foundational Web technologies?",
		answers: ["Web, CSS, Node", "HTML, CSS, JavaScript", "Node, JSON, CSS", "HTML, CSS, Java"],
		correctAnswer: "Web, CSS, Node",
	},
	{
		question: "SECOND QUESTION What are the three foundational Web technologies?",
		answers: ["Web, CSS, Node", "HTML, CSS, JavaScript", "Node, JSON, CSS", "HTML, CSS, Java"],
		correctAnswer: "HTML, CSS, JavaScript",
	},
	{
		question: "THIRD QUESTION What are the three foundational Web technologies?",
		answers: ["Web, CSS, Node", "HTML, CSS, JavaScript", "Node, JSON, CSS", "HTML, CSS, Java"],
		correctAnswer: "HTML, CSS, Java",
	},
];

const EXAM_NUMBER_OF_QUESTIONS = 3;
var questionCounter = 0;
var correctSound = "./assets/sfx/correctAnswer.mp3";
var wrongSound = "./assets/sfx/wrongAnswer.mp3";

var startQuizBtn = document.querySelector("#start-quiz");
var questionChoiceBtn = document.querySelector(".answer-buttons");
var mainDiv = document.querySelector("main");

var startQuizDiv = mainDiv.removeChild(document.querySelector("#start-page"));
var questionDiv = mainDiv.removeChild(document.querySelector("#quiz-question"));
var allIsDoneDiv = mainDiv.removeChild(document.querySelector("#all-done"));
var highScores = mainDiv.removeChild(document.querySelector("#high-scores"));

var showQuestionDiv = function () {
	mainDiv.removeChild(startQuizDiv);
	mainDiv.appendChild(questionDiv);
};

var processQuestionDiv = function () {
	showQuestionDiv();
	displayOneQuestion();
	return false;
};

var displayOneQuestion = function () {
	//
	console.log("questionCounter: ", questionCounter);

	questionDiv.querySelector("#question").innerHTML = QA_SET[questionCounter].question;
	for (var i = 0; i < 4; ++i) {
		questionDiv.querySelector("#btn-" + i).innerHTML = QA_SET[questionCounter].answers[i];
	}
};

var processEach = function () {
	if (questionCounter < EXAM_NUMBER_OF_QUESTIONS) {
		checkCorrectness();
		questionCounter++;
	} else {
		return false;
	}
	if (questionCounter < EXAM_NUMBER_OF_QUESTIONS) {
		displayOneQuestion();
	} else {
		return false;
	}

	// questionCounter++;
	// if (questionCounter < EXAM_NUMBER_OF_QUESTIONS) {
	// 	displayOneQuestion();
	// } else {
	// 	return false;
	// }
};

function checkCorrectness() {
	// debugger;
	var choice = event.target.innerHTML; // get the choice

	var result = document.querySelector("#right-wrong");
	var resultSound = document.querySelector("#result-audio");

	if (choice === QA_SET[questionCounter].correctAnswer) {
		result.textContent = "Correct!";
		resultSound.src = correctSound;
	} else {
		result.textContent = "Wrong!";
		resultSound.src = wrongSound;
	}

	console.log(result, resultSound);
	resultSound.play();
	return;
}

mainDiv.appendChild(startQuizDiv);

startQuizBtn.addEventListener("click", processQuestionDiv);
questionChoiceBtn.addEventListener("click", processEach);
