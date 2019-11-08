function init(lemot) {
    // initialisation des valeurs
    let essaie = 0;
    console.log(lemot);

    //on met les caractère en capital
    lemot = lemot.toUpperCase();
    // mle caractère pour les lettre non trouvé
    let hidChar = "_ ";
    arrLetterWord = lemot.split('');
    // le array des lettres déjà saisie;
    let arrLetterYet = [];
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
        let sendLetter = document.getElementById("userLetter").value.toUpperCase();
        // check si la lettre entrer existe déjà
        let letExistYet = arrLetterYet.indexOf(sendLetter);
        //si la lettre n'a pas encore été proposé
        let ifNum = /[a-zA-Z]/;
        if (ifNum.test(sendLetter)) {
            if (letExistYet < 0) {
                arrLetterYet.push(sendLetter);
                //on check si elle existe dans notre mot
                let letExistInWord = arrLetterWord.indexOf(sendLetter);
                if (letExistInWord >= 0) {
                    for (id in arrLetterWord) {
                        if (arrLetterWord[id] == sendLetter) {
                            arrStringToDisp.splice(id, 1, sendLetter);
                            document.getElementById("userLetter").value = "";
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
                }
            } else {
                letterYet();
                essaie++;
            }
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