const QA_SET = [
	{
		question: "FIRST QUESTION What are the three foundational Web technologies?",
		answers: ["Web, CSS, Node", "HTML, CSS, JavaScript", "Node, JSON, CSS", "HTML, CSS, Java"],
		correct: 1,
	},
	{
		question: "SECOND QUESTION What are the three foundational Web technologies?",
		answers: ["Web, CSS, Node", "HTML, CSS, JavaScript", "Node, JSON, CSS", "HTML, CSS, Java"],
		correct: 3,
	},
	{
		question: "THIRD QUESTION What are the three foundational Web technologies?",
		answers: ["Web, CSS, Node", "HTML, CSS, JavaScript", "Node, JSON, CSS", "HTML, CSS, Java"],
		correct: 3,
	},
];

const EXAM_NUMBER_OF_QUESTIONS = 3;
var questionCounter = 0;

var startQuizBtn = document.querySelector("#start-quiz");
var questionBtn = document.querySelector(".answer-buttons");
var mainDiv = document.querySelector("main");

var startQuizDiv = mainDiv.removeChild(document.querySelector("#start-page"));
var questionDiv = mainDiv.removeChild(document.querySelector("#quiz-question"));
var allIsDoneDiv = mainDiv.removeChild(document.querySelector("#all-done"));
var highScores = mainDiv.removeChild(document.querySelector("#high-scores"));

var presentOneQuestion = function () {
	console.log("questionCounter: ", questionCounter);
	questionDiv.querySelector("#question").innerHTML = QA_SET[questionCounter].question;
	for (var i = 0; i < 4; ++i) {
		questionDiv.querySelector("#btn-" + i).innerHTML = QA_SET[questionCounter].answers[i];
	}
};
var showQuestionDiv = function () {
	mainDiv.removeChild(startQuizDiv);
	mainDiv.appendChild(questionDiv);
};

var processQuestionDiv = function () {
	// showQuestionDiv();
	mainDiv.removeChild(startQuizDiv);
	mainDiv.appendChild(questionDiv);
	presentOneQuestion();
	return false;
};

var processEach = function () {
	questionCounter++;
	if (questionCounter < EXAM_NUMBER_OF_QUESTIONS) {
		presentOneQuestion();
	} else {
		return false;
	}
};

mainDiv.appendChild(startQuizDiv);

startQuizBtn.addEventListener("click", processQuestionDiv);
questionBtn.addEventListener("click", processEach);
