
import birdsData from './birds.js';
let list = document.getElementsByClassName('birdList')[0];
for (let i = 0; i < birdsData.length; i++) {
    for (let j = 0; j < birdsData[i].length; j++) {
        let el = document.createElement('div');
        el.className = 'oneBird';
        let picture = document.createElement('div');
        picture.className = 'smallPhoto';
        picture.style.backgroundImage  = 'url("' + birdsData[i][j].image + '")';
        el.append(picture);
        let name = document.createElement('div');
        name.className = 'smallText';
        let p = document.createElement('div');
        p.textContent = birdsData[i][j].name;
        name.append(p);
        p = document.createElement('div');
        p.textContent = birdsData[i][j].species;
        name.append(p);
        el.append(name);
        list.append(el);
    }
}