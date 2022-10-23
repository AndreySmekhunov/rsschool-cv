let game = []; // array 0,1,2,.....size*size;
let box = []; // square matrix;
let size;
let l;
let data = {};
let records = [];
let gameTime;
let gameSteps;
let isVictory = false;
let isPlay = false;
let isRecords;
let victory = [];
let font;
let windowWidth;

window.addEventListener('beforeunload', setLocalStorage)



getLocalStorage();

// size = 4;
// gameSteps = 0;
// gameTime = 0;
// init();
// shuffle();
// let windowWidth = 600;

let playField = document.createElement('div');
playField.className = 'playField';
playField.id = 'field';
body.append(playField); 
let oldWidth = playField.offsetWidth;
let newWidth = oldWidth;
console.log(newWidth);
let buttonBox = document.createElement('div');
buttonBox.className = 'buttonBox';
buttonBox.id = 'buttons'
body.append(buttonBox); 
let sound = document.createElement('audio');
sound.src = 'no2.mp3';
sound.id = 'no';
body.append(sound);
sound = document.createElement('audio');
sound.src = 'yes3.mp3';
sound.id = 'yes';
body.append(sound);
sound = document.createElement('audio');
sound.src = 'victory.mp3';
sound.id = 'victory';
body.append(sound);


let timerBox = document.createElement('div');
timerBox.className = 'timerBox';
timerBox.id = 'timerBox';
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
selectSize.id = 'selectSize';
buttonBox.append(selectSize);
selectSize.textContent = size + ' x ' + size;

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


setWidth();
setSizes();
createField();
fillField();

// records = [{size:3, steps:9999, time:9999},{size:4, steps:9999, time:9999},{size:5, steps:9999, time:9999},
    // {size:6, steps:9999, time:9999},{size:7, steps:9999, time:99999},{size:8, steps:9999, time:99999}];

document.getElementById('field').addEventListener('click', moveTag);
document.getElementById('selectSize').addEventListener('click', resize);
document.getElementById('NewGame').addEventListener('click', newGame);
document.getElementById('BestResults').addEventListener('click', showResults); 
document.getElementById('timerBox').addEventListener('click', pauseGame); 

showTime();

// расставляем фишки на поле (без цифр)
function createField() {
    for (let i = 0; i < size; i++)
        for (let j = 0; j < size; j++)
        {
            let tag = document.createElement('div');
            tag.className = 'tag';
            tag.style.width = newWidth / (size + 0.7) + 'px';
            tag.style.height = newWidth  / (size + 0.7) + 'px';
            tag.id = (i * size + j).toString();
            playField.append(tag);
    
        }
    }
    function fillField() {
        document.getElementById('steps').textContent = gameSteps;
        document.getElementById('seconds').textContent = gameTime;  
        for (let i = 0; i < size; i++)
            for (let j = 0; j < size; j++)
            {
                let tag = document.getElementById((i * size + j).toString());
                if (!box[i][j]) {
                    tag.style.color = '#d0d0d0';
                    tag.style.backgroundColor = '#d0d0d0';
                    // tag.style.border = 'none';  
                    tag.style.boxShadow = 'none'   
                }
                else {
                    tag.style.color = '#fff';
                    tag.style.backgroundColor = '#00a0a0';
                    tag.style.boxShadow = '5px 5px 5px 2px #005050';
                    tag.style.fontSize = font;
                    // tag.style.border = '2px solid white';     
                }
                tag.textContent = box[i][j];
        
            }
        }

//убираем фишки после изменения размера
function clearField() {
    for (let i = 0; i < size; i++)
        for (let j = 0; j < size; j++)
        {
            let tag = document.getElementById((i * size + j).toString());
            tag.remove()
    
        }
    }
