// Variables accessed through the quiz's lifecycle.

// Used to hold the fetched JSON file's contents
let json = null;

// Player's current score
let currentScore = 0;

// Used for fetching questions with a given category
let currentCategory = "";

// If this is equal to total questions, the game ends
let currentQuestion = 0;

// Used to end the game and be the maximum value in score calculation
let totalQuestions = 0;

// Parsed questions from the JSON file
let questions;
// Triggered when all elements exist on first page load
document.addEventListener("DOMContentLoaded", function () {
	// Loads JSON file and parses it to be usable as a generic object
	json = JSON.parse(loadJson());
	// Sets listeners on each of the tile elements
	let tiles = document.getElementsByClassName("tile");
	// Main was used before, but not now. I left it in for if anybody wanted to edit.
	let main = document.getElementById("main");
	for (var i = 0; i < tiles.length; i++) {
		tiles[i].addEventListener(
			"click",
			function (e) {
				handleTileClick(e);
			},
			false
		);
	}

	let homeBtn = document.getElementById("homeBtn");
	let randomQuizBtn = document.getElementById("randomQuizBtn");
	// When clicked, go home
	homeBtn.addEventListener("click", () => {
		window.location.href = "index.html";
	});

	// Selects a random quiz and starts it
	randomQuizBtn.addEventListener("click", () => {
		let e = { nonEvent: true };
		e.target = document.getElementsByClassName("tile-any")[0];
		handleTileClick(e);
	});
});

// When a tile is clicked, we get the id from the event (e)
// Using this, we then create a new layout for the quiz
// Depending on which tile was clicked, we get a different category of questions.
// Param : e (Event)
function handleTileClick(e) {
	// Stop the default of following a link
	if (e.nonEvent === true) {
	} else {
		e.preventDefault();
	}

	main.innerHTML = "";
	var div = document.createElement("div");
	main.appendChild(div);
	div.id = "question";

	//qn is short for 'question number'
	var qnDiv = document.createElement("div");
	div.appendChild(qnDiv);
	qnDiv.id = "questionNumber";

	//qt is short for 'question text'
	var qtDiv = document.createElement("div");
	div.appendChild(qtDiv);
	qtDiv.id = "questionText";

	qnDiv.innerHTML = "1";

	// Huge ugly if/else block to start the game
	// Gets the target classList, which is needed for getting category questions
	// You could edit this to split the class by "-" and get the category easier,
	// but in theme of this I thought verbosity would be useful
	if (e.target.classList.contains("tile-any")) {
		questions = anyQuestions(json.questions);
		qtDiv.innerHTML = questions[currentQuestion].question;
	} else if (e.target.classList.contains("tile-geography")) {
		questions = categoryQuestions("geography", json.questions);
		qtDiv.innerHTML = questions[currentQuestion].question;
	} else if (e.target.classList.contains("tile-music")) {
		questions = categoryQuestions("music", json.questions);
		qtDiv.innerHTML = questions[currentQuestion].question;
	} else if (e.target.classList.contains("tile-literature")) {
		questions = categoryQuestions("literature", json.questions);
		qtDiv.innerHTML = questions[currentQuestion].question;
	} else if (e.target.classList.contains("tile-science")) {
		questions = categoryQuestions("science", json.questions);
		qtDiv.innerHTML = questions[currentQuestion].question;
	} else if (e.target.classList.contains("tile-cultures")) {
		questions = categoryQuestions("cultures", json.questions);
		qtDiv.innerHTML = questions[currentQuestion].question;
	} else if (e.target.classList.contains("tile-animals")) {
		questions = categoryQuestions("animals", json.questions);
		qtDiv.innerHTML = questions[currentQuestion].question;
	} else if (e.target.classList.contains("tile-paisley")) {
		questions = categoryQuestions("paisley", json.questions);
		qtDiv.innerHTML = questions[currentQuestion].question;
	} else if (e.target.classList.contains("tile-friends")) {
		questions = categoryQuestions("friends", json.questions);
		qtDiv.innerHTML = questions[currentQuestion].question;
	} else if (e.target.classList.contains("tile-food")) {
		questions = categoryQuestions("food", json.questions);
		qtDiv.innerHTML = questions[currentQuestion].question;
	} else if (e.target.classList.contains("tile-greek-mythology")) {
		questions = categoryQuestions("greek-mythology", json.questions);
		qtDiv.innerHTML = questions[currentQuestion].question;
	} else if (e.target.classList.contains("tile-disney")) {
		questions = categoryQuestions("disney", json.questions);
		qtDiv.innerHTML = questions[currentQuestion].question;
	} else if (e.target.classList.contains("tile-sports")) {
		questions = categoryQuestions("sports", json.questions);
		qtDiv.innerHTML = questions[currentQuestion].question;
	} else {
		questions = categoryQuestions("history", json.questions);
		qtDiv.innerHTML = questions[currentQuestion].question;
	}

	main.style.height = "80%";

	// Create and add the  answer div
	var answerContainer = document.createElement("div");
	main.appendChild(answerContainer);
	answerContainer.id = "answerContainer";
	addAnswerButtons(questions[currentQuestion].answers);
	let answerButtons = document.getElementsByClassName("answerButton");
	totalQuestions = questions.length;
	var scoreContainer = document.createElement("div");
	main.appendChild(scoreContainer);
	scoreContainer.id = "scoreContainer";
	scoreContainer.innerHTML =
		"Score: <span id='score'>" +
		currentScore +
		"</span>/<span>" +
		totalQuestions +
		"</span>";
}
async function nextQuestion() {
	let questionNumberDiv = document.getElementById("questionNumber");
	questionNumberDiv.innerHTML = currentQuestion + 1;

	let questionDiv = document.getElementById("questionText");
	questionDiv.innerHTML = questions[currentQuestion].question;
	await removeAnswerButtons();
	addAnswerButtons(questions[currentQuestion].answers);
}
// Removes the answer buttons between questions.
// No real need for this, could just change the text
// or get them by class name and iterate
// but I thought verbosity in this context might be useful
async function removeAnswerButtons() {
	let buttonOne = document.getElementById("0");
	let buttonTwo = document.getElementById("1");
	let buttonThree = document.getElementById("2");
	let buttonFour = document.getElementById("3");

	buttonOne.remove();
	buttonTwo.remove();
	buttonThree.remove();
	buttonFour.remove();
}

