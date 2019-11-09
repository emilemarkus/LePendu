function init(lemot) {
    // initialisation des valeurs
    essaie = 0;
    console.log(lemot);
    error = 0;
    //on met les caractère en capital
    lemot = lemot.toUpperCase();
    // mle caractère pour les lettre non trouvé
    hidChar = "_ ";
    arrLetterWord = lemot.split('');
    // le array des lettres déjà saisie;
    arrLetterYet = [];
    // la variable a afficher et updater pour l'affichage du mot
    arrStringToDisp = new Array(lemot.length);
    // on remplit le tableau initial avec les caractere cacher
    arrStringToDisp.fill(hidChar);
    // et on affiche  la string de départ
    domTarget = document.getElementById("mot");
    domTarget.innerHTML = arrStringToDisp.join(' ');

    /*  base de test */





    //ecoute des touches 
    document.getElementById("send").addEventListener("click", () => {
        console.log(arrLetterYet);
        sendLetter = document.getElementById("userLetter").value.toUpperCase();
        // check si la lettre entrer existe déjà
        letExistYet = arrLetterYet.indexOf(sendLetter);
        //si la lettre n'a pas encore été proposé
        if (letExistYet < 0) {
            arrLetterYet.push(sendLetter);
            //on check si elle existe dans notre mot
            letExistInWord = arrLetterWord.indexOf(sendLetter);
            if (letExistInWord >= 0) {
                for (id in arrLetterWord) {
                    if (arrLetterWord[id] == sendLetter) {
                        arrStringToDisp.splice(id, 1, sendLetter);
                        essaie++;
                        updateDomTarget();
                        //checker si fin du mot ou pas
                        let findWord = arrStringToDisp.indexOf('_ ');
                        if (findWord < 0) {
                            domTarget.style.color = "green";
                            alert(`Bravo, vous avez trouvez le mot ${lemot} en ${essaie} essaie(s)`);

                        }
                    }
                }
            } else {
                essaie++;
                error++;
                (error == 1) ? document.getElementById("pot1").style.display = "block": error = error;
                (error == 2) ? document.getElementById("pot2").style.display = "block": error = error;
                (error == 3) ? document.getElementById("pot3").style.display = "block": error = error;
                (error == 4) ? document.getElementById("head").style.display = "block": error = error;
                (error == 5) ? document.getElementById("body").style.display = "block": error = error;
                (error == 6) ? document.getElementById("leftHand").style.display = "block": error = error;
                (error == 7) ? document.getElementById("rightHand").style.display = "block": error = error;
                (error == 8) ? document.getElementById("leftFeet").style.display = "block": error = error;
                (error == 9) ? document.getElementById("rightFeet").style.display = "block": error = error;
                (error == 10) ? document.getElementById("Anten1").style.display = "block": error = error;
                (error == 11) ? document.getElementById("Anten2").style.display = "block": error = error;


            }
        } else {
            letterYet();
            essaie++;
        }
    });
    document.getElementById("renew").addEventListener("click", () => {
        choiceWord();
    })
}

function updateDomTarget() {
    domTarget.innerHTML = arrStringToDisp.join(' ');
}

function letterYet() {
    mess = document.getElementById("echange");
    setTimeout((fadeOut), 1);
    setTimeout((deja), 1000);
    setTimeout((fadeOut), 2100)
    setTimeout((fadeIn), 3100);

    function fadeOut() {
        mess.style.opacity = 0;
    }

    function deja() {
        mess.innerHTML = "Déjà proposé";
        mess.style.color = "red";
        mess.style.opacity = 1;
    }

    function fadeIn() {
        mess.innerHTML = "Essayez encore ;)";
        mess.style.color = "black";
        mess.style.opacity = 1;
    }
}
async function choiceWord() {
    const reponse = await fetch("dico.json")
        .then(function(reponse) {
            reponse.json().then(function(data) {
                let num = Math.floor(Math.random() * data.length);
                lemot = data[num];
                // on normalize les accents
                lemot = lemot.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
                init(lemot);
            });
        });
}


choiceWord();