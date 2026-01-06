const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 1;

function nextSequence(){
    level++;
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
    $("#level-title").text("Level " + level);
    nextSequence();
});

$(".btn").click(function(){
    var userChoosenColor = $(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    $("#" + userChoosenColor).fadeOut(100).fadeIn(100);
    playAudio(userChoosenColor);
    animatePress(userChoosenColor);
    checkAnswer(level - 1);
})

function animatePress(currentColor){
      $("#" + currentColor).addClass("pressed");
      setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log(userClickedPattern)[0];
        console.log("success");
    }
    else {
        console.log("wrong");
    }
}