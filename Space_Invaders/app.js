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

    remove()
    console.log("test")


    for (let i = 0; i < alienInvaders.length; i++) {
        alienInvaders[i] += directionHoriz;
        toutesLesDivs[alienInvaders[i]].classList.add('alien');
        console.log("test2")
    }

    setInterval(deplacementAlien, 1000);

}

function deplacementJoueur() {

    document.onkeydown = function(e) {

        switch (e.key) {
            case "ArrowLeft":       // Left pressed
                console.log("left");
                toutesLesDivs[tireurPosition].classList.remove('tireur');
                
                tireurPosition -= directionHoriz;
                console.log(tireurPosition);

                toutesLesDivs[tireurPosition].classList.add('tireur');

                break;
            
            case "ArrowRight":      // Right pressed
                console.log("rigth");
                toutesLesDivs[tireurPosition].classList.remove('tireur');

                tireurPosition += directionHoriz;
                console.log(tireurPosition);

                toutesLesDivs[tireurPosition].classList.add('tireur');

                break;
        
            case "ArrowUp":         // Up pressed
                console.log("up");
                toutesLesDivs[tireurPosition].classList.remove('tireur');
                
                tireurPosition -= directionVert;
                console.log(tireurPosition);

                toutesLesDivs[tireurPosition].classList.add('tireur');
                
                break;

            case "ArrowDown":       // Down pressed
                console.log("down");
                toutesLesDivs[tireurPosition].classList.remove('tireur');

                tireurPosition += directionVert;
                console.log(tireurPosition);

                toutesLesDivs[tireurPosition].classList.add('tireur');
                
                break;
        }
    };

}



document.getElementById('start').addEventListener('click', function(e){

    deplacementAlien();
    deplacementJoueur();

})

creationGrilleEtAliens();





