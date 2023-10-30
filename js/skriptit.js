const arvot = [0,0,0,0];
let ekaKierros = true, rahat = 50, panos;

function pelaa() {
    panos = document.querySelector('#panos').value;

    if (rahat-panos >= 0) { /* riittääkö rahat pelaamiseen nykyisellä panoksella? */
        /* vähennetään panos rahoista ja päivitetään rahamäärä */
        rahat -= panos;
        document.querySelector('#rahamaara').innerText = rahat + ' €';
        /*  */
        document.querySelector('#pelaabutton').disabled = true;

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
        
        paivitaAlert('','alert-light',false);

        /* pyöritetään rullia */
        document.querySelectorAll('.rulla').forEach((ele, ndx) => {
            arvot[ndx] = pyoritaRullaa(ele, ndx);
        });

    } else {
        /* panos on liian suuri jäljellä olevaan rahamäärään verrattuna  */
        paivitaAlert('Panos on suurempi kuin jäljellä olevat rahat!','alert-danger',true);
    }
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

    /* palautetaan tieto, minkä kuvan kohdalle rulla pysähtyy */
    return (yPaikka/80+lisays)%5;
}

function siirtyminenPaattyy(evnt) {

    /* poistetaan tämä eventlistener */
    evnt.target.removeEventListener('transitionend',siirtyminenPaattyy);
    /* sallitaan pelaa-napin käyttö */
    document.querySelector('#pelaabutton').disabled = false;

    /*  tarkasta tuliko voittoa */
    let lkm = 0, voitto = 0, voittotaulukko = [6,4,3,10,5];
    for (let i=0;i<5;i++) { /* käydään läpi rullan eri kuvat */
        lkm = 0;
        for (luku of arvot) { /* käydään läpi kaikki rullat */
            lkm = (luku == i) ? lkm + 1 : lkm;
        }
        voitto = (i == 3 && lkm == 3) ? 5 : (lkm == 4) ? voittotaulukko[i] : 0;
        if (voitto != 0) { break; }
        
    }

    if (voitto != 0) {
        paivitaAlert('Voitit '+(voitto*panos)+'€!','alert-success',true);
        rahat += voitto*panos;
        document.querySelector('#rahamaara').innerText = rahat + ' €';
    } else { /* ei voittoa */
        paivitaAlert('Ei voittoa','alert-light',false)
    }

    /*
    0 = omena
    1 = rypale
    2 = kirsikka
    3 = seiska
    4 = meloni
    */

    if (ekaKierros && voitto == 0) {
        ekaKierros = false;
        document.querySelectorAll('.rullatjanappulat button').forEach((ele) => {
            ele.disabled = false;
        });
    
    } else {
        ekaKierros = true;
        /* lukitse-nappulat pois käytöstä */
        document.querySelectorAll('.rullatjanappulat button').forEach((ele) => {
            ele.disabled = true;
            ele.classList.remove('active');
            ele.innerText = 'Lukitse';
        });

    }
}

function tarkistaLukot(src) {
    let lukitut = [];

    document.querySelectorAll('.rullatjanappulat button').forEach((ele) => {
        if (ele.classList.contains('active')) {
            lukitut.push(ele.id);
        }
    });
    
    if (lukitut.length<3 || lukitut.includes(src.id)) {
        src.classList.toggle('active');
        src.innerText = (src.innerText == 'Lukitse') ? 'Lukittu' : 'Lukitse';
    } else {
        paivitaAlert('Kaikkia rullia ei voi lukita yhtäaikaa!','alert-danger',true)
    }
    

}

let vanhaAlert = {teksti: '', vari: ''};

function poistaVanhaLuokka() {
    const alertDiv = document.querySelector('#alrt');
    let vanhaVari = '';

    for (let ln of alertDiv.classList.values()) {
        if (ln.indexOf('alert-') >= 0) {
            vanhaVari = ln;
            alertDiv.classList.remove(ln);
        }
    }

    return vanhaVari;
}

function paivitaAlert(teksti,vari,palautaNykyinen) {

    vanhaAlert.teksti = document.querySelector('#alrtteksti').innerText;
    vanhaAlert.vari = poistaVanhaLuokka();

    document.querySelector('#alrt').classList.add(vari);
    if (teksti != '') {
        document.querySelector('#alrtteksti').innerText = teksti;
        document.querySelector('#alrtteksti').style.opacity = 1;
    } else {
        document.querySelector('#alrtteksti').innerText = '#';
        document.querySelector('#alrtteksti').style.opacity = 0;
    }
    

    if (palautaNykyinen) {
        setTimeout(palautaAlert,2000);
    }
}

function palautaAlert() {
    poistaVanhaLuokka();
    document.querySelector('#alrt').classList.add(vanhaAlert.vari);
    document.querySelector('#alrtteksti').innerText = vanhaAlert.teksti;

    if (vanhaAlert.teksti == '#') {
        document.querySelector('#alrtteksti').style.opacity = 0;
    }
    
}
