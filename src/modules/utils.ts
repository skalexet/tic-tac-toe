export const inspector = (a: number, b: number, side: string, matrix: string[][]): boolean => matrix[a][b] == side ? true : false;
export const checkForCats = (matrix: string[][]): boolean => {
    let cats: number = 0;
    for (let row of matrix) { cats += row.includes('0') ? 1 : 0; }

    if (cats === 0) {
        return true;
    }

    return false;
}