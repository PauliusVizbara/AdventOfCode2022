
import { getInput } from "../../api/api.js";

export default async () => {

    const EMPTY_CELL = '.'
    const PATH_CELL = '#'
    const SAND_CELL = 'O'

    const data = (await getInput(14, '\n'))
    data.pop()
    // const data = [
    //     '498,4 -> 498,6 -> 496,6',
    //     '503,4 -> 502,4 -> 502,9 -> 494,9',
    // ]

    const map = Array.from(Array(1e3), () => Array.from(Array(1e3).fill(EMPTY_CELL)))

    let bottomLineY = 0
    data.forEach(row => {
        const coordinates = row.split('->').map(c => c.trim().split(',').map(Number))
        for (let i = 1; i < coordinates.length; i++) {
            const endPoint = coordinates[i];
            const startPoint = coordinates[i - 1]
            for (let x = Math.min(startPoint[0], endPoint[0]); x <= Math.max(startPoint[0], endPoint[0]); x++) {
                for (let y = Math.min(startPoint[1], endPoint[1]); y <= Math.max(startPoint[1], endPoint[1]); y++) {
                    if (y > bottomLineY) {
                        bottomLineY = y
                    }
                    map[y][x] = PATH_CELL
                }
            }
        }
    })

    for (let x = 0; x < 1e3; x++) {
        map[bottomLineY + 2][x] = PATH_CELL

    }

    let blockedEntrance = false
    let particlesFell = 0
    while (!blockedEntrance) {

        let isAtRest = false
        let location = [500, 0]
        while (!isAtRest) {
            const currentX = location[0]
            const currentY = location[1]
            if (map[currentY + 1][currentX] === EMPTY_CELL) {
                location[1]++
            }
            else if (map[currentY + 1][currentX - 1] === EMPTY_CELL) {
                location[1]++
                location[0]--
            }
            else if (map[currentY + 1][currentX + 1] === EMPTY_CELL) {
                location[1]++
                location[0]++
            }
            else {
                isAtRest = true

            }


            if (isAtRest) {
                particlesFell++
                map[currentY][currentX] = SAND_CELL
                if (location[0] === 500 && location[1] === 0) {
                    blockedEntrance = true;
                    break;
                }
            }
        }

    }

    console.log(particlesFell);
    for (let y = 0; y < 13; y++) {

        console.log(map[y].join('').slice(485, 520));

    }

}