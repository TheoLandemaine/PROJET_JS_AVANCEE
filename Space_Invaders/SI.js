/*
----------------------------------------------------------------------------------------------------------------------
****************************************    DÉCLARATION VARIABLES GLOBALES    ****************************************
----------------------------------------------------------------------------------------------------------------------
*/

// Déclaration des audios
const TIR = new Audio( 'ressources/son-blaster.mp3' );
const FOND = new Audio( 'ressources/fond-sonore.mp3' );
const WIN = new Audio( 'ressources/victory.mp3' );
const LOSE = new Audio( 'ressources/defeat.mp3' );

// Déclaration avec querySelector
const container = document.querySelector('.grille');
const affichage = document.querySelector('h3');

// Déclaration avec l'Id
let restart = document.getElementById('restart');
let lose = document.getElementById('lose');
let win = document.getElementById('win');
let start = document.getElementById('start');

// Déclaration de variables
let resultats = 0;
let toutesLesDivs;
let tireurPosition = 229;
let directionHoriz = 1;
let directionVert = 20;
let width = 20;
let point = 0;
let countTir = 0;

let minute = 0;
let second = 0;
let millisecond = 0;
let cron;

// Déclaration de tableaux
let alienInvaders = [];
let alienDestroy = [];

// Déclaration de boolean
let canShoot = true;
let moveRight = true;
let mouvFin = true;

/*
----------------------------------------------------------------------------------------------------------------------
*******************************************    CRÉATION GRILLE & ALIENS    *******************************************
----------------------------------------------------------------------------------------------------------------------
*/

function creationGrilleEtAliens(){

    let indexAttr = 0;

    for(i = 0; i < 240; i++){                                   // Boucle qui parcout toute la grille

        if(indexAttr === 0){                                    // Si l'index est 0
            const bloc = document.createElement('div');         // Création div 
            bloc.setAttribute('data-left', 'true');             // Attribut data-left à cette div
            container.appendChild(bloc);                        // Création autres div enfants
            indexAttr++;
        } 
        else if(indexAttr === 19){                              // Si l'index est 19
            const bloc = document.createElement('div');         // Création div
            bloc.setAttribute('data-right', 'true');            // Attribut data-right à cette div
            container.appendChild(bloc);                        // Création autres div enfants
            indexAttr = 0;
        } 
        else {
            const bloc = document.createElement('div');         // Création div
            container.appendChild(bloc);                        // Création autres div enfants
            indexAttr++;
        }
    }

    for(i = 1; i < 53; i++ ){                                   // Boucle qui parcout tableau AlienInvaders

        if(i === 13){                                           // Si l'index est 13
            i = 21;                                             // On passe a l'index 21
            alienInvaders.push(i);
        } else if (i === 33){                                   // Si l'index est 33
            i = 41;                                             // On passe à l'index 41
            alienInvaders.push(i);                          
        } else {                                                // Pour tout autre index
            alienInvaders.push(i);
        }
    }
    // console.log(alienInvaders);

    toutesLesDivs = document.querySelectorAll('.grille div');   // QuerySelector pour selectionner toutes les divs de la grille
    
    alienInvaders.forEach(invader => {                          // Pour chaque index du tableau alienInvaders
        toutesLesDivs[invader].classList.add('alien');          // On affiche un nouveau vaisseau ennemi
    })

    toutesLesDivs[tireurPosition].classList.add('tireur');      // Parmi toutes les div on affiche le tireur à sa position
}

/*
----------------------------------------------------------------------------------------------------------------------
**********************************************    DÉPLACEMENT ALIENS    **********************************************
----------------------------------------------------------------------------------------------------------------------
*/

