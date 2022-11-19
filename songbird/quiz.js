'use strict';
import birdsData from './birds.js';

let l = 6;
const yesOrNo = document.getElementById('yesOrNo');
let audioQuiz = document.getElementById('audioQuiz');
let audioDescription = document.getElementById('audioDescription');
audioQuiz.isPlay = false;
audioQuiz.playerName = 'playerQuiz';
audioDescription.isPlay = false;
audioDescription.playerName = 'playerDescription';
let currentVariants = [];
let count = 0;
let score = 0;
let wrongAnswers = [];
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
let inviteText = document.getElementsByClassName('inviteText')[0];
let bigPhoto = document.getElementById('bigPhoto');
let playerQuiz = document.getElementById('playerQuiz');
let playerDescription = document.getElementById('playerDescription');
let name = document.getElementsByClassName('name')[0];
let hint = document.getElementsByClassName('hint')[0];
let description = document.getElementById('description');
let next = document.getElementsByClassName('longButton')[0];
let currentQuestion = document.getElementsByClassName('questionTxt')[0];
let scoreTxt = document.getElementsByClassName('score')[0];
let progressBar = document.getElementsByClassName('oneStep')[0];
let smallPhoto = document.getElementById('small');
fillVariants();

field.addEventListener('click', getAnswer);
playerQuiz.addEventListener('click',() => play(audioQuiz));
audioQuiz.addEventListener('ended',() => endPlay(audioQuiz));
playerDescription.addEventListener('click',() => play(audioDescription));
audioDescription.addEventListener('ended',() => endPlay(audioDescription));
    

function initGame () {
progressBar.style.width = 0;
currentVariants = [];
count = 0;
score = 0;
wrongAnswers = [];
rnd = birdsData.sort(function(){return Math.random() - 0.5;})
answers = rnd.slice(0,l);
variants = rnd.slice(l);
}

function fillVariants() {
currentVariants = variants.sort(function(){return Math.random() - 0.5;}).slice(0,5);
currentVariants.push(answers[count]);
currentVariants.sort(function(){return Math.random() - 0.5;})
inviteText.style.display = 'block';
bigPhoto.style.display = 'none';
playerDescription.style.display = 'none';
name.style.display = 'none';
description.style.display = 'none';
smallPhoto.style.backgroundImage = 'url("bird.svg")';
audioQuiz.src = answers[count].audio;
currentQuestion.textContent = '*  *  *';
hint.textContent = 'подсказка для тестеров: ' + answers[count].name;
scoreTxt.textContent = 'Баллы: ' + score;
for (let i = 0; i < 6; i++) {
    let el = document.getElementById(i.toString());
    el.style.fontSize = '1em';
    el.style.color = 'white'; 
    el.style.cursor = 'pointer';
    el.textContent = currentVariants[i].name;
}
}

function getAnswer(e) {
 let target = e.target;
 let num = Number(target.id);
 if (isNaN(num))  return;
 if (wrongAnswers.indexOf(currentVariants[num].id) > -1) return;
let el = document.getElementById((num).toString());
audioDescription.src = currentVariants[num].audio;
inviteText.style.display = 'none';
bigPhoto.style.display = 'block';
playerDescription.style.display = 'block';
name.style.display = 'block';
description.style.display = 'block';
bigPhoto.style.backgroundImage = 'url("' + currentVariants[num].image +'")';
name.innerHTML = currentVariants[num].name + '<br> <i>' + currentVariants[num].species + '</i>';
description.textContent = currentVariants[num].description;


if (currentVariants[num].id == [answers[count].id]) {
    el.style.color = 'green'; 
    yesOrNo.src = 'yes.mp3';
    if (audioQuiz.isPlay) play(audioQuiz);
    endPlay(audioDescription);
    if (audioDescription.isPlay) play(audioDescription);
    yesOrNo.play();
    smallPhoto.style.backgroundImage = 'url("' + answers[count].image +'")';
    currentQuestion.textContent = answers[count].name;
    count += 1;
    progressBar.style.width = (100/l * count).toString() + '%';
    field.removeEventListener('click', getAnswer);
    score += 5 - wrongAnswers.length;
    wrongAnswers = [];
    scoreTxt.textContent = 'Баллы: ' + score;
    if (count == l) {
        progressBar.style.width = '100%';
        setTimeout(showResult,500);
    }
    else {
        next.addEventListener('click', nextQuestion);
        next.style.backgroundColor = '#00a0a0';
        next.style.cursor = 'pointer';
    }
}
else {
    yesOrNo.src = 'no.mp3';
    yesOrNo.play();
    wrongAnswers.push(currentVariants[num].id);
    el.style.color = 'red'; 
    el.style.cursor = 'default';
}
}

function nextQuestion() {
    if (audioQuiz.isPlay) {
        play(audioQuiz);
    }    
    if (audioDescription.isPlay) {
        play(audioDescription);
    }
    endPlay(audioDescription);
    endPlay(audioQuiz);
    fillVariants();
    field.addEventListener('click', getAnswer);
    next.removeEventListener('click', nextQuestion);
    next.style.backgroundColor = '#909090';
    next.style.cursor = 'default';

}
function showResult() {
    clearTimeout(showResult);
    let el = document.createElement('div');
    let victoryText = document.createElement('div');
    let victoryHeader = document.createElement('div');
    let buttonNewGame = document.createElement('div');
    let buttonReturn = document.createElement('div');
    el.className = 'victoryWindow';
    victoryHeader.className = 'victoryHeader';
    victoryHeader.innerHTML = '<p>Поздравляем!!! <br> Вы выиграли!!!</p>';
    let rightName = ['баллов','балл','балла','балла','балла','баллов','баллов','баллов','баллов','баллов'];

    if (score == 30) victoryText.textContent = `Вы набрали максимальное количество баллов(30)!`
    else victoryText.textContent = 'Вы набрали ' + score + ' ' + rightName[score % 10] +'. Попробуйте еще раз'
    victoryText.className = 'victoryText';
    buttonNewGame.className = 'buttonVictory';
    buttonReturn.className = 'buttonVictory';
    buttonNewGame.innerHTML = '<p>Новая игра</p>';
    buttonReturn.innerHTML = '<p>Главная страница</p>';
    body.append(el);
    el.append(victoryHeader);
    el.append(victoryText);
    el.append(buttonNewGame);
    el.append(buttonReturn);
    buttonNewGame.addEventListener('click', restart);
    buttonReturn.addEventListener('click', () => {document.location.href = 'index.html'})
    initGame();
}
function restart() {
    document.getElementsByClassName('victoryWindow')[0].remove();
    initGame();
    fillVariants();
    field.addEventListener('click', getAnswer);
}
function play(player) {
    let el = document.getElementById(player.playerName);
    if (player.isPlay) {
        player.isPlay = false;
        el.style.backgroundImage = ' url("pause.svg")';
        player.pause();
    }
    else {
        player.isPlay = true;
        el.style.backgroundImage = ' url("play.svg")';
        el.style.backgroundColor = ' #505050';
        player.play();
    }
}

function endPlay(player) {
    player.isPlay = false;
    document.getElementById(player.playerName).style.backgroundColor = '#909090';
    document.getElementById(player.playerName).style.backgroundImage = ' url("play.svg")';
}