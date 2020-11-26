const matrix = [];

let clickable;

function engine(a, b, side) {
    return matrix[a][b] == side ? true : false;
}

function win(side) {
    dialogWindow(`${side} has won`);
}

function restart() {
    const tbody = document.querySelector('tbody');
    tbody.remove();

    const div = document.querySelector('div');
    div.remove();

    while (matrix.length > 0) {
        matrix.pop();
    }

    install();
}

function dialogWindow(phrase) {
    const div = document.createElement('div');
    const span = document.createElement('span');
    const button = document.createElement('button');

    span.innerText = phrase;
    button.innerText = 'X';

    button.addEventListener('click', restart);

    div.appendChild(span);
    div.appendChild(button);
    document.body.appendChild(div);
}

function checkForCats() {
    let cats = 0;
    for (let row of matrix) {
        cats += row.includes(0) ? 1 : 0;  
    }

    if (cats === 0) {
        dialogWindow(`Cat's game :3`);
        return true;
    } else {
        return false;
    }
}

function checkScores(scores, side) {
    if (scores < 3) {
        return 1;
    } else {
        win(side);
        return false;
    }
}
 
function score(i, j, side) {
    let scores = 0;
    let a = i;
    let b = j;

    scores++;
// ===================verXal===========//
    while (++a < matrix.length) {
        if (engine(a, b, side)) scores++; 
    }  

    a = i;
    
    while (--a >= 0) {
        if (engine(a, b, side)) scores++; 
    } 
 
    a = i;

    if (!(scores = checkScores(scores, side))) {return};
// =====================horiaontal=================//
    while (--b >= 0) {
        if (engine(a, b, side)) scores++; 
    }  

    b = j;
 
    while (matrix[a].length > ++b) {
        if (engine(a, b, side)) scores++; 
    } 

    b = j;
    
    if (!(scores = checkScores(scores, side))) {return};

//====================diagonal right down/ left up===========//

    while (++b >= 0 && ++a < matrix.length) {
        if (engine(a, b, side)) scores++; 
    }  

    a = i;
    b = j;

    while (--b >= 0 && --a >= 0) {
        if (engine(a, b, side)) scores++; 
    } 

    a = i;
    b = j;

    if (!(scores = checkScores(scores, side))) {return};

//====================diagonal right up/ left down===========//

    while (++b < matrix.length && --a >= 0) {
        if (engine(a, b, side)) scores++; 
    }  

    a = i;
    b = j;

    while (--b >= 0 && ++a < matrix.length) {
        if (engine(a, b, side)) scores++; 
    } 

    a = i;
    b = j;

    if (!(scores = checkScores(scores, side))) {return};
     
    if (!checkForCats()) {
        clickable = true;
    }
}

function opposite(i, j) {
    if (clickable) {
        clickable = false;
        setTimeout(() => {
            while (matrix[i][j] == 'X' || matrix[i][j] == 'O') {
                i = Math.floor(Math.random() * 3);
                j = Math.floor(Math.random() * 3);
            }

            matrix[i][j] = 'O';
            score(i, j, 'O');
            drawO(i, j);
        }, 750);
    } 
}

function controller(target, i, j) {
    if (matrix[i][j] == 'X') {
        return;
    } else if (matrix[i][j] == 'O') {
        return;
    } else if (!clickable) {
        return;
    } else {
        clickable = false;
        matrix[i][j] = 'X';
        target.innerText = "X";
        target.style.color = 'red';
    }

    score(i, j, 'X');
    opposite(i, j);
}

function drawO(i, j) {
    const tr = document.querySelectorAll('tr');
        const td = tr[i].querySelectorAll('td');
        td[j].innerText = "O";
}

function install() {
    const table = document.querySelector('table');
    const tbody = document.createElement('tbody');

    for (let i = 0; i < 3; i++) {
        matrix.push([0, 0, 0]);
    }

    for (let i = 0; i < 3; i++) {
        const tr = document.createElement('tr');
        
        for (let j = 0; j < 3; j++) {
            const td = document.createElement('td'); 
            td.addEventListener('click', setController);

            function setController(event) {
                controller(event.target, i, j);
            }

            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }
     
    table.appendChild(tbody); 

    clickable = true;
}

install();