function deplacementAlien(){

    if (mouvFin) {                                                                      // Si on est en parti

        const left = alienInvaders[0] % width === 0                                     // Trouver les murs de gauche avec multples de 20
        const right = alienInvaders[alienInvaders.length - 1] % width === width -1      // Trouver les murs de droites avec taille - 1

        remove();                                                                       // On enleve l'affichage des aliens pour le mouvement

        if (right && moveRight) {                                                       // Si on es sur mur droite + bouge à droite
            for (let i = 0; i < alienInvaders.length; i++) {                            // Pour tout les aliens du tableau
            alienInvaders[i] += directionVert +1                                        // Ajoute 1 à la position de chaque alien + descend
            directionHoriz = -1                                                         // Ce qui permet de bouger à gauche
            moveRight = false                                                           // On arrête de bouger à droite
            }
        }
        
        if (left && !moveRight) {                                                       // Si on est sur mur gauche + ne bouge pas à droite
            for (let i = 0; i < alienInvaders.length; i++) {                            // Pour tout les aliens du tableau
            alienInvaders[i] += directionVert -1                                        // Enlève 1 à la position de chaque alien + descend
            directionHoriz = 1                                                          // Ce qui permet de bouger à droite 
            moveRight = true                                                            // On bouge à droite
            }
        }

        for (let i = 0; i < alienInvaders.length; i++) {                                // Pour tout les alien du tableau
            alienInvaders[i] += directionHoriz;                                         // On utilise la direction précisée précédemment
        
            let filtre = alienDestroy.includes(i);                                      // Filtre pour différencier aliens entre 2 tableaux
            if (filtre == false) {                                                      // Si alien est dans 1 seul tableau
                toutesLesDivs[alienInvaders[i]].classList.add('alien');                 // On affiche les aliens en question
            }
        }

        setTimeout(deplacementAlien, 1000);                                             // Délais de 1 secondes pour voir déplacement
        defaite();                                                                      // On appelle la fonction de la défaite
    }
}

/*
----------------------------------------------------------------------------------------------------------------------
**********************************************    DÉPLACEMENT JOUEUR    **********************************************
----------------------------------------------------------------------------------------------------------------------
*/

function deplacementJoueurLeft() {                                                      // Si on veut aller vers la gauche
    if (mouvFin) {                                                                      // Si on est en parti
        // console.log("left");
        toutesLesDivs[tireurPosition].classList.remove('tireur');                       // On efface le tireur
        
        tireurPosition -= 1;                                                            // On enlève 1 à sa position
        // console.log(tireurPosition);

        toutesLesDivs[tireurPosition].classList.add('tireur');                          // On affiche de nouveau le tireur
    }
}

function deplacementJoueurRight() {                                                     // Si on veut aller vers la droite
    if (mouvFin) {
        // console.log("right");
        toutesLesDivs[tireurPosition].classList.remove('tireur');                       // On efface le tireur
        
        tireurPosition += 1;                                                            // On ajoute 1 à sa position
        // console.log(tireurPosition);

        toutesLesDivs[tireurPosition].classList.add('tireur');                          // On affiche de nouveau le tireur
    }
}

function deplacementJoueur() {                                                          // Fonction pour tout les déplacements du tireur

    document.onkeydown = function(e) {                                                  // Quand on enfonce une touche du clavier

        switch (e.key) {                                                                
            case "ArrowLeft":                                                           // Si flèche de gauche pressée
                if (tireurPosition > 180 && tireurPosition <= 199) {                    // Limite de position pour 3e ligne
                    defaite();
                    deplacementJoueurLeft();
                }else if (tireurPosition > 200 && tireurPosition <= 219) {              // Limite de position pour 2e ligne
                    defaite();  
                    deplacementJoueurLeft();
                }else if (tireurPosition > 220 && tireurPosition <= 239) {              // Limite de position pour 1ère ligne
                    defaite();
                    deplacementJoueurLeft();
                }
                break;
            
            case "ArrowRight":                                                          // Si flèche de droite pressée
                if (tireurPosition >= 180 && tireurPosition < 199) {                    // Limite pour 3e ligne
                    defaite();
                    deplacementJoueurRight();                                           
                }else if (tireurPosition >= 200 && tireurPosition < 219) {              // Limite pour 2e ligne
                    defaite();
                    deplacementJoueurRight();
                }else if (tireurPosition >= 220 && tireurPosition < 239) {              // Limite pour 1ère ligne
                    defaite();
                    deplacementJoueurRight();
                }
                break;
        
            case "ArrowUp":                                                             // Si flèche du haut pressée
                if (tireurPosition >= 200 && tireurPosition < 240) {                    // Limite pour les 3 lignes
                    defaite();

                    if (mouvFin) {
                        // console.log("up");
                        toutesLesDivs[tireurPosition].classList.remove('tireur');       // On enlève le tireur
                        
                        tireurPosition -= directionVert;                                // On enlève la directionVert au tireur
                        // console.log(tireurPosition);

                        toutesLesDivs[tireurPosition].classList.add('tireur');          // On affiche de nouveau le tireur
                    }
                }
                
                break;

            case "ArrowDown":                                                           // Si flèche du bas pressée
                if (tireurPosition >= 180 && tireurPosition < 220) {
                    defaite();

                    if (mouvFin) {
                        // console.log("down");
                        toutesLesDivs[tireurPosition].classList.remove('tireur');       // On enlève le tireur
                        
                        tireurPosition += directionVert;                                // On ajoute la directionVert au tireur
                        // console.log(tireurPosition);

                        toutesLesDivs[tireurPosition].classList.add('tireur');          // On affiche de nouveau le tireur
                    }       
                }
                break;
        }
    };
}

