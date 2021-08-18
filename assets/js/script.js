const QA_SET = [
	{
		question: "What are the three foundational Web technologies?",
		answers: ["Web, CSS, Node", "HTML, CSS, JavaScript", "Node, JSON, CSS", "HTML, CSS, Java"],
		correct: 1,
	},
	{
		question: "SECOND QUESTION What are the three foundational Web technologies?",
		answers: ["Web, CSS, Node", "HTML, CSS, JavaScript", "Node, JSON, CSS", "HTML, CSS, Java"],
		correct: 3,
	},
];

var mainDiv = document.querySelector("main");
var startQuizDiv = mainDiv.removeChild(document.querySelector("#start-page"));
var questionDiv = mainDiv.removeChild(document.querySelector("#quiz-question"));
var allIsDoneDiv = mainDiv.removeChild(document.querySelector("#all-done"));
var highScores = mainDiv.removeChild(document.querySelector("#high-scores"));

var showQuestionDiv = function () {
	mainDiv.removeChild(startQuizDiv);
	mainDiv.appendChild(questionDiv);
	questionDiv.querySelector("#question").innerHTML = QA_SET[0].question;
	for (var i = 0; i < 4; ++i) {
		questionDiv.querySelector("#btn-" + i).innerHTML = QA_SET[0].answers[i];
	}
};

var presentQuiz = function () {
	var olEl = document.getElementById("question-group");
	console.log(olEl);
	for (var i = 0; i < 2; ++i) {
		var liTemp = document.createElement("li");
		// liTemp.innerHTML=
		// olEl.
	}
};

mainDiv.appendChild(startQuizDiv);
var startQuiz = document.querySelector("#start-quiz");
startQuiz.addEventListener("click", showQuestionDiv);
