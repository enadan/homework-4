
function getScores() {
    document.getElementById("scores").innerHTML = "";

    var scores = JSON.parse(localStorage.getItem("scores")) || [];

    scores.sort(function(a, b) {
        return b.score - a.score;
    });

    scores.forEach(score => {
        console.log(score);
        var item = document.createElement("li");
        item.textContent = score.initials + " - " + score.score;

        document.getElementById("scores").appendChild(item);
    });

    var startOver = document.createElement("button");
    startOver.textContent = "Start Over";
    startOver.onclick = function() {
        location.href = "./";
    };
    document.getElementById("scores").appendChild(startOver);

    if (scores.length > 0) {
        var button = document.createElement("button");
        button.textContent = "Clear";
        button.onclick = clearAll;
        document.getElementById("scores").appendChild(button);
    }
}

function clearAll() {
    localStorage.removeItem("scores");
    getScores();
}


getScores();