let arvot = [0,0,0,0];
let kuvat = ['omena','rypäle','kirsikka','seiska','meloni'];

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
    /* console.log((yPaikka/80+lisays)%5); */
    return (yPaikka/80+lisays)%5;
}

function pyoritaKaikkiaRullia() {

    document.querySelector('#voittoteksti').style.display = 'none';

    document.querySelectorAll('.rullat').forEach((val, ndx) => {
        arvot[ndx]=pyoritaRullaa(val,ndx);
    });

    document.querySelectorAll('.teksti').forEach((val) => {
        val.innerHTML = '-';
    });
    

}

document.querySelector('#rulla4').addEventListener('transitionend', () => {
    let lkm = [0,0,0,0,0];
    document.querySelectorAll('.teksti').forEach((val,ndx) => {
        val.innerHTML = kuvat[arvot[ndx]];
        lkm[arvot[ndx]] += 1;
    });

    for(let i=0;i<lkm.length;i++) {
        if(lkm[i] == 4 || (i == 3 && lkm[i] == 3)) {
            document.querySelector('#voittoteksti').style.display = 'initial';
        }
    }
});

/*
0 = omena
1 = rypale
2 = kirsikka
3 = seiska
4 = meloni
*/


window.onload = () => {

    let pngkuva = document.createElement('img');
    pngkuva.src = 'rulla80.png';

    let cnvs = document.createElement('canvas'), cntx = cnvs.getContext('2d');
    cnvs.width = 40;
    cnvs.height = 40;

    /* drawImage: source image, source-x-start, source-y-start, source-width, source-height, dest-x-start, dest-y-start, dest-width, dest-height */
    let kohta = 0;
    cntx.drawImage(pngkuva,0,kohta,80,80,0,0,40,40);
    /* source-y-start: 0 = omena, 80 = meloni, 160 = seiska, 240 = kirsikka, 320 = rypale */
    

    let image = cnvs.toDataURL('image/png'); /* .replace('image/png','image/octet-stream'); */
    let img = document.createElement('img');
    img.src = image;
    document.querySelector('#omena').appendChild(img);
    
    cntx.clearRect(0,0,40,40);
    kohta = 320;
    cntx.drawImage(pngkuva,0,kohta,80,80,0,0,40,40);

    image = cnvs.toDataURL('image/png');
    img = document.createElement('img');
    img.src = image;
    document.querySelector('#rypale').append(img);

    cntx.clearRect(0,0,40,40);
    kohta = 240;
    cntx.drawImage(pngkuva,0,kohta,80,80,0,0,40,40);

    image = cnvs.toDataURL('image/png');
    img = document.createElement('img');
    img.src = image;
    document.querySelector('#kirsikka').append(img);

}