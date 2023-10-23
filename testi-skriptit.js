
function painallus() {
    
    document.querySelector('#rulla1').style.transition = 'background-position-y 1s';
    let yPaikka = getComputedStyle(document.querySelector('#rulla1')).backgroundPositionY;
    yPaikka = parseInt(yPaikka) + Math.round(Math.random()*5)*80;
    console.log(yPaikka);
    document.querySelector('#rulla1').style.backgroundPositionY = yPaikka +'px';
}

function pyoritaRullaa(rulla,ndx) {
    const aikaPerKuva = 100;
    let lisays = (ndx + 2) * 5 + Math.round(Math.random() * 5);
    let yPaikka = parseInt(getComputedStyle(rulla).backgroundPositionY);
    rulla.style.transition = 'background-position-y '+(8 + lisays)*aikaPerKuva + 'ms';
    rulla.style.backgroundPositionY = yPaikka + lisays * 80 + 'px';
/*
    console.log(lisays,yPaikka)
*/
}

function pyoritaKaikkiaRullia() {
    document.querySelectorAll('.rullat').forEach((val, ndx) => {
        pyoritaRullaa(val,ndx);
    });
    

}