// Setting the target word

const start_button = document.getElementById("start_button");
const target_text = document.getElementById("target_text");
var target = null;

function target_set() {
    target = document.getElementById("target_text").value.toUpperCase()
    if (target.length === 5) {
        console.log('TARGET WORD: ' + target);
        target_text.value = "";
        document.getElementById('status').innerHTML = "Enter a guess!";
    } else if (target.length !== 5) {
        document.getElementById('status').innerHTML = "Invalid Target.";
        target = null;
        target_text.value = "";
    } else if (target !== null) {
        document.getElementById('status').innerHTML = "Target exists already.";
        target_text.value = "";
    }
}


start_button.addEventListener("click", target_set);
target_text.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        target_set();
    }
});

// Entering words into the table that also tells you if you won or lost
const guess_button = document.getElementById("guess_button");
const guess_text = document.getElementById("guess_text");
var game_board = document.getElementById("game_board");
var guess = null;
var over = 0;
var rowIndex = 0;

function guess_set() {
    guess = document.getElementById("guess_text").value.toUpperCase();

    if (target === null) {
        document.getElementById("status").innerHTML = "Set Target First!";
    } else if (guess.length === 5 && rowIndex < 6 && over === 0) {
        document.getElementById("status").innerHTML = "Valid Input!";
        guess_text.value = "";

        var colors = color(guess,target);

        for (var j = 0; j < guess.length; j++) {
            var cell = document.getElementById("cell_" + rowIndex + "_" + j);
            cell.innerText = guess[j];
            cell.style.backgroundColor = colors[j];
        }
    
        rowIndex++;

        if (guess === target) {
            over = 1;
            document.getElementById("status").innerHTML = "You win!";
        } else if (rowIndex === 6 && guess !== target) {
            over = 1;
            document.getElementById("status").innerHTML = "You lose. The word was: " + target;
        }
    } else if (guess.length !== 5 && over === 0) {
        document.getElementById("status").innerHTML = "Invalid Input.";
    }
}

guess_button.addEventListener("click", guess_set);
guess_text.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        guess_set();
    }
})

// Getting the colors for each cell
// not totally accuate :(
function color(guess, target) {
    var colors = [];
    var count = {};

    for (var i in target) {
        var char = target[i];
        if (!count[char]) {
            count[char] = 0
        } 
        count[char]++;
    }
        
    for (var i = 0; i < 5; i++) {
        if (guess[i] === target[i] && count[guess[i]] > 0) {
            colors[i] = 'lightgreen';
            count[target[i]] = count[target[i]] - 1;
        } else if (guess[i] !== target[i] && count[guess[i]] > 0) {
            colors[i] = 'yellow';
        } else {
            colors[i] = 'lightgray'
        }
    }

    for (var i=0; i<colors.length; i++) {
        if (colors[i] === 'yellow' && count[guess[i]] === 0) {
            colors[i] = 'lightgray'
        }
    }
    
    return colors
}


