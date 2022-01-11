document.getElementById('start').addEventListener('click', function(e){
    alert('Start')
    const grid = document.querySelector('.grille')
    
    for(let i= 0; i <= 259; i++) {
        const cell = document.createElement('div');
        grid.appendChild(cell);
    }
})


