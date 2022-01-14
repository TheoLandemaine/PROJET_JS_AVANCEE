/* ***************************************************************** */
/* ******************** VARIABLES DECLARATION //******************** */
/* ***************************************************************** */

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
let boardLocked = false;

let count = 0;                                      //Game count variable
let cardsClickedTimes = 0;

var clickedOnce = false;

var audio = new Audio('./ressources/sounds/card_flip.mp3');
audio.volume = 0.3;
var audio2 = new Audio('./ressources/sounds/cards_shuffle.mp3');
audio2.volume = 0.5;

var audioWin = new Audio ('./ressources/sounds/win.mp3');
audioWin.volume = 0.5;


refreshCount();                                     // refresh the count of the games won



/* ***************************************************************** */
/* ****************** LOOP TO CHANGE CARDS IMAGE ******************* */
/* ***************************************************************** */

for (i = 0; i < arriere.length; i++) {
    arriere[i].style.backgroundImage = "url('./ressources/img/purple-card.jpg')";
    arriere[i].style.backgroundPosition = "center";
    arriere[i].style.backgroundSize = "cover";
}

/* 
    *****************************************************************
    *********************** RESTART BUTTON **************************
    ***************************************************************** 
*/
btnRset.addEventListener('click', () => {           // Ajoute un écouteur d'événement au bouton
    reset();                                        // Reset timer 
    document.getElementById("btn-rset").remove();   // Remove reset button 

    notifications("Refreshing the game")

    carte.forEach(carte => {
        carte.childNodes[1].classList.remove('active'); // Retourne toute les cartes
    });
    audio2.play();

    setTimeout(()=>{
        location.reload();                          // Recharge la page 0.5 seconde après l'animation
    },1000);

});



/* ***************************************************************** */
/* ************************* CARDS SHUFFLE ************************* */
/* ***************************************************************** */ 

carte.forEach(card => {
    card.addEventListener('click', toggleCards) 
    let random = Math.floor(Math.random() * 12);
    for (let i = 0; i < carte.length; i++) {
        card.style.order = random;                  // set cards order ramdom
    }
});

//start the timer on the first card click
grille.addEventListener('click', start, {
    once: true                                      
});

function toggleCards(card) {

    if (boardLocked) return;     // if boardLocked is true the rest of the code w'ont be executed 
    if (this === pCarte) return; // avoid second click bug

    card.target.parentNode.classList.add("active"); // add class active to trigger the card rotation


    if (!carteRetourne) {       // if carteReturn is false that means is the first card click
        carteRetourne = true;   //set carteRetourn to true
        pCarte = this;          // setting the first card to the "this" keyword
        audio.play();

        document.getElementById('cards-clicked-count').innerText = ++cardsClickedTimes;

        return;
    } else {                    // if true that means is the second card click
        carteRetourne = false;  // set carteRetourne to false
        sCarte = this;          // setting the second card to the "this" keyword
        audio.play();

        document.getElementById('cards-clicked-count').innerText = ++cardsClickedTimes;

    }
    correspondence();
}



function correspondence() {

    if (pCarte.getAttribute("data-attr") === sCarte.getAttribute("data-attr")) {
        count += 1;                             // add 1 to the count variable

        if (count == 6) {
            btnRset.innerHTML = "Restart";      // set text in the reset button
            document.body.appendChild(btnRset); // Add reset button to the page
            notifications2("Crongratulations! You won the game 🥳 🎉")

            pause();                            // pause the countup timer


            var gameCount = parseInt(localStorage.getItem("count")); 
            localStorage.setItem("count", ++gameCount); // add 1 to the value of the local storage

            refreshCount();                                     // refresh the count of the games won

            setInterval(()=>{
                audioWin.play();

            },500)
        }

        // remove the event listener if the cards match
        pCarte.removeEventListener("click", toggleCards) 
        sCarte.removeEventListener("click", toggleCards)

    } else {
        boardLocked = true;

        setTimeout(() => {
            boardLocked = false;

            // remove class if cards d'ont match with a delay of 1000ms
            pCarte.childNodes[1].classList.remove("active"); 
            sCarte.childNodes[1].classList.remove("active");
        }, 1000)
    }
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


// refresh the count of win games when the page is refreshed
function refreshCount() {
    document.getElementById('game-count').innerText = parseInt(localStorage.getItem("count"));
}


// Set local storage count value to 0 if the value if null
window.onload = function () {
    notifications2("The game is ready")
    if (localStorage.getItem("count") === null) {
        localStorage.setItem("count", "0");
    }
}

/* ***************************************************************** */
/* ***************************** TIMER ***************************** */
/* ***************************************************************** */

let minute = 0;
let second = 0;
let millisecond = 0;

let cron;

function timer() {
    if ((millisecond += 1) == 100) {    // if the ms = 100
        millisecond = 0;                // reset ms
        second++;                       // add 1 second
    }
    if (second == 60) {                 // if the seconds = 60
        second = 0;                     // reset seconds
        minute++;                       // add 1 minute
    }

    document.getElementById('minute').innerText = returnData(minute); // refresh the html that corresponds to minute 
    document.getElementById('second').innerText = returnData(second); // refresh the html that corresponds to seconds 

}

function start() {
    cron = setInterval(() => {timer()}, 10);
    // console.log("time start")
}

function pause() {
    clearInterval(cron);
    // console.log("time pause")
}

function reset() {

    minute = 0; // set minute variable to 0
    second = 0; // set second variable to 0

    document.getElementById('minute').innerText = '00'; // update the html that corresponds to minute 
    document.getElementById('second').innerText = '00'; // update the html that corresponds to minute

    // clearInterval(cron);
    // console.log("time reset")
}


function returnData(input) {
    return input > 9 ? input : `0${input}`
}

