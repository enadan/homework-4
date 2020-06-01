

var totalTime = questions.length * 15;
var currentQuiz = 0;

var timeId;

function tick() {

    totalTime--;

    if (totalTime <= 0) {
        totalTime = 0;
    }

    document.getElementById("time").textContent = "Time remaining: " + totalTime;

    if (totalTime <= 0) {
        finish();
        return;
    }
}

function getNextQuiz() {
    var question = questions[currentQuiz];
    
    document.getElementById("quiz-content").textContent = question.title;
    
    var choices = document.getElementById("quiz-choices");

    choices.innerHTML = '';

    for (var i = 0; i < question.choices.length; i++) {
        var ch = question.choices[i];

        var button = document.createElement("button");
        button.setAttribute("value", ch);
        button.textContent = ch;
        button.onclick = choiceSelect;
        choices.appendChild(document.createElement("br"));
        choices.appendChild(button);
    }

    timeId = setInterval(tick, 1000);

    document.getElementById("time").textContent = "Time remaining: " + totalTime;
}

function choiceSelect() {

    var result = "Correct"

    if (this.value == questions[currentQuiz].answer) {

    }
    else {
        totalTime -= 15;
        result = "Wrong";
    }

    if (totalTime < 0) {
        totalTime = 0;        
    }
    
    document.getElementById("result").textContent = result;

    if (currentQuiz + 1 == questions.length || totalTime <= 0) {
        currentQuiz = 0;        
        finish();
        return;
    }

    currentQuiz++;

    getNextQuiz();
}

function finish() {

    clearInterval(timeId);
    
    document.getElementById("quiz").innerHTML = "";

    document.getElementById("show-result").removeAttribute("class");

    document.getElementById("score").textContent = "Score: " + totalTime;
}

function submit() {
    var initials = document.getElementById("initials").value;

    if (initials == "") {
        return;
    }

    var scores = JSON.parse(localStorage.getItem("scores")) || [];

    scores.push({
        score: totalTime,
        initials: initials
    });

    localStorage.setItem("scores", JSON.stringify(scores));
    location.href = "scores.html";
}

getNextQuiz();

document.getElementById("submit").onclick = submit;
