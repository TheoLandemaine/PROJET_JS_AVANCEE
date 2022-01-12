var cartesDoubleF = document.querySelectorAll(".double-face");
let carte = document.querySelectorAll(".carte");

let carteRetourne = false;
let pCarte, sCarte;

// function flipCarte(){
//     this.classList.toggle("active");

// if (!carteRetourne){
//     carteRetourne = true;
//     // pCarte = this;
// }else{
//     carteRetourne = false;
//     // sCarte = this;
// }


// }


// function checkCarteMatch(){

// }

// function getCarteAttr(){

//     if (!carteRetourne){
//         carteRetourne = true;
//         // pCarte = this.getAttribute("data-attr");
//         console.log(this.getAttribute("data-attr"));

//     }

//     checkCarteMatch();
// }

// carte.forEach(cartes => cartes.addEventListener('click', getCarteAttr));
// cartes.forEach(card => card.addEventListener('click', function(){
//     this.classList.toggle("active");

//     if (!carteRetourne){
//         carteRetourne = true;
//         pCarte = this;
//     }else{
//         carteRetourne = false;
//         sCarte = this;
//         cartelog = this.getAttribute("data-attr");
//         console.log(cartelog)
//     }
// }));

carte.forEach(card => card.addEventListener('click', toggleCards))
cartesDoubleF.forEach(card => card.addEventListener('click', setActive))


function setActive(){
    this.classList.add("active");
}

function removeActive(){
    pCarte.childNodes[1].classList.remove("active")
    sCarte.childNodes[1].classList.remove("active")
}

function toggleCards() {

    if (!carteRetourne) {
        carteRetourne = true;
        pCarte = this;
        // console.log("Premiere : " + pCarte.getAttribute("data-attr"))
    } else {
        carteRetourne = false;
        sCarte = this;
        // console.log("Deuxieme : " + sCarte.getAttribute("data-attr"))
        correspondence();
    }

}

function correspondence(){
    if (pCarte.getAttribute("data-attr") === sCarte.getAttribute("data-attr")) {
        pCarte.removeEventListener("click",toggleCards)
        sCarte.removeEventListener("click",toggleCards)
        console.log("match")
    }else{
        setTimeout(removeActive,1500)
        console.log(pCarte.childNodes)
        console.log("cards dont match")
    }
}



function debuger(){
    console.log("debug")
}

