
import birdsData from './birds.js';
let list = document.getElementById('birdList');

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
    console.log('yes');
    let target = e.target;
    console.log(target);
    // e.stopPropagation();
    if (target.id == 'birdBox') return;
    let num = Number(target.parentNode.id);
    console.log(num);
    let birdBox = document.createElement('div');
    birdBox.className = 'birdBox';
    
    let photo = document.createElement('div');
    photo.className = 'bigPhoto';
    photo.style.backgroundImage = 'url("' + birdsData[num].image + '")';
    let info = document.createElement('div');
    info.className = 'infoBird';
    info.textContent = birdsData[num].description;
    birdBox.append(photo);
    birdBox.append(info);
    body.append(birdBox);

}