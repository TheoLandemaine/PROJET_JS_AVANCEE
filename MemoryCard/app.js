var cartesDoubleF = document.querySelectorAll(".double-face");
let carte = document.querySelectorAll(".carte");
let arriere = document.querySelectorAll(".arriere");
var btnRset = document.createElement("BUTTON");
btnRset.setAttribute("id", "btn-rset")
var btnStart = document.createElement("button");
var grille = document.querySelector('.grille');
let content = document.querySelectorAll('.content');


let carteRetourne = false;
let pCarte, sCarte;
let cardSelected = false;

let count = 0;

var clickedOnce = false;

refreshCount(); // refresh the count of the games won

// For loop to change cards image
for (i = 0; i < arriere.length; i++) {
    arriere[i].style.backgroundImage = "url('./ressources/img/purple-card.jpg')";
    arriere[i].style.backgroundPosition = "center";
    arriere[i].style.backgroundSize = "cover";
}

// Button to restart the game
btnRset.addEventListener('click', () => { // Ajoute un écouteur d'événement au bouton
    reset(); // Reset timer 
    document.getElementById("btn-rset").remove(); // Remove reset button 

    notifications("Refreshing the game")

    carte.forEach(carte => {
        carte.childNodes[1].classList.remove('active'); // Retourne toute les cartes
    });

    setTimeout(() => {
        location.reload(); // Recharge la page 1 seconde après l'animation

        notifications2("The game is ready")
    }, 1500);
});


// Shuffle the cards
carte.forEach(card => {
    card.addEventListener('click', toggleCards)
    let random = Math.floor(Math.random() * 12);
    for (let i = 0; i < carte.length; i++) {
        card.style.order = random; // set cards order ramdom
    }
});

grille.addEventListener('click', start, {
    once: true //start the timer on the first card click
});

function toggleCards(card) {

    if (cardSelected) return;
    if (this === pCarte) return;
    card.target.parentNode.classList.add("active"); // add class active


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
        count += 1; // add 1 to the count variable

        if (count == 6) {
            btnRset.innerHTML = "Restart"; // set text in the reset button
            document.body.appendChild(btnRset); // Add reset button to the page
            notifications2("Crongratulations! You won the game 🥳 🎉")

            pause(); // pause the countup timer



            var gameCount = parseInt(localStorage.getItem("count")); 
            localStorage.setItem("count", ++gameCount); // add 1 to the value of the local storage

        }
        // remove the event listener if the cards match
        pCarte.removeEventListener("click", toggleCards) 
        sCarte.removeEventListener("click", toggleCards)
        clearBoard();

    } else {
        cardSelected = true;
        setTimeout(() => {
            cardSelected = false;

            // remove class if cards d'ont match
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
    setTimeout(function () {
        document.querySelector('#notification_container .content').remove();
    }, 3000);
}

function notifications2(message) {
    //Initialize our notification pattern
    document.querySelector('#notification_container').innerHTML += `
        <div class="content2">
            <p>${message}</p>
        </div>
    `;
    // Add a timer to supress our notifications after 3 seconds
    setTimeout(function () {
        document.querySelector('#notification_container .content2').remove();
    }, 3000);
}


function refreshCount() {
    document.getElementById('game-count').innerText = parseInt(localStorage.getItem("count"));
}


//***************************************************************************************************** */
//*************************************** TIMER ******************************************************* */
//***************************************************************************************************** */

let minute = 0;
let second = 0;
let millisecond = 0;

let cron;

function timer() {
    if ((millisecond += 1) == 100) {
        millisecond = 0;
        second++;
    }
    if (second == 60) {
        second = 0;
        minute++;
    }

    document.getElementById('minute').innerText = returnData(minute); 
    document.getElementById('second').innerText = returnData(second);

}

function start() {
    cron = setInterval(() => {
        timer();
    }, 10);
    console.log("time start")
}

function pause() {
    clearInterval(cron);
    console.log("time pause")
}

function reset() {

    minute = 0;
    second = 0;

    document.getElementById('minute').innerText = '00';
    document.getElementById('second').innerText = '00';

    clearInterval(cron);

    console.log("time reset")
}


function returnData(input) {
    return input > 9 ? input : `0${input}`
}

