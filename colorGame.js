var numSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#stripeButton");
var modeButtons = document.querySelectorAll(".mode");

init();

function init() {
	setModeButtons();
	setSquares();
	resetGame();
}

function setModeButtons() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");

			this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
			resetGame();
		});
	}
}

function setSquares() {
	for(var i = 0; i < squares.length; i++) {
		// add click listeners to squares
		squares[i].addEventListener("click", function() {
			// get color off square and compare to goal pickedColor
			var clickedColor = this.style.backgroundColor;
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct!";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
				resetButton.textContent = "Play Again?";
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again!";
			}
		});
	}
}

function changeColors(color) {
	// loop through squares and changes colors to 'color'
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function pickColor() {
	// loop through colors array and randomly pick one
	var randomNum = Math.floor(Math.random() * colors.length);
	return colors[randomNum];
}

function generateColors(numColors) {
	// create array and add numColors to it and return it
	var arr = [];
	for (var i = 0; i < numColors; i++) {
		arr.push(getRandomColor());
	}
	return arr;
}

function getRandomColor() {
	var randomColor = "rgb(";
	randomColor += (Math.floor(Math.random() * 256) + ", ");
	randomColor += (Math.floor(Math.random() * 256) + ", ");
	randomColor += (Math.floor(Math.random() * 256) + ")");
	return randomColor;
}

resetButton.addEventListener("click", function() {
	resetGame();
});

function resetGame() {
	// change text of button back to "New Colors"
	stripeButton.textContent = "New Colors";

	// change message text
	messageDisplay.textContent = "";

	// generate new colors
	colors = generateColors(numSquares);

	// get new pickedColor and display the new text
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;

	// change color of the squares
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
		
	}

	// change background of header
	h1.style.backgroundColor = "steelblue";
}