// Cute welcome text
alert("Welcome to the Simon Game! Get ready to test your memory skills. Repeat the sequence of colors to win!");

// Colors list with indexing 
let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameStarted = false;

// Function to generate the next sequence
function nextSequence() {
    level++;
    $("#level-title").html("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);

    animate(randomChosenColour);
}

// Visual animation and sound
function animate(name) {
    $("#" + name).fadeIn(100).fadeOut(100).fadeIn(100);
    var audioPath = "sounds/" + name + ".mp3";
    var audio = new Audio(audioPath);
    audio.play();

    $("#" + name).addClass("pressed");
    setTimeout(function() {
        $("#" + name).removeClass("pressed");
    }, 100);
}

// Detect user button clicks to get user pattern
$(".btn").on("click", function() {
    if (gameStarted) {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        animate(userChosenColour);
        
        // Check if user pattern matches game pattern
        checkAnswer(userClickedPattern.length - 1);
    }
});

// Start game with any keyboard click it detects first keyboard click
$(document).one("keydown", function() {
    gameStarted = true;
    nextSequence();
});

// Check user's answer against game pattern
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }
    } else {
        gameOver();
    }
}

// Game over function
function gameOver() {
    var wrongAudio= new Audio("sounds/wrong.mp3");
    wrongAudio.play();
    $("#level-title").html("Game over! Your score: " + (level - 1));    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gameStarted = false;
    $("#level-title").html("Press any key to restart");
}

// Update game flow after each user input
function updateGameFlow() {
    $(".btn").off("click"); // Disable button clicks during game play
    setTimeout(function() {
        $(".btn").on("click");
    }, (level + 1) * 1000); // Re-enable button clicks after sequence finishes
}

$(document).ready(function() {
    $("#level-title").html("Press any key to start"); // Initial message
});