/*
-----------------------------------------------------------------------------------------------------------------------
*************************************************    CONDITION FIN    *************************************************
-----------------------------------------------------------------------------------------------------------------------
*/

function defaite() {                                                        // Fonction pour la condition de défaite
    
    for (let i = 0; i < alienInvaders.length; i++) {                        // Pour tout les aliens du tableau
        // console.log("tireur = " + tireurPosition);
        // console.log("alien = " + alienInvaders[i]);

        if ((tireurPosition) == alienInvaders[i]) {                         // Si l'index du tireur est le même qu'un des aliens
            remove();                                                       // On appelle la fonction remove()
            lose.style.opacity = 1;                                         // On affiche le message de défaite
            restart.style.opacity = 1;                                      // On affiche le bouton de restart

            toutesLesDivs[tireurPosition].classList.remove('tireur');       // On enlève le tireur
            mouvFin = false;                                                // On arrête tout les mouvements
            pauseTimer();                                                   // On pause le timer

            FOND.pause();                                                   // On arrête la musique de fond

            LOSE.volume = 0.1;                                              // On règle le volume de la musique 
            LOSE.play();                                                    // On lance la musique de défaite
            LOSE.loop = true;                                               // On répète la musique en boucle 
        }
    }
}

function victoire() {                                                       // Fonction pour la condition de victoire

    if (point == 3600) {                                                    // Si les points sont égaux à 3600
        remove();                                                           
        win.style.opacity = 1;                                              // On affiche le texte de victoire
        restart.style.opacity = 1;                                          // On affiche le bouton restart

        toutesLesDivs[tireurPosition].classList.remove('tireur');           // On enlève le tireur 
        mouvFin = false;                                                    // On arrête tout les mouvements
        pauseTimer();                                                       // On pause le timer

        FOND.pause();                                                       // On arrête la musique de fond 

        WIN.volume = 0.1;                                                   // On règle le volume de la musique 
        WIN.play();                                                         // On lance la musique de victoire
        WIN.loop = true;                                                    // On répète la musique en boucle
    }       
}

/*
-----------------------------------------------------------------------------------------------------------------------
*****************************************************    TIMER    *****************************************************
-----------------------------------------------------------------------------------------------------------------------
*/

function timer() {                                                              // Fonction pour le timer
    if ((millisecond += 1) == 100) {                                            // Si millisecondes == 100
        millisecond = 0;                                                        // On remet les millisecondes à 0
        second++;                                                               // On ajoute 1 aux secondes
    }
    if (second == 60) {                                                         // Si secondes = 60
        second = 0;                                                             // On remet les secondes à 0
        minute++;                                                               // On ajoute 1 aux minutes
    }   

    document.getElementById('minute').innerText = returnDataTimer(minute);      // On remplace le html par le compteur des minutes
    document.getElementById('second').innerText = returnDataTimer(second);      // On remplace le html par le compteur des secondes
}

function startTimer() {                                                         // Fonction pour lancer le timer
    cron = setInterval(() => {                                                  // On setInterval pour actualiser le timer 
        timer();
    }, 10);
    // console.log("time start")
}

function pauseTimer() {                                                         // Fonction pour arrêter le timer
    clearInterval(cron);                                                        // On fait un clearInterval de cron
    // console.log("time pause")
}

