var triviaQuestions = [{
	question: "In 2016, what was the average net-worth of families racially classified as 'white' in the US?",
	answerOptions: ["$24,800", "$74,500", "$171,000", "$234,400"],
	answer: 2
},{
	question: "In 2016, what was the average net-worth of families racially classified as 'black' in the US?",
	answerOptions: ["$17,600", "$45,800", "$95,000", "$150,400"],
	answer: 0
}
]

var theQuestion; 
var correctAnswer; 
var incorrectAnswer; 
var omitted; 
var seconds; 
var clock; 
var attempted; 
var playerAnswer;
var notification = {
	correct: "Righteous!",
	incorrect: "Wrong!",
	endTime: "#TimesUp!",
	finished: "Results."
}


$('#startButton').on('click', function(){
	$(this).hide();
	startGame();
});

$('#restartButton').on('click', function(){
	$(this).hide();
	startGame();
});

function startGame(){
    $("#finalNotice").empty();
    $("#right").empty();
    $("#wrong").empty();
    $("#ignorance").empty();
    theQuestion = 0;
    correctAnswer = 0;
    incorrectAnswer = 0;
    omitted = 0;
    question();
}

function question(){
    $("#notification").empty();
    $("#correction").empty();
    attempted === true;

    $("#displayQuestion").html((theQuestion + 1) + ") " + triviaQuestions.length );
    $(".question").html("<p>" + triviaQuestions[theQuestion].question + "<p>");
    for (var i = 0; i <4; i++){
        var multipleChoice = $("<div>");
        multipleChoice.text(triviaQuestions[theQuestion].answerOptions[i]);
        multipleChoice.attr({"data-index": i});
        multipleChoice.addClass("selectedChoice");
        $(".answerOptions").append(multipleChoice);
    }
}


 timer ();
    seconds = 20;
    $(".selectedChoice").on("click", function(){
        playerAnswer = $(this).data("index");
        clearInterval(clock)
        answerDisplay()
    });

function timer(){
    seconds = 15;
    $("#countDown").html("<h2>" + seconds + "</h2>")
    attempted = true;
    clock = setInterval (clockBuilder, 1 * 1000)
}

function clockBuilder (){
    seconds--;
    if (seconds === 0){
        clearInterval(clock);
        attempted = false;
        answer()
    }
}

function answer (){
$("#displayQuestion").empty();
$(".selectedChoice").empty();
$(".question").empty();

var theAnswer = triviaQuestions[theQuestion].answerOptions[triviaQuestions[theQuestion].answer];
var answerCheck = triviaQuestions[theQuestion].answer;

if ((playerAnswer === answerCheck) && (attempted === true)){
    correctAnswer++;
    $(notification).html(notification.correct);
}
else if ((playerAnswer != answerCheck) && (attempted === true)){
    incorrectAnswer++;
    $("#notification").html(notification.incorrect);
    $("#correction").html("Actually... " + theAnswer);
} else{
    omitted++;
    $('#notification').html(notification.endTime);
    $('#correction').html("Actually... " + theAnswer);
    attempted = true;
}

if(theQuestion == (triviaQuestions.length-1)){
    setTimeout(score, 5 * 1000)
} else{
    theQuestion++;
    setTimeout(question, 5 * 1000);
}	
}

function score(){
$("#displayTime").empty();
$("#message").empty();
$("#correction").empty();

$("#finalNotice").html(messages.finished);
$("#correction").html("Correct Answers: " + correctAnswer);
$('#wrong').html("Incorrect Answers: " + incorrectAnswer);
$('#ignorance').html("Skipped: " + omitted);
$('#restartButton').addClass("reset");
$('#restartButton').show();
$('#restartButton').html('Try?');

}
