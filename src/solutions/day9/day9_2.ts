
import { getInput } from "../../api/api.js";

const isAdjacent = (headX, headY, tailX, tailY) => {
    return Math.abs(headX - tailX) < 2 && Math.abs(headY - tailY) < 2
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

export default async () => {

    const data = (await getInput(9, '\n')).filter(row => row !== '')


    const startPos = 0




    let placesVisited = {};

    const knots = Array.from(Array(10)).map(a => [0, 0])
    placesVisited[`0 0`] = 1


    data.forEach((row) => {
        const [direction, amount] = row.split(' ')
        for (let i = 0; i < +amount; i++) {
            if (direction === 'R') knots[0][0]++
            if (direction === 'L') knots[0][0]--
            if (direction === 'U') knots[0][1]++
            if (direction === 'D') knots[0][1]--

            for (let j = 1; j < knots.length; j++) {
                const [headX, headY] = knots[j - 1]
                const [tailX, tailY] = knots[j];
                if (!isAdjacent(headX, headY, tailX, tailY)) {
                    const deltaX = clamp(headX - tailX, -1, 1)
                    const deltaY = clamp(headY - tailY, -1, 1)
                    knots[j][0] += deltaX
                    knots[j][1] += deltaY
                    // console.log(deltaX, deltaY);

                    if (j === 8) placesVisited[`${knots[j][0]} ${knots[j][1]}`] = 1
                }
            }

        }


    })


    console.log(Object.values(placesVisited).length);

}