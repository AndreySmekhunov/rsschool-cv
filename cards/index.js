// import word from './words.js';
// window.addEventListener('load', getLocalStorage);
let currentScreen;
mainScreen();

function getLocalStorage() {
const wordString = localStorage.getItem('wordString');
if (wordString) word = JSON.parse(wordString);
}

function setLocalStorage() {
    localStorage.setItem('wordString', JSON.stringify(word));
}

function mainScreen() {
    // главный экран
    if (currentScreen) document.getElementById(currentScreen).remove();
    else {
        currentScreen = 1;
    }
    let el = document.createElement('div');
    el.className = 'section';
    el.id = 'currentScreen';
    body.append(el); 
    let head = document.createElement('h1');
    head.textContent = 'Cards v 1.0';
    el.append(head);
    alert('111');
    let btn;

    // btn = document.createElement('div');
    // btn.className = 'button';
    // btn.textContent = '';
    // el.append(btn);
    // btn.addEventListener('click', randomTest);

    btn = document.createElement('div');
    btn.className = 'button';
    btn.textContent = 'Случайный тест';
    el.append(btn);
    btn.addEventListener('click', randomTest);

    btn = document.createElement('div');
    btn.className = 'button';
    btn.textContent = 'Выбор темы';
    el.append(btn);
    btn.addEventListener('click', selectTopic);

    btn = document.createElement('div');
    btn.className = 'button';
    btn.textContent = 'Настройки';
    el.append(btn);
    btn.addEventListener('click', setup);

    btn = document.createElement('div');
    btn.className = 'button';
    btn.textContent = 'О программе';
    el.append(btn);
    btn.addEventListener('click', about);

}

function selectTopic() {
    // выбор темы
}

function setup() {
    // настройки
}

function about() {
    // настройки
}

function showResult() {

}



function randomTest() {
    // тест
    let start = document.getElementById('start');
    start.style.display = 'none';
    let el = document.createElement('section');
    el.className = 'section';
// случайный тест с использованием всего словаря
    let testSet = [];
    for (let i = 0; i < word.length; i++) {

        for (let j = 0; j < word[i].setRus.length; j++) {
            let pair = [];
            pair.push(word[i].setRus[j]);
            pair.push(word[i].setSpain[j]);
            testSet.push(pair);
        }
        
    }
    testSet.sort(function(){return Math.random() - 0.5;});
    const questions = testSet.slice(10); 
    let head = document.createElement('h1');
    head.textContent = 'Тест по всем карточкам';
    el.append(head);
    let questionField = document.createElement('div');
    questionField.className = 'wordQuestion';
    el.append(questionField);
    
    for (let i = 0; i < 10; i++) {
        // большой цикл с вопросами
        questionField.textContent = testSet[i][0];
        let answerField = document.createElement('div');
        answerField.className = 'answerSet';
        el.append(answerField);

        

    }

}