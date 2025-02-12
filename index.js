let buttonColours = ["red", "blue", "yellow", "green"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let gameOn = 0;

$("#btnStartGame").click(function(){
    while(gameOn === 0) {
        nextSequence();
        gameOn = 1;
    }
});    

$(".btn").click(function(){
    let userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    flashButton(userChosenColor);   
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);

});

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("that's right!");
    } else {
        console.log("not really correct!");
        gameOver();
        return 0;
    }

    if(userClickedPattern.length === gamePattern.length){
        userClickedPattern = [];
        setTimeout(function(){
            nextSequence();
        }, 1000);
        
    }
}

function gameOver(){
    let wrongAnswer = new Audio ("./sounds/wrong.mp3")
    wrongAnswer.play();

    $("body").addClass("game-over");

    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200)

    $("#level-title").text("Game Over~");

    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    gameOn = 0;
}

function nextSequence(){
    $("#level-title").text("Level " + level);
    level++;

    let randomNumber = Math.floor(Math.random()*4);
    let randomColor = buttonColours[randomNumber];

    gamePattern.push(randomColor);

    flashButton(randomColor);
    playSound(randomColor);

}

function flashButton(color){
    //Create a flash
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    }, 100);
}

function playSound(color){
    //Play sound
    let btnSound = new Audio("./sounds/" + color + ".mp3");
    btnSound.play();
}