// Uses request to get JSON file.
// Could be altered to get multiple files, or take a file as an argument
function loadJson() {
	var result = null;
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "data.json", false);
	xmlhttp.send();
	if (xmlhttp.status == 200) {
		result = xmlhttp.responseText;
	}
	return result;
}

// Iterates through the answers given in the argument and produces a list of
// 4 buttons on the screen.
// Also handles the click events of those buttons - next question or end game
// Can be edited to add more or less buttons, or go entirely by the array length
// In normal practice you'd probably do that, but again - verbosity
function addAnswerButtons(answers) {
	for (i = 0; i < 4; i++) {
		var answerButton = document.createElement("button");
		answerContainer.appendChild(answerButton);
		answerButton.classList += "answerButton";
		answerButton.innerText = answers[i].text;
		answerButton.id = i;
	}
	let answerButtons = document.getElementsByClassName("answerButton");
	for (i = 0; i < answerButtons.length; i++) {
		answerButtons[i].addEventListener("click", async function (e) {
			assessment = validateAnswer(
				questions[currentQuestion].answers[this.id].correct
			);
			console.log(assessment);
			if (assessment.answer === true) {
				currentScore++;
				this.classList += " correctBG";
				let score = document.getElementById("score");
				score.innerHTML = currentScore;
			} else {
				this.blur();
				this.classList += " incorrectBG";
				correctBtn = document.getElementById(assessment.correct);
				correctBtn.classList += " correctBG";
			}
			if (currentQuestion !== totalQuestions - 1) {
				currentQuestion++;
				await timer(1500);
				nextQuestion();
			} else {
				endScreen();
			}
		});
	}
}
// Produces a slide in end screen after the quiz is complete
// Also attaches two event handlers to button clicks on the end screen
// One button refreshes to allow another quiz to be chosen, and the other restarts
// the current quiz
function endScreen() {
	// This string contains the HTML for the end screen pop up
	// It could be modularized and created incrementally for better readability and
	// modularity
	string =
		"<div id='endOverlay'> <div class='endBox'><p>Quiz complete!</p> <p>You scored " +
		currentScore +
		"/" +
		totalQuestions +
		"!</p> <div><button id='newTopic'>New Topic</button><button id='restartQuiz'>Try Again</button></div> </div> ";
	document.body.innerHTML += string;
	let newTopic = document.getElementById("newTopic");
	newTopic.addEventListener(
		"click",
		() => {
			window.location.reload();
		},
		false
	);
	let restart = document.getElementById("restartQuiz");
	restart.addEventListener(
		"click",
		() => {
			currentScore = 0;
			currentQuestion = 0;
			removeOverlay();
			nextQuestion();
		},
		false
	);
}
function removeOverlay() {
	let endOverlay = document.getElementById("endOverlay");
	endOverlay.remove();
}

// Checks whether the given answer is right or not.
// Returns a simple object
// Returns additional correct answer if the user answered incorrectly.
function validateAnswer(answer) {
	if (answer === true) {
		return { answer: true };
	} else {
		for (i = 0; i < questions[currentQuestion].answers.length; i++) {
			if (questions[currentQuestion].answers[i].correct === true) {
				return { answer: false, correct: i };
			}
		}
	}
}

// Gets questions from the chosen category (text) and the given JSON file
function categoryQuestions(category, json) {
	let questions = [];
	for (i = 0; i < json.length; i++) {
		if (json[i].category === category) {
			questions.push(json[i]);
		}
	}

  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  
	// Get sub-array of first 5 elements after shuffled
	let selected = questions.slice(0, 5);
  
  // alert(JSON.stringify(selected));

	return selected;
}

// Gets random questions from the given JSON file
function anyQuestions(json) {
	let questions = [];
	for (i = 0; i < json.length; i++) {
		questions.push(json[i]);
	}
  
  // Shuffle the array
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  
	// Get sub-array of first 10 elements after shuffled
	let selected = questions.slice(0, 10);
  
  // alert(JSON.stringify(selected));

	return selected;
}

// A timer used in async functions.
// "await timer(100)" will wait for 100ms
const timer = (ms) => new Promise((r) => setTimeout(r, ms));
