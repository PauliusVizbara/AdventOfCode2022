
import { getInput } from "../../api/api.js";

const isAdjacent = (headX, headY, tailX, tailY) => {
    return Math.abs(headX - tailX) < 2 && Math.abs(headY - tailY) < 2
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export default async () => {

    const data = (await getInput(9, '\n')).filter(row => row !== '')
    // const data = [
    //     'R 4',
    //     'U 4',
    //     'L 3',
    //     'D 1',
    //     'R 4',
    //     'D 1',
    //     'L 5',
    //     'R 2',
    // ]

    let headX = 0
    let headY = 0


    let placesVisited = {};
    let tailX = 0
    let tailY = 0
    placesVisited[`${tailX}${tailY}`] = 1


    data.forEach((row) => {
        const [direction, amount] = row.split(' ')
        for (let i = 0; i < +amount; i++) {
            if (direction === 'R') headX++
            if (direction === 'L') headX--
            if (direction === 'U') headY++
            if (direction === 'D') headY--

            if (!isAdjacent(headX, headY, tailX, tailY)) {
                const deltaX = clamp(headX - tailX, -1, 1)
                const deltaY = clamp(headY - tailY, -1, 1)
                tailX += deltaX
                tailY += deltaY
                // console.log(deltaX, deltaY);

                placesVisited[`${tailX}${tailY}`] = 1
            }
        }


    })


    console.log(Object.values(placesVisited).length);

}