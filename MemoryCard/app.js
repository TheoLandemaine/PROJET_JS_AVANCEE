var cartesDoubleF = document.querySelectorAll(".double-face");
let carte =         document.querySelectorAll(".carte");
let arriere =       document.querySelectorAll(".arriere");
var btnRset =       document.createElement("BUTTON");
btnRset.setAttribute("id", "btn-rset")
var btnStart =      document.createElement("button");
var grille =        document.querySelector('.grille');


let carteRetourne = false;
let pCarte, sCarte;
let cardSelected =  false;
let count =         0;



// For loop to change cards image
for (i = 0; i < arriere.length; i++) {
    arriere[i].style.backgroundImage = "url('./ressources/img/purple-card.jpg')";
    arriere[i].style.backgroundPosition = "center";
    arriere[i].style.backgroundSize = "cover";
}

// Button to restart the game
btnRset.addEventListener('click', () => { // Ajoute un écouteur d'événement au bouton
    notifications("The game is ready")
    document.getElementById("btn-rset").remove();
    grille.style.display = "grid";

    carte.forEach(carte => {
        carte.childNodes[1].classList.remove('active'); // Retourne toute les cartes
    });

    setTimeout(() => {
        location.reload(); // Recharge la page 1 seconde après l'animation
        // document.body.innerHTML = grille; // Create the game when restart button is clicked
    }, 1000); 
});


// Shuffle the cards
carte.forEach(card => {
    card.addEventListener('click', toggleCards)
    let random = Math.floor(Math.random() * 12);
    for (let i = 0; i < carte.length; i++) {
        card.style.order = random;
    }
});



function toggleCards(card) {
    if (cardSelected) return; 
    if (this === pCarte) return;

    card.target.parentNode.classList.add("active");

    if (!carteRetourne) {
        carteRetourne = true;
        pCarte = this;
        
        return;
    } else {
        // carteRetourne = false;
        sCarte = this;
    }
    correspondence();
}



function correspondence() {

    if (pCarte.getAttribute("data-attr") === sCarte.getAttribute("data-attr")) {
        count += 1; 

        if (count == 6) {
            btnRset.innerHTML = "Restart";
            // btnRset.style.backgroundColor = "rgba(100,255,0,1)";
            // btnRset.style.fontSize = "20px";
            // btnRset.style.padding = "15px 25px";
            // btnRset.style.border = "0px";
            // btnRset.style.borderRadius = "10px";
            // btnRset.style.position = "relative";
            // btnRset.style.left = "46%";
            // btnRset.style.top = "47%";
            document.body.appendChild(btnRset);
            notifications("Crongratulations! You won the game 🥳 🎉")


            // grille.parentNode.removeChild(grille);
            grille.style.display = "none";

            console.log(count)
        }

        pCarte.removeEventListener("click", toggleCards)
        sCarte.removeEventListener("click", toggleCards)
        clearBoard();
        // console.log(count)
        // console.log("match")



    } else {
        cardSelected = true;

        setTimeout(() => {
            cardSelected = false;

            pCarte.childNodes[1].classList.remove("active");
            sCarte.childNodes[1].classList.remove("active");
            clearBoard();
        }, 1000)
    }
}

function clearBoard() {
    [carteRetourne, cardSelected] = [false, false];
    [pCarte, sCarte] = [null, null];
}





function notifications(message) {

    //Initialize our notification pattern

    document.querySelector('#notification_container').innerHTML += `
        <div class="content">
            <p>${message}</p>
        </div>
    `;

    // Add a timer to supress our notifications after 3 seconds

    setTimeout(function() {
        document.querySelector('#notification_container .content').remove();
    }, 3000);

}


// grille.style.display = "none";
// btnRset.innerHTML = "Restart";
// document.body.appendChild(btnRset);
