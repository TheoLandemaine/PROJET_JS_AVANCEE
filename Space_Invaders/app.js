document.getElementById('start').addEventListener('click', function(e){
    alert('Start')
    const grid = document.querySelector('.grille')
    
    for(let i= 0; i <= 259; i++) {
        const cell = document.createElement('div');
        grid.appendChild(cell);
    }

    const cells = Array.from(document.querySelectorAll('.grille div'));

    const alliensI = [
        0,1,2,3,4,5,6,7,8,9,
        20,21,22,23,24,25,26,27,28,29,
        40,41,42,43,44,45,46,47,48,49
    ];

    function draw(){
        for (let i=0; i < alliensI.length; i++) {
            cells[alliensI[i]].classList.add('alien')
        }
    }

    draw();

    cells[200].classList.add('tireur')

})


