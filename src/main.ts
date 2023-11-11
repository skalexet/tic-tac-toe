/**
 * @Notation
 * This logic was build a very long time ago by a very young developer in a purpose of learning.
 * Since now the version is updated in terms of observation of a basic migration to typescript 
 * from javascript. Entire logic still remains the same which seems to be very rough and random
 * styled using functional programing. If you find something very inapropriate in this 
 * code please feel free to criticize and suggest more conventional solutions.
 */

/*** Modules import */
import {drawO, dialogWindow} from './modules/dom';
import {inspector, checkForCats} from './modules/utils';

/*** Initial declarations */
const matrix: string[][] = [];
let clickable: boolean;
const catsGame: string = 'Cat\'s game :3';
install();

/*** Functions */
function restart(): void {
    const tbody: HTMLElement = document.querySelector('tbody');
    const div: HTMLElement = document.querySelector('div');
    tbody.remove();
    div.remove();
    
    while (matrix.length > 0) {
        matrix.pop();
    }
    
    install();
}

function score(i: number, j: number, side: string): void | undefined {
    let scores: number | boolean = 1;
    let a: number = i;
    let b: number = j;
    
    /* utils */
    const inspect = (): void => {if (inspector(a, b, side, matrix) && typeof scores == 'number') scores++;}
    const win = (side: string): void => dialogWindow(`${side} has won`, restart);
    const checkScores = (scores: number | boolean, side: string): boolean | number => {
        if (typeof scores == 'number' && scores < 3) return 1;
        win(side);
        return false;
    }

    /* vertical */
    while (++a < matrix.length) inspect();
    a = i;

    while (--a >= 0) inspect();
    a = i;

    scores = checkScores(scores, side);
    if (!scores) return;
    
    /* horizontal */
    while (--b >= 0) inspect();
    b = j;
 
    while (matrix[a].length > ++b) inspect();
    b = j;
    
    scores = checkScores(scores, side);
    if (!scores) return;

    /* diagonal */
    while (++b >= 0 && ++a < matrix.length) inspect();
    a = i;
    b = j;

    while (--b >= 0 && --a >= 0) inspect();
    a = i;
    b = j;

    scores = checkScores(scores, side);
    if (!scores) return;

    /* diagonal */
    while (++b < matrix.length && --a >= 0) inspect();
    a = i;
    b = j;

    while (--b >= 0 && ++a < matrix.length) inspect();
    a = i;
    b = j;

    scores = checkScores(scores, side);
    if (!scores) return;
     
    if (checkForCats(matrix)) return dialogWindow(catsGame, restart);
    clickable = true;
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
