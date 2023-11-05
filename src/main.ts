/**
 * @Notation
 * This logic was build very long time ago by very young developer in a purpose of learning.
 * Since now that version is updated in terms of observation of basic migration to typescript 
 * from javascript. Entire logic still remains the same which seems to be very rough and random
 * styled using functional programing. If you find something very inapropriate in this 
 * code please feel free to criticize and suggest more conventional solutions.
 */

/*** Initial declarations */
const matrix: string[][] = [];
let clickable: boolean;

/*** Functions */
const engine = (a: number, b: number, side: string): boolean => matrix[a][b] == side ? true : false;
const win = (side: string): void => dialogWindow(`${side} has won`);
const restart = (): void => {
    const tbody: HTMLElement = document.querySelector('tbody');
    const div: HTMLElement = document.querySelector('div');
    tbody.remove();
    div.remove();

    while (matrix.length > 0) {
        matrix.pop();
    }

    install();
}

const dialogWindow = (phrase: string): void => {
    const div: HTMLElement = document.createElement('div');
    const span: HTMLElement = document.createElement('span');
    const button: HTMLElement = document.createElement('button');
    span.innerText = phrase;
    button.innerText = 'X';
    button.addEventListener('click', restart);
    div.appendChild(span);
    div.appendChild(button);
    document.body.appendChild(div);
}

const checkForCats = (): boolean => {
    let cats: number = 0;
    for (let row of matrix) { cats += row.includes('0') ? 1 : 0; }

    if (cats === 0) {
        dialogWindow(`Cat's game :3`);
        return true;
    }

    return false;
}

const checkScores = (scores: number | boolean, side: string): boolean | number => {
    if (typeof scores == 'number' && scores < 3) return 1;
    win(side);
    return false;
}
 
const score = (i: number, j: number, side: string): void | undefined => {
    let scores: number | boolean = 1; // scores = 0; scores++ previously
    let a: number = i;
    let b: number = j;

    /* vertical */
    while (++a < matrix.length) if (engine(a, b, side)) scores++; 
    a = i;

    while (--a >= 0) if (engine(a, b, side)) scores++; 
    a = i;

    scores = checkScores(scores, side);
    if (!scores) return;
    
    /* horizontal */
    while (--b >= 0 && typeof scores == 'number') if (engine(a, b, side)) scores++;
    b = j;
 
    while (matrix[a].length > ++b && typeof scores == 'number') if (engine(a, b, side)) scores++; 
    b = j;
    
    if (!(scores = checkScores(scores, side))) return;

    /* diagonal */
    while (++b >= 0 && ++a < matrix.length && typeof scores == 'number') if (engine(a, b, side)) scores++; 
    a = i;
    b = j;

    while (--b >= 0 && --a >= 0 && typeof scores == 'number') if (engine(a, b, side)) scores++;
    a = i;
    b = j;

    scores = checkScores(scores, side);
    if (!scores) return;

    /* diagonal */
    while (++b < matrix.length && --a >= 0 && typeof scores == 'number') if (engine(a, b, side)) scores++;
    a = i;
    b = j;

    while (--b >= 0 && ++a < matrix.length && typeof scores == 'number') if (engine(a, b, side)) scores++;
    a = i;
    b = j;

    scores = checkScores(scores, side);
    if (!scores) return;
     
    if (!checkForCats()) clickable = true;
}

function opposite(i: number, j: number): void {
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

function controller(target: HTMLElement, i: number, j: number): void | undefined {
    if (matrix[i][j] == 'X') {
        return;
    } else if (matrix[i][j] == 'O') {
        return;
    } else if (!clickable) {
        return;
    }
    
    clickable = false;
    matrix[i][j] = 'X';
    target.innerText = 'X';
    target.style.color = 'red';
    score(i, j, 'X');
    opposite(i, j);
}

function drawO(i: number, j: number): void {
    const tr: NodeListOf<HTMLTableRowElement> = document.querySelectorAll('tr');
    const td: NodeListOf<HTMLTableCellElement>= tr[i].querySelectorAll('td');
    td[j].innerText = 'O';
}

function install(): void {
    const table: HTMLTableElement = document.querySelector('table');
    const tbody: HTMLTableSectionElement = document.createElement('tbody');

    for (let x = 0; x < 3; x++) matrix.push(['0', '0', '0']);

    for (let y = 0; y < 3; y++) {
        const tr: HTMLTableRowElement = document.createElement('tr');
        
        for (let z = 0; z < 3; z++) {
            const setController = (event: Event): void => controller(event.target as HTMLInputElement, y, z);
            const td: HTMLTableCellElement = document.createElement('td'); 
            td.addEventListener('click', setController);
            tr.appendChild(td);
        }

        tbody.appendChild(tr);
    }
     
    table.appendChild(tbody); 
    clickable = true;
}

install();
