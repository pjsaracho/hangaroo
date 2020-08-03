const lettersDiv = document.querySelector('#letters');

let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
letters = letters.split('');

let errorCounter = 0;
let clicks = 0;
function answerEventListener(btnClicked) {
    let checker = false;
    correctAnswer.forEach( function(letter, i) {
        if(btnClicked === letter) {
            answerLetters[i].textContent = letter;
            checker = true;
            clicks++;
            
            if(clicks === correctAnswer.length) {
                setTimeout( function() {
                    alert('You win!');
                }, 500)
            }
        } 
    })
    if(checker === false) {
        errorCounter++;
        document.querySelector('#errors').textContent += 'X ';

        if(errorCounter === 4) {
            document.querySelector('#gameOver').style.display = 'block';
        }
    }
}
let pressedKeys = [];
document.body.addEventListener('keypress', function(e) {
    let letter = e.key.toUpperCase();
    if( (e.which >= 65 && e.which <=90) || (e.which>=97 && e.which<=122) ) {
        if(!pressedKeys.includes(letter)) {
            pressedKeys.push(letter);
            answerEventListener(letter);
            document.querySelectorAll('.letterBtn').forEach( function(btn) {
                if(btn.textContent === letter) {
                    btn.style.backgroundColor = '#e3c517';
                    btn.style.border = 'none';
                    btn.style.opacity = '0.3';
                    btn.disabled = true;
                }
            }) 
        }
    }
});
letters.forEach( function(letter) { 
    let letterBtn = document.createElement('button');
    letterBtn.textContent = letter;
    letterBtn.classList.add('letterBtn');
    letterBtn.addEventListener('click', function() {
        this.style.backgroundColor = '#e3c517';
        this.style.border = 'none';
        this.style.opacity = '0.3';
        this.disabled = true;
        answerEventListener(this.textContent);
    });
    lettersDiv.append(letterBtn);
})

const answerDiv = document.querySelector('#answer');
const possibleAnswers = [
    "JAVASCRIPT", "JQUERY", "HYPERTEXT MARKUP LANGUAGE", "CASCADING STYLE SHEETS"
];
const possibleAnswersShuffled = [];
while(possibleAnswers.length>-0) {
    let randomNum = Math.floor(Math.random()*possibleAnswers.length);
    possibleAnswersShuffled.push(possibleAnswers[randomNum]);
    possibleAnswers.splice(randomNum, 1);
}
let correctAnswer = possibleAnswersShuffled[0];
correctAnswer = correctAnswer.split('');

correctAnswer.forEach( function(letter) {
    let div = document.createElement('div');
    div.classList.add('answerLetter');
    if(letter == ' ') {
        div.style.visibility = 'hidden';
        answerDiv.innerHTML += '<br>';
    } 
    answerDiv.append(div);
});

const answerLetters = document.querySelectorAll('.answerLetter');

document.querySelector('#gameOver button').addEventListener('click', function() {
    location.reload();
})