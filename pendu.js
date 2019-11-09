// initialisation
function init() {
    //tabLetterToFind = ['B', 'O', 'N', 'J', 'O', 'U', 'R'];
    console.log(tabLetterToFind);
    word = tabLetterToFind.reduce((a, b) => a + b);
    dictionnaire = [];
    tabUserLetter = [];
    essai = 0;
    nbLetToFind = tabLetterToFind.length;
    patternToReturn = [];
    patternToReturn.length = tabLetterToFind.length;
    pattern = /^[a-zA-Z]/;
    targetPos = document.getElementById("mot");
    targetPos.innerHTML = "";
    initWord();
}

function initWord() {
    for (letter in tabLetterToFind) {
        patternToReturn[letter] = ('_');
    }
    //on affiche le tout
    for (elem of patternToReturn) {
        targetPos.innerHTML += elem + " ";
    }
}

function updateWord() {
    aff = "";
    for (letter in patternToReturn) {
        aff += patternToReturn[letter] + " ";
    }
    targetPos.innerHTML = aff;
    if (nbLetToFind == 0) {
        alert(`Bravo vous avez trouvez le mot ${word}en ${essai} essaie(s)`)
            //init();
    }
}
// evenement bouton
document.getElementById("send").addEventListener("click", () => {
    let letterUser = document.getElementById("userLetter").value.toLowerCase();
    let existe = tabUserLetter.indexOf(letterUser);
    if (existe < 0) {
        pattern = /[a-z A-Z]/;
        let stringOrNot = pattern.test(letterUser);
        if (stringOrNot) {
            for (let1 in tabLetterToFind) {
                if (tabLetterToFind[let1] == letterUser) {
                    patternToReturn.splice(let1, 1, letterUser);
                    nbLetToFind--;
                    //alert("tu as trouvé une lettre");
                    updateWord();

                }
            }
        }
        essai++;
    }
});
document.getElementById("renew").addEventListener("click", () => {
    choiceWord();
});


async function choiceWord() {
    const reponse = await fetch("dico.json")
        .then(function(reponse) {
            reponse.json().then(function(data) {
                //console.log(data);
                wordNum = Math.floor(Math.random() * data.length);
                theWord = data[wordNum];
                tabLetterToFind = theWord.split('');
                //console.log(tabLetterToFind);
                for (letterIn in tabLetterToFind) {
                    let val = tabLetterToFind[letterIn];
                    if ((val == "é") || (val == "è") || (val == "ê") || (val == "ë")) {
                        tabLetterToFind.splice(letterIn, 1, "e")
                    } else if ((val == "à") || (val == "â") || (val == "ä") || (val == "á") || (val == "à")) {
                        tabLetterToFind.splice(letterIn, 1, "a");
                    } else if ((val == "ü") || (val == "û") || (val == "ù") || (val == "ú")) {
                        tabLetterToFind.splice(letterIn, 1, "u");
                    } else if ((val == "ô") || (val == "ö") || (val == "ó") || (val == "ò")) {
                        tabLetterToFind.splice(letterIn, 1, "o");
                    } else if ((val == "ï") || (val == "î")) {
                        tabLetterToFind.splice(letterIn, 1, "i");
                    };
                }
                tabLetterToFind = tabLetterToFind;
                init();
            })
        })
}
choiceWord();