function resetTimer() {                                                         // Fonction pour reset le timer

    minute = 0;                                                                 // On remet minute à 0
    second = 0;                                                                 // On remet seconde à 0

    document.getElementById('minute').innerText = '00';                         // On remplace le html par 00 pour les minutes
    document.getElementById('second').innerText = '00';                         // On remplace le html par 00 pour les secondes

    clearInterval(cron);                                                        // On fait un clearInterval de cron

    // console.log("time reset")
}


function returnDataTimer(input) {                                               // Fonction pour l'affichage du timer
    return input > 9 ? input : `0${input}`                                      // Si nombre < 9, alors on met un 0 avant
}

/*
----------------------------------------------------------------------------------------------------------------------
***********************************************    AUTRES FONCTIONS    ***********************************************
----------------------------------------------------------------------------------------------------------------------
*/

function game() {                                                           // Fonction pour lancer une partie
    FOND.volume = 0.1;                                                      // On règle le volume de la musique
    FOND.play();                                                            // On lance la musique de fond
    FOND.loop = true;                                                       // On répète la musique en boucle

    deplacementAlien();                                                     // On appelle la fonction de déplacement des aliens
    creationGrilleEtAliens();                                               // On appelle la fonction de création de la grille et des aliens
    deplacementJoueur();                                                    // On appelle la fonction de déplacement du tireur
    
    start.remove();                                                         // On remove le bouton start
    mouvFin = true;                                                         // On peut faire des mouvements aliens / tireur
    startTimer();                                                           // On lance le timer
}

function remove() {                                                         // Fonction pour enlever les aliens
    for (let i = 0; i < alienInvaders.length; i++) {                        // Pour tout les aliens du tableau
        toutesLesDivs[alienInvaders[i]].classList.remove('alien')           // On enlève les aliens
    }
}

/*
----------------------------------------------------------------------------------------------------------------------
**********************************************    ADD EVENT LISTENER    **********************************************
----------------------------------------------------------------------------------------------------------------------
*/

document.addEventListener("keydown", function(e) {                                              // Quand on presse du touche
    let laserPosition = tireurPosition;                                                         // On donne à laserPosition la valeur de tireurPosition

    // console.log(canShoot + " 1");
    
    if (canShoot == true) {                                                                     // Si on peut tirer
        
        function laser() {                                                                      // Fonction pour le laser
            canShoot = false;                                                                   // On passe le boolean en false
            // console.log(canShoot + " 2");
            toutesLesDivs[laserPosition].classList.remove('laser');                             // On enlève le laser lorsqu'il avance pour le mouvement
            
            // console.log("tireur = " + tireurPosition)
            // console.log("laser = " + laserPosition)
        
            laserPosition -= width;                                                             // On lui enlève la valeur de la largeur de la grille
            // console.log(laserPosition);
        
            toutesLesDivs[laserPosition].classList.add('laser');                                // On affiche de nouveau le laser 
        
            // for (let i = 0; i < alienInvaders.length; i++) {
                // console.log("laser = " + laserPosition)
                // console.log("alien = " + alienInvaders[i])
    
            if (toutesLesDivs[laserPosition].classList.contains("alien")) {                     // Si laserPosition contient la classe alien
                // console.log(canShoot + " 3");
                clearInterval(interval);                                                        // On fait un clearInterval pour stopper le laser

                point += 100;                                                                   // On ajoute 100 au compteur de point

                const positionAlienDetroy = alienInvaders.indexOf(laserPosition);               // On déclare une const pour récup l'index du vaisseau ennemi par rapport a laserPosition
                alienDestroy.push(positionAlienDetroy);                                         // On push la valeur de positionAlienDetroy dans alienDestroy
                // console.log(test)
                // console.log(alienDestroy)

                toutesLesDivs[laserPosition].classList.remove('alien')                          // On enlève le vaisseau qui est sur le laser
                toutesLesDivs[laserPosition].classList.remove('laser');                         // On enlève ce même laser
                toutesLesDivs[laserPosition].classList.add('boom');                             // On ajoute le boom à la place du laser
                
                setTimeout(() => {toutesLesDivs[laserPosition].classList.remove('boom')}, 100)  // On fait un setTimeout pour enlever le boom

                document.querySelector("h3").innerHTML = `Scores : ${point}`;                   // On actualise le score
                victoire()                                                                      // On appelle la fonction de victoire

            }else if (laserPosition >= 0 && laserPosition <= 19) {                              // Si le laser se trouve dans la 1ère ligne 
                clearInterval(interval);                                                        // On stop le laser
                toutesLesDivs[laserPosition].classList.remove('laser');                         // On l'enlève

                // console.log("ARRET MISSILE")                    
                canShoot = true;                                                                // On repasse le boolean en true
            }
            // }
        }
        // console.log(canShoot + " 4");

        if (e.key === " ") {                                                                    // Si la touche pressée est espace

            if (canShoot == true) {                                                             // Si on peut tirer
                TIR.play();                                                                     // On lance la musique de tir
                TIR.volume = 0.2;                                                               // On règle le volume du son
            }
            
            interval = setInterval(() => {laser()}, 100);                                       // On déclare un interval pour le mouvement du tir
            setTimeout(() => {canShoot = true}, 1000);                                          // On fait un setTimeout pour tirer toutes les secondes
        }
    }
})

document.getElementById('restart').addEventListener('click', function(e) {                      // Quand on appuie sur restart
    location.reload();                                                                          // On efface tout
    restart.style.opacity = 0;                                                                  // On efface le bouton restart
    lose.style.opacity = 0;                                                                     // On efface le message de défaite
    win.style.opacity = 0;                                                                      // On efface le message de victoire

    let startButton = document.createElement("button");                                         // On recréé un bouton start
    startButton.setAttribute('id', 'start');                                                    // On lui attribue l'id start
    document.body.appendChild(startButton);                                                     // On le créé dans le body
    resetTimer();                                                                               // On appelle la fonction de resetTimer
})

document.getElementById('start').addEventListener('click', function(e){                         // Quand on appuie sur le bouton start
    game();                                                                                     // On appelle la fonction qui lance une partie
})              

/*
-----------------------------------------------------------------------------------------------------------------------
**************************************************    ANCIEN CODE    **************************************************
-----------------------------------------------------------------------------------------------------------------------
*/

// document.getElementById('start').addEventListener('click', function(e){
//     alert('Start')
//     const grid = document.querySelector('.grille')
    
//     for(let i= 0; i <= 195; i++) {
//         const cell = document.createElement('div');

//         cell.style.width = "35px";
//         cell.style.height = "35px";

//         grid.appendChild(cell);
//     }

//     const cells = Array.from(document.querySelectorAll('.grille div'));

//     var alliensI = [
//         0,1,2,3,4,5,6,7,8,9,
//         14,15,16,17,18,19,20,21,22,23,
//         28,29,30,31,32,33,34,35,36,37
//     ];

//     function alien(){
        
//         for (let i=0; i < alliensI.length; i++) {
//             cells[alliensI[i]].classList.add('alien')
            
//         }
//     }

//     alien();

//     cells[189].classList.add('tireur')

//     deplacementAlien();


//     function deplacementAlien() {

//         console.log('test');

//         for (let i = 0; i < 4; i++) {

//             console.log("premiere boucle")

//             for (let j = 0; j < alliensI.length; j++) {

//                 console.log("deuxieme boucle")

//                 //alliensI[j] = alliensI[j+1];
                
//                 //cells[j+1].classList.add('alien');
//                 // cells[alliensI[j]].classList.remove('alien');
//             }
//         }
            
//     }

// })



//function defaiteVert() {
    
    //     for (let i = 0; i < alienInvaders.length; i++) {
    //         console.log("tireur = " + tireurPosition);
    //         console.log("alien = " + alienInvaders[i]);
    
    //         if ((tireurPosition-20) == alienInvaders[i]) {
    //             alert("defaite");
    //         }
    //     }
    
    // }
    
    // function defaiteHoriz() {
        
    //     for (let i = 0; i < alienInvaders.length; i++) {
    //         console.log("tireur = " + tireurPosition);
    //         console.log("alien = " + alienInvaders[i]);
    
    //         if ((tireurPosition-1) == alienInvaders[i]) {
    //             alert("defaite");
    //         }
    //     }
    
    //     // creationGrilleEtAliens();
        
    //     // let defaite = document.querySelectorAll(".tireur");
        
    //     // if (defaite.style.transform == ("rotate(180deg)")) {
    //     //     console.log("lose")
    //     // }
    // }