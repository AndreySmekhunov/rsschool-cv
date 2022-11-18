import birdsData from './birds.js';
let wrongAnswers = [];
let l = 6;
let currentVariants = [];
let count = 0;
let score = 0;
let rnd = birdsData.sort(function(){return Math.random() - 0.5;})
let answers = rnd.slice(0,l);
let variants = rnd.slice(l);
let field = document.getElementById('quiz');
for (let i = 0; i < 6; i++) {
    let el = document.createElement('div');
    el.className = 'questionString';
    el.id = i.toString();
    field.append(el);
}
let next = document.getElementsByClassName('longButton')[0];
let currentQuestion = document.getElementsByClassName('questionTxt')[0];
let scoreTxt = document.getElementsByClassName('score')[0];
let progressBar = document.getElementsByClassName('oneStep')[0];
fillVariants();
field.addEventListener('click', getAnswer);

    

function fillVariants() {
progressBar.style.width = (100/l * count).toString() + '%';
currentVariants = variants.slice(0,5);
currentVariants.push(answers[count]);
currentVariants.sort(function(){return Math.random() - 0.5;})
let smallPhoto = document.getElementById('small');
smallPhoto.style.backgroundImage = 'url("bird.svg")';
currentQuestion.textContent = 'Вопрос ' + (count + 1) + ' из ' + l + answers[count].name;
scoreTxt.textContent = 'Баллы: ' + score;
for (let i = 0; i < 6; i++) {
    let el = document.getElementById(i.toString());
    console.log(el);
    el.style.fontSize = '1.5em';
    el.style.color = 'white'; 
    el.style.cursor = 'pointer';
    el.textContent = currentVariants[i].name;
}
}

function getAnswer(e) {
 let target = e.target;
 let num = Number(target.id);
 if (isNaN(num))  return;
 console.log(num);
 if (wrongAnswers.indexOf(currentVariants[num].id) > -1) return;
let el = document.getElementById((num).toString())
if (currentVariants[num].id == [answers[count].id]) {
    count += 1;
    el.style.fontSize = '2em'; 
    field.removeEventListener('click', getAnswer);
    score += 5 - wrongAnswers.length;
    wrongAnswers = [];
    scoreTxt.textContent = 'Баллы: ' + score;
    if (count == l) {
        progressBar.style.width = '100%';
        showResult();
    }
    else {
        next.addEventListener('click', nextQuestion);
        next.style.backgroundColor = '#00a0a0'
    }
}
else {
    wrongAnswers.push(currentVariants.id);
    el.style.color = 'red'; 
    el.style.cursor = 'default';
}
}

function nextQuestion() {
    fillVariants();
    field.addEventListener('click', getAnswer);
    next.removeEventListener('click', nextQuestion);
    next.style.backgroundColor = '#909090';

}
function showResult() {
    alert(1);
}