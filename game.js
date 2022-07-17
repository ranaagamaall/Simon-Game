//chosing a rondom color
var buttonColors =["red", "blue", "green", "yellow"];  //creating array of colors
var gamePattern = []; 
var userClickedPattern = [];                                   //creating an empty array for saving the game pattern
var gameOn = false;
var level = 0;


//wait for keypress to start the game

$(document).keydown(function(){
    if(!gameOn){
    $("#level-title").text("level " + level);
    nextSequence();
    gameOn = true;
    }
});

//save the user clicks
$(".btn").click( function(){
    if(gameOn){
        var userChosenColor = $(this).attr("id");
        userClickedPattern.push(userChosenColor);

        playSound(userChosenColor);
        animatePress(userChosenColor);

        //calling check answer and passing the index of the last button clicked
        checkAnswer(userClickedPattern.length-1);
    }
});

// checking the user clicks against the game pattern
function checkAnswer(currentLevel) {

    //checks every recent click against the equivalent one in game pattern
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      //terminating condition
      if (userClickedPattern.length === gamePattern.length){

        //call next sequence after a delay
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      playSound("wrong");
      $("body").addClass("game-over")
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      startOver();

    }

}


function nextSequence (){
    userClickedPattern = [];

    level ++;
    $("#level-title").text("level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber]   //choosing a random color from the array
    gamePattern.push(randomChosenColor);                   //pushing the chosen color into the pattern array

    //game operation
    $("#" +randomChosenColor).fadeOut(100).fadeIn(100);       //flashing the chosen color
}

function playSound(color){
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+ currentColor).addClass("pressed");
    
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}

function startOver(){
    gamePattern = []; 
    gameOn = false;
    level = 0;
    $("#level-title").text("Game Over, press any key to restart");
    $(document).keydown(function(){
        if(!gameOn){
        nextSequence();
        gameOn = true;
        }
    });
}