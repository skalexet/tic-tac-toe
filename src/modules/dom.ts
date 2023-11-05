export function drawO(i: number, j: number): void {
    const tr: NodeListOf<HTMLTableRowElement> = document.querySelectorAll('tr');
    const td: NodeListOf<HTMLTableCellElement>= tr[i].querySelectorAll('td');
    td[j].innerText = 'O';
}

export const dialogWindow = (phrase: string, restart: () => void): void => {
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
