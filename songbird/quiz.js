import birdsData from './birds.js';
let list = document.getElementById('birdList');
let l = 6;
let count = 0;
let score = 0;
let rnd = birdsData.sort(function(){return Math.random() - 0.5;})
let answers = rnd.slice(0,6);
let variants = rnd.slice(6);
let field = document.getElementById('quiz');
for (let i = 0; i < 6; i++) {
    let el = document.createElement('div');
    el.className = 'questionString';
    let circle  = document.createElement('div');
    circle.className = 'circle';
    let txt = document.createElement('div');
    txt.className = 'questionTxt';
    el.append(circle);
    el.append(txt);
    field.append(el);
}
let smallPhoto = document.getElementById('small');
smallPhoto.style.backgroundImage = 'url("bird.svg")';

// while (l > 0) {
//     // щас мы запускаем цикл из 6 вопросов
//     let smallPhoto = document.getElementById('small');
//     smallPhoto.style.backgroundImage = 'url("bird.svg")';



// }