const container = document.querySelector('.grille');
const affichage = document.querySelector('h3');
let resultats = 0;
let toutesLesDivs;
let alienInvaders = [];
let tireurPosition = 229;
let directionHoriz = 1;
let directionVert = 20;
let width = 20;
let moveRight = true;

function creationGrilleEtAliens(){

    let indexAttr = 0;

    for(i = 0; i < 240; i++){

        if(indexAttr === 0){
            const bloc = document.createElement('div');
            bloc.setAttribute('data-left', 'true');
            container.appendChild(bloc);
            indexAttr++;
        } 
        else if(indexAttr === 19){
            const bloc = document.createElement('div');
            bloc.setAttribute('data-right', 'true');
            container.appendChild(bloc);
            indexAttr = 0;
        } 
        else {
            const bloc = document.createElement('div');
            container.appendChild(bloc);
            indexAttr++;
        }

    }


    for(i = 1; i < 53; i++ ){

      if(i === 13){
          i = 21;
          alienInvaders.push(i);
      } else if (i === 33){
          i = 41;
          alienInvaders.push(i);
      } else {
          alienInvaders.push(i);
      }

    }
    console.log(alienInvaders);

    toutesLesDivs = document.querySelectorAll('.grille div');
    alienInvaders.forEach(invader => {
        toutesLesDivs[invader].classList.add('alien');
    })

    toutesLesDivs[tireurPosition].classList.add('tireur');

}

function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
        toutesLesDivs[alienInvaders[i]].classList.remove('alien')
    }
  }

function deplacementAlien(){
    const left = alienInvaders[0] % width === 0
    const right = alienInvaders[alienInvaders.length - 1] % width === width -1
           

    remove();

    if (right && moveRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
          alienInvaders[i] += directionVert +1
          directionHoriz = -1
          moveRight = false
        }
      }
    
      if(left && !moveRight) {
        for (let i = 0; i < alienInvaders.length; i++) {
          alienInvaders[i] += directionVert -1
          directionHoriz = 1
          moveRight = true
        }
      }

    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += directionHoriz;
        toutesLesDivs[alienInvaders[i]].classList.add('alien');

        
    }

    setTimeout(deplacementAlien, 1000);

}

function deplacementJoueurLeft() {
    console.log("left");
    toutesLesDivs[tireurPosition].classList.remove('tireur');
    
    tireurPosition -= directionHoriz;
    console.log(tireurPosition);

    toutesLesDivs[tireurPosition].classList.add('tireur');
}

function deplacementJoueurRight() {
    console.log("right");
    toutesLesDivs[tireurPosition].classList.remove('tireur');
    
    tireurPosition += directionHoriz;
    console.log(tireurPosition);

    toutesLesDivs[tireurPosition].classList.add('tireur');
}

function deplacementJoueur() {
    // defaite();

    // const bloc = document.createElement('div');

    document.onkeydown = function(e) {

        switch (e.key) {
            case "ArrowLeft":       // Left pressed
                if (tireurPosition > 0 && tireurPosition <= 199) { 
                    defaiteHoriz();
                    deplacementJoueurLeft();
                }else if (tireurPosition > 200 && tireurPosition <= 219) { 
                    defaiteHoriz();
                    deplacementJoueurLeft();
                }else if (tireurPosition > 220 && tireurPosition <= 240) {
                    defaiteHoriz();
                    deplacementJoueurLeft();
                }
                break;
            
            case "ArrowRight":      // Right pressed
                if (tireurPosition >= 0 && tireurPosition < 199) { 
                    defaiteHoriz();
                    deplacementJoueurRight();
                }else if (tireurPosition >= 200 && tireurPosition < 219) { 
                    defaiteHoriz();
                    deplacementJoueurRight();
                }else if (tireurPosition >= 220 && tireurPosition < 239) {
                    defaiteHoriz();
                    deplacementJoueurRight();
                }
                break;
        
            case "ArrowUp":         // Up pressed
                if (tireurPosition >= /*200*/10 && tireurPosition < 240) {
                    defaiteVert();

                    console.log("up");
                    toutesLesDivs[tireurPosition].classList.remove('tireur');
                    
                    tireurPosition -= directionVert;
                    console.log(tireurPosition);

                    toutesLesDivs[tireurPosition].classList.add('tireur');

                }
                
                break;

            case "ArrowDown":       // Down pressed
                if (tireurPosition >= 180 && tireurPosition < 220) {
                    defaiteVert();

                    console.log("down");
                    toutesLesDivs[tireurPosition].classList.remove('tireur');
                    
                    tireurPosition += directionVert;
                    console.log(tireurPosition);

                    toutesLesDivs[tireurPosition].classList.add('tireur');

                }
                break;
        }
    };

}

function defaiteVert() {
    
    for (let i = 0; i < alienInvaders.length; i++) {
        console.log("tireur = " + tireurPosition);
        console.log("alien = " + alienInvaders[i]);

        if ((tireurPosition-20) == alienInvaders[i]) {
            alert("defaite");
        }
    }

}

function defaiteHoriz() {
    
    for (let i = 0; i < alienInvaders.length; i++) {
        console.log("tireur = " + tireurPosition);
        console.log("alien = " + alienInvaders[i]);

        if ((tireurPosition-1) == alienInvaders[i]) {
            alert("defaite");
        }
    }

    // creationGrilleEtAliens();
    
    // let defaite = document.querySelectorAll(".tireur");
    
    // if (defaite.style.transform == ("rotate(180deg)")) {
    //     console.log("lose")
    // }
}

document.getElementById('start').addEventListener('click', function(e){

    deplacementAlien();
    creationGrilleEtAliens();
    deplacementJoueur();
    // defaite();

})




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



