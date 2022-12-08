
import { getInput } from "../../api/api.js";

const isVisibleFromLeft = (data: string[], i: number, j: number) => {
    const tree = data[i][j]
    let x = j;
    while (--x >= 0) {
        if (data[i][x] >= tree) {
            return false
        }
    }
    return true
}

const isVisibleFromRight = (data: string[], i: number, j: number) => {
    const tree = data[i][j]
    let x = j;
    while (++x <= data.length - 1) {
        if (data[i][x] >= tree) {
            return false
        }
    }
    return true
}

const isVisibleFromTop = (data: string[], i: number, j: number) => {
    const tree = data[i][j]
    let y = i;
    while (--y >= 0) {
        if (data[y][j] >= tree) {
            return false
        }
    }
    return true
}

const isVisibleFromBottom = (data: string[], i: number, j: number) => {
    const tree = data[i][j]
    let y = i;
    while (++y <= data.length - 1) {
        if (data[y][j] >= tree) {
            return false
        }
    }
    return true
}

export default async () => {

    const data = (await getInput(8, '\n')).filter(row => row !== '')

    // const data = [
    //     '30373',
    //     '25512',
    //     '65332',
    //     '33549',
    //     '35390',
    // ]


    let visibleTrees = data.length * 2 + (data[0].length - 2) * 2

    for (let i = 1; i < data.length - 1; i++) {
        for (let j = 1; j < data[0].length - 1; j++) {
            const tree = data[i][j]
            if (isVisibleFromLeft(data, i, j)) {
                visibleTrees++
                continue
            }
            if (isVisibleFromRight(data, i, j)) {
                visibleTrees++
                continue

            }
            if (isVisibleFromTop(data, i, j)) {
                visibleTrees++
                continue

            }
            if (isVisibleFromBottom(data, i, j)) {
                visibleTrees++
                continue

            }

        }

    }
    console.log(visibleTrees);


}

