const arvot = [0,0,0,0]

function pelaa() {
    /* haetaan viimeinen pyoriva rulla ja lisätään siihen eventlistener */
    let viimeinen = '';
    for(let i=1;i<5;i++) {
        if (!document.querySelector('#rulla'+i+'button').classList.contains('active')) {
            viimeinen = '#rulla'+i;
        }
    }
    
    if (!viimeinen == '') {
        document.querySelector(viimeinen).addEventListener('transitionend',siirtyminenPaattyy);
    }
    

    /* pyöritetään rullia */
    document.querySelectorAll('.rulla').forEach((ele, ndx) => {
        arvot[ndx] = pyoritaRullaa(ele, ndx);
    });
}

function pyoritaRullaa(rulla, ndx) {

    /* haetaan rullan edellinen pysähtymiskohta */
    let yPaikka = parseInt(getComputedStyle(rulla).backgroundPositionY);

    let lisays = 0;

    if (!document.querySelector('#rulla'+(ndx+1)+'button').classList.contains('active')) {
        const aikaPerKuva = 100;
    
        /* kaksi kokonaista pyöräytystä + rullan numeron mukainen pyöräytys (--> rullat pysähtyvät järjestyksessä vasemmalta oikealle) */
        /* + arvottu rulla kohta (yksi viidestä) */
        lisays = (2 + ndx) * 5 + Math.round(Math.random() * 5);
    
        rulla.style.transition = 'background-position-y '+ (8 + lisays)*aikaPerKuva + 'ms';
        rulla.style.backgroundPositionY = yPaikka + lisays * 80 + 'px';
    }

    /* palautetaan minkä kuvan kohdalle rulla pysähtyy */
    return (yPaikka/80+lisays)%5;
}

function siirtyminenPaattyy(evnt) {
    
    evnt.target.removeEventListener('transitionend',siirtyminenPaattyy);

    console.log(evnt.target);
}

function tarkistaLukot(src) {
    let lukitut = [];

    document.querySelectorAll('.rullatjanappulat button').forEach((ele,ndx) => {
        if (ele.classList.contains('active')) {
            lukitut.push(ele.id);
        }
    });
    
    if (lukitut.length<3 || lukitut.includes(src.id)) {
        src.classList.toggle('active');
    } else {
        paivitaAlert('Kaikkia rullia ei voi lukita yhtäaikaa!','alert-danger')
    }
    

}

function paivitaAlert(teksti,vari) {
    const alertDiv = document.querySelector('#alrt');

    for (let ln of alertDiv.classList.values()) {
        if (ln.indexOf('alert-') >= 0) {
            alertDiv.classList.remove(ln);
        }
    }

    alertDiv.classList.add(vari);
    document.querySelector('#alrtteksti').innerHTML = teksti;
    /* palauta edellinen alert hetken päästä? */
}

