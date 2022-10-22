let game = []; // array 0,1,2,.....size*size;
let box = []; // square matrix;
let size;
let l;
let data = {};
let records = {};
let gameTime;
let gameSteps;
let isVictory = false;
let isPlay = false;
let victory = [];
// let s = document.createElement('div');
// s.className = 'str'; 
// body.append(s); 
window.addEventListener('beforeunload', setLocalStorage)



getLocalStorage();

// size = 4;
// gameSteps = 0;
// gameTime = 0;
// init();
// shuffle();
let windowWidth = 600;

let playField = document.createElement('div');
playField.className = 'playField';
playField.id = 'field';
body.append(playField); 
let buttonBox = document.createElement('div');
buttonBox.className = 'buttonBox';
buttonBox.id = 'buttons'
body.append(buttonBox);




let timerBox = document.createElement('div');
timerBox.className = 'timerBox';
buttonBox.append(timerBox);
let el = document.createElement('div');
el.className = 'boxetoLeft';
el.textContent = 'Steps:'
timerBox.append(el);
el = document.createElement('div');
el.className = 'boxetoRight';
el.id = 'steps';
el.textContent = gameSteps;
el.style.alignText = 'left'
timerBox.append(el);
el = document.createElement('div');
el.className = 'boxetoLeft';
el.textContent = 'Seconds:'
timerBox.append(el);
el = document.createElement('div');
el.className = 'boxetoRight';
el.id = 'seconds';
el.textContent = gameTime;
el.style.alignText = 'left'
timerBox.append(el);






let selectSize = document.createElement('div');
selectSize.className = 'selectSize';
selectSize.textContent = 'size&';
buttonBox.append(selectSize);
let button = document.createElement('button');
button.className = 'button';
button.id = 'NewGame'
button.textContent = 'New Game'
buttonBox.append(button); 
button = document.createElement('button');
button.className = 'button';
button.id = 'BestResults'
button.textContent = 'Best Results'
buttonBox.append(button); 
createField();



document.getElementById('field').addEventListener('click', moveTag);
document.getElementById('NewGame').addEventListener('click', newGame);
showTime();

// расставляем фишки на поле
function createField() {
    for (let i = 0; i < size; i++)
        for (let j = 0; j < size; j++)
        {
            let tag = document.createElement('div');
            tag.className = 'tag';
            tag.style.width = windowWidth * 0.9 / size + 'px';
            tag.style.height = windowWidth * 0.9 / size + 'px';
            if (!box[i][j]) {
                tag.style.color = '#0000ff';
                tag.style.backgroundColor = '#0000ff';
                tag.style.border = 'none';  
                tag.style.boxShadow = 'none'   
            }
            else {
                tag.style.color = '#fff';
                tag.style.backgroundColor = '#ff0000';
                tag.style.border = '2px solid white';     
            }
            tag.id = (i * size + j).toString();
            tag.textContent = box[i][j];
            playField.append(tag);
    
        }
    }
    

// устанавливаем размеры элементов в зависимости от размера экрана
function setSizes() {
    let screen = window.outerWidth;
    if (screen > 1280) {
        windowWidth = 600;
    }
    if (screen > 720) windowWidth = 500;

}


function setLocalStorage() {
    data.size = size;
    data.records = records;
    data.box = box;
    data.gameSteps = gameSteps;
    data.gameTime = gameTime;
    data.isVictory = isVictory;
    localStorage.setItem('data', JSON.stringify(data));
  }
  
  
  
//   это мы посмотрели в локальное хранилище, достали оттуда данные, если нет - создали их
// если там победа - сгенерили новую игру и обнулили время

  function getLocalStorage() {
      if(localStorage.getItem('data')) {
        data = JSON.parse(localStorage.getItem('data'));
        size = data.size;
        records = data.records;
        gameTime = data.gameTime;
        gameSteps = data.gameSteps;
        isVictory = data.isVictory;
        box = data.box;
        console.log('incorrect data')
        if (isVictory) { 
            gameTime = 0;
            gameSteps = 0;
            isVictory = false;
            shuffle();
        }
      }
      else {
        size = 4;
        shuffle();
      
        gameTime = 0;
        gameSteps = 0;
        isVictory = false;
        records = [{size:3, steps:9999, time:9999},{size:4, steps:9999, time:9999},{size:5, steps:9999, time:9999}];
      }  
  }


// создаем болванку нужного размера и двумерный массив с правильной раскладкой
function init() {
    game = [];
    l = size * size;
    for (let i = 0; i < l-1; i++)
        game.push(i + 1);
    game.push(0);    
    victory = [];    
    for (let i = 0; i < size; i++) {
        let str = [];
        for (let j = 0; j < size; j++) {
            str.push(game[i * size + j])
        }
        victory.push(str);
    } 
}


