const container = document.querySelector('.grille');
const affichage = document.querySelector('h3');
let resultats = 0;
let toutesLesDivs;
let alienInvaders = [];
let tireurPosition = 229;
let directionHoriz = 1;
let directionVert = 20;
let width = 20;

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

function deplacementAlien(){

    console.log("test")

    for (let i = 0; i < alienInvaders.length; i++) {

        if (toutesLesDivs)

        if (alienInvaders < 229) {

            alienInvaders[i] += direction;
            console.log("test2")

        }
        
    }

    setInterval(deplacementAlien, 1000);
    creationGrilleEtAliens();

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

    //deplacementAlien();
    creationGrilleEtAliens();
    deplacementJoueur();

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
