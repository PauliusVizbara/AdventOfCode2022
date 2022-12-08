
import { getInput } from "../../api/api.js";

const visibilityToLeft = (data: string[], i: number, j: number) => {
    const tree = data[i][j]
    let visibility = 1
    let x = j;
    while (--x >= 0) {
        if (data[i][x] >= tree) {
            return visibility
        }
        visibility++
    }
    return visibility
}

const visibilityToRight = (data: string[], i: number, j: number) => {
    const tree = data[i][j]
    let visibility = 1
    let x = j;
    while (++x <= data.length - 1) {
        if (data[i][x] >= tree) {
            return visibility
        }
    }
    return visibility
}

const visibilityToTop = (data: string[], i: number, j: number) => {

    const tree = data[i][j]
    let visibility = 1

    let y = i;
    while (--y >= 0) {
        if (data[y][j] >= tree) {
            return visibility
        }
    }
    return visibility
}

const visibilityToBottom = (data: string[], i: number, j: number) => {
    const tree = data[i][j]
    let visibility = 1

    let y = i;
    while (++y <= data.length - 1) {
        if (data[y][j] >= tree) {
            return visibility
        }
    }
    return visibility
}

export default async () => {

    // const data = (await getInput(8, '\n')).filter(row => row !== '')

    const data = [
        '30373',
        '25512',
        '65332',
        '33549',
        '35390',
    ]


    let visibleTrees = data.length * 2 + (data[0].length - 2) * 2

    for (let i = 1; i < data.length - 1; i++) {
        for (let j = 1; j < data[0].length - 1; j++) {
            const tree = data[i][j]
            if (i === 1 && j === 2) {
                console.log(tree);
            }
            if (i === 3 && j === 2) {
                console.log(tree);
            }
            const left = visibilityToLeft(data, i, j)
            const right = visibilityToRight(data, i, j)
            const top = visibilityToTop(data, i, j)
            const bottom = visibilityToBottom(data, i, j)



        }

    }
    console.log(visibleTrees);


}

