
function painallus() {
    document.querySelector('#rulla1').style.transition = 'background-position-y 1s';
    let yPaikka = getComputedStyle(document.querySelector('#rulla1')).backgroundPositionY;
    yPaikka = parseInt(yPaikka) + Math.round(Math.random()*5)*80;
    console.log(yPaikka);
    document.querySelector('#rulla1').style.backgroundPositionY = yPaikka +'px';
}