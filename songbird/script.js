
import birdsData from './birds.js';
let list = document.getElementById('birdList');
let isOpen = false;



for (let i = 0; i < birdsData.length; i++) {
        let el = document.createElement('div');
        el.id = i.toString();
        el.className = 'oneBird';
        let picture = document.createElement('div');
        picture.className = 'smallPhoto';
        picture.style.backgroundImage  = 'url("' + birdsData[i].image + '")';

        let name = document.createElement('div');
        name.className = 'smallText';
        let rus = document.createElement('div');
        rus.textContent = birdsData[i].name;
        rus.className = 'rusName';
        name.append(rus);
        let lat = document.createElement('div');
        lat.className = 'species';
        lat.textContent = birdsData[i].species;
        name.append(lat);
        el.append(picture);
        el.append(name);
        list.append(el);
}
document.getElementById('birdList').addEventListener('click', showBird);

function showBird(e) {
    if (isOpen) return;
    let target = e.target;
    if (target.id == 'birdBox') return;
    
    let num = Number(target.parentNode.id);
    if (isNaN(num))  return;
    isOpen = true;       
    let birdBox = document.createElement('div');
    birdBox.className = 'birdBox';
    birdBox.id = 'birdBox';
    birdBox.style.backgroundImage = 'url("' + birdsData[num].image + '")';
    let info = document.createElement('div');
    info.className = 'infoBird';
    info.id = 'info'
    info.textContent = birdsData[num].description;
    let player = document.createElement('div');   
    body.append(birdBox);
    body.append(info);
    body.append(player);
    setTimeout(addPlayer,1000);
        
}

function addPlayer() {
    let player = document.createElement('div');
    player.className = 'player';
    player.id = 'player';
    body.append(player);
    window.addEventListener('click', removePlayer);

}

function removePlayer(e) {
let target = e.target;
if (target.id == 'info') return;
if (target.id == 'birdBox') return;
if (target.id == 'player') return;
document.getElementsByClassName('player')[0].remove();
document.getElementsByClassName('birdBox')[0].remove();
document.getElementsByClassName('infoBird')[0].remove();
isOpen = false;
window.removeEventListener('click', removePlayer);


}