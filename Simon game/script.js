const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
    playAudio(randomChosenColor);
    animatePress(randomChosenColor);
}

function playAudio(song){
    var audio = new Audio("sounds/" + song + ".mp3");
    audio.play();
}

$(document).keydown(function () {
    if (started) return;
    
    started = true;
    nextSequence();
});

$(".btn").click(function(){
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    $("#" + userChoosenColor).fadeOut(100).fadeIn(100);
    playAudio(userChoosenColor);
    animatePress(userChoosenColor);
     checkAnswer(userClickedPattern.length - 1);
})

function animatePress(currentColor){
      $("#" + currentColor).addClass("pressed");
      setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

function checkAnswer(currentIndex){
    if (userClickedPattern[currentIndex] === gamePattern[currentIndex]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playAudio("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
        $("#level-title").text("Game Over, Press Any Key to Restart");
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