//увеличиваем размер 
function resize() {
    clearField();
    size += 1;
    if (size > 8) size = 3;
    document.getElementById('selectSize').textContent = size + ' x ' + size;
    createField();
    newGame();
    fillField();
}
// устанавливаем размеры элементов в зависимости от размера экрана
function setSizes() {
    if (size == 3) font = '6em';
    if (size == 4) font = '5em';
    if (size == 5) font = '4em';
    if (size == 6) font = '3em';
    if (size == 7) font = '2.5em';
    if (size == 8) font = '2em';
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
        init();
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
        records = [{size:3, steps:9999, time:9999},{size:4, steps:9999, time:9999},{size:5, steps:9999, time:9999},
            {size:6, steps:9999, time:9999},{size:7, steps:9999, time:99999},{size:8, steps:9999, time:99999}];
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
    fillField(); 
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
        if (isVictory) return;
        isPlay = true;
        let target = e.target;
        e.stopPropagation();
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
     
        if ((numString != zeroString && numColumn != zeroColumn) || (numString == zeroString && numColumn == zeroColumn)){
         let audio = document.getElementById('no');
         audio.volume=0.5;
         audio.play();
            return;
        }
        let changeList = [];
        if (numString == zeroString) 
            changeString(numString, zeroColumn, numColumn)              
        if (numColumn == zeroColumn) 
            changeColumn(numColumn, zeroString, numString)
        gameSteps += 1;   
        let audio = document.getElementById('yes');
        audio.volume=0.5;
        audio.play();
        fillField();    
        if (JSON.stringify(box) == JSON.stringify(victory)) {
            isVictory = true;
            isPlay = false;
            fillField();
            youWin();
            // newGame();
            };   
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
        // function changeBox() {
        //     fillField();
        // }
        // таймер (запускается при первом движении)
        function showTime() {
        if (isPlay) gameTime += 1;
        document.getElementById('seconds').textContent = gameTime;        
            setTimeout(showTime, 1000);
          }
          function showResults(e) {
          e.stopPropagation(); window.addEventListener('click', closeRecords);



            isPlay = false;
            let el = document.createElement('div');
            el.className = 'recordsContainer';
            el.id = 'recordsContainer'
            body.append(el);
            // console.log(el);
            let info = document.createElement('div');
            info.className = 'info';
            el.append(info);
            let str = document.createElement('div');
            str.className = 'str';
            str.style.fontSize = '2em';
            str.textContent = `Best result`;
            info.append(str);
            for (let i = 0; i < records.length; i++) {
                let str = document.createElement('div');
                str.className = 'str';
                str.textContent = `${i+3}x${i+3}      Steps: ${records[i].steps}        Seconds: ${records[i].time}`;
                info.append(str);
            }
            window.addEventListener('click', closeRecords)  
            
          }

          function closeRecords() {
                        // alert('you here');
            let el = document.getElementById('recordsContainer');
            el.remove();
            window.removeEventListener('click', closeRecords);
          }

          function youWin() {
            let audio = document.getElementById('victory');
            audio.volume=0.5;
            audio.play();
            let el = document.createElement('div');
            el.className = 'recordsContainer';
            el.id = 'recordsContainer'
            body.append(el);
        
            let info = document.createElement('div');
            info.className = 'info';
            info.style.backgroundColor = 'red';
            info.style.boxShadow = '15px 15px 10px 5px #550000';
            info.style.alignContent = 'center';
            el.append(info);
            let str = document.createElement('div');
                str.className = 'win';
                str.textContent = `Congratulations!!!  You have completed the puzzle in ${gameSteps} steps and ${gameTime} seconds!!!`;
                if (records[size - 3].time > gameTime) {
                    records[size - 3].time = gameTime;
                    records[size - 3].steps = gameSteps;
                }
            info.append(str);
            window.addEventListener('click', closeRecords)      
        
          }  

          function pauseGame() {
            if (isVictory) return;
            if (isPlay) isPlay = false 
                else isPlay = true
          }
          function setWidth() {
            newWidth = playField.offsetWidth;
            if (newWidth != oldWidth) {
                oldWidth = newWidth;
                clearField();
                createField();
                fillField();
            }
            setTimeout(setWidth, 300);
          }

        // 1. проверка на собираемость, вывод сообщения
        // 2. добавляем кнопки рестарт, рекорды и выбор сложности
        // 3. добавляем таймер (старт при первом нажатии, счет ходов)             +++++++
        // 4. добавляем запись\ просмотр рекордов
        // 3. добавляем выбор ширины элементов в зависимости от ширины экрана 
        // 6. добавляем перенос блока кнопок вниз при ширине меньше чего то там и сами кнопки горизонтально 