// перемешиваем массив, проверяем на решаемость и корректируем, создаем матрицу
function shuffle() {
    game = game.sort(function() {return Math.random() - 0.5});
    if (noSolve(game))
        if (game[0] * game[1]) {
            let el = game[0];
            game[0] = game[1];
            game[1] = el;
        }    
        else {
            let el = game[l-2];
            game[l-2] = game[l-1];
            game[l-1] = el;
        }
        box = [];
        for (let i = 0; i < size; i++) {
            let str = [];
            for (let j = 0; j < size; j++) {
                str.push(game[i * size + j])
            }
            box.push(str);
        }  

}

// обнуляем таймер и счетчик шагов, перемешиваем фишки заново
function newGame() {
    gameTime = 0;
    gameSteps = 0;
    isVictory = false;
    isPlay = false;
    init();
    setSizes();
    shuffle();
    changeBox(); 
}
// проверяем на решаемость
function noSolve() {
    let sum = 0;
    for (let i = 0; i < game.length; i++) {
      if (!game[i] && !(size % 2)) sum += Math.floor(i / size + 1) 
      for (let j = i + 1; j < game.length; j++) 
        if (game[i] > game[j] && game[j]) sum += 1;
    } 
    if (sum % 2) return true
    else return false;
  }

//двигаем фишки, если возможно
    function moveTag(e) {
        isPlay = true;
        let target = e.target;
        if (target.id == 'field') return;
        let num = Number(target.id);
        console.log(num);
        let zeroString;
        let zeroColumn;
        let numColumn = num % size;
        let numString = (num - numColumn) / size;
        for (let i = 0; i < size; i++)
            for (let j = 0; j < size; j++) 
                if (box[i][j] == 0) {
                    zeroString = i;
                    zeroColumn = j;
                }
           
            
            
            // console.log(zeroString,zeroColumn,numString,numColumn);      
        if (numString != zeroString && numColumn != zeroColumn) return;
        if (numString == zeroString && numColumn == zeroColumn) return;
        let changeList = [];
        if (numString == zeroString) 
            changeString(numString, zeroColumn, numColumn)              
        if (numColumn == zeroColumn) 
            changeColumn(numColumn, zeroString, numString)
        gameSteps += 1;   
        changeBox();    
        if (JSON.stringify(box) == JSON.stringify(victory)) alert('you win!');   
    }
        // сдвигаем колонку
        function changeColumn(j, zero, num) {
        if (zero < num) 
            for (let i = zero; i < num; i++)
                box[i][j] = box[i+1][j]
        else 
            for (let i = zero; i > num; i--)
                box[i][j] = box[i-1][j]
        box[num][j] = 0;    
        }
        // сдвигаем строку    
        function changeString(i, zero, num) {
        if (zero < num) 
            for (let j = zero; j < num; j++)
                box[i][j] = box[i][j+1]
        else 
            for (let j = zero; j > num; j--)
                box[i][j] = box[i][j-1]
        box[i][num] = 0;    
        }   
        // отображаем последствия хода на экране
        function changeBox() {
        document.getElementById('steps').textContent = gameSteps;
        document.getElementById('seconds').textContent = gameTime;    
        for (let i = 0; i < size; i++) 
            for (let j = 0; j < size; j++) {
            let id = (i * size +j).toString();
            let el = document.getElementById(id);
            // console.log(size);
                if (box[i][j]) {
                    el.style.color = '#fff';
                    el.style.backgroundColor = '#ff0000';
                    el.style.border = '2px solid white';      
                    el.style.boxShadow = '5px 5px 5px 2px #500000';
                }
                else {    
                    el.style.color = '#0000ff';
                    el.style.backgroundColor = '#0000ff';
                    el.style.border = 'none'; 
                    el.style.boxShadow = 'none'
                }
                el.textContent = box[i][j];        
            }
   

        }
        // таймер (запускается при первом движении)
        function showTime() {
        if (isPlay) gameTime += 1;
        document.getElementById('seconds').textContent = gameTime;        
            setTimeout(showTime, 1000);
          }





        // 1. проверка на собираемость, вывод сообщения
        // 2. добавляем кнопки рестарт, рекорды и выбор сложности
        // 3. добавляем таймер (старт при первом нажатии, счет ходов)
        // 4. добавляем запись\ просмотр рекордов
        // 3. добавляем выбор ширины элементов в зависимости от ширины экрана
        // 6. добавляем перенос блока кнопок вниз при ширине меньше чего то там и сами кнопки горизонтально 
