
import { start } from "repl";
import { getInput } from "../../api/api.js";


type Point = {
    x: number;
    y: number;
    stepsToArrive: number;
    elevation: number;
    visited: boolean;
}


export default async () => {

    const data = (await getInput(12, '\n')).filter(row => row !== '')
    // const data = [
    //     'Sabqponm',
    //     'abcryxxl',
    //     'accszExk',
    //     'acctuvwj',
    //     'abdefghi',
    // ]


    let destinationPoint: Point | null = null
    let startingPoints: Point[] = []
    const inputPoints: Point[] = []

    const mapWidth = data.length
    const mapLength = data[0].length

    for (let y = 0; y < mapWidth; y++) {
        for (let x = 0; x < mapLength; x++) {
            const element = data[y][x];
            let elevation = element.charCodeAt(0)
            if (element === 'E') elevation = 'z'.charCodeAt(0)
            const point: Point = {
                elevation,
                stepsToArrive: -1,
                visited: false,
                x,
                y,
            }
            if (element === 'a') startingPoints.push(point)
            if (element === 'E') destinationPoint = point
            inputPoints.push(point)
        }

    }

    let minToArrive = 1e4

    startingPoints.forEach(({ x: startingX, y: startingY }) => {
        const points = inputPoints.map(p => ({ ...p }))
        const travelQueue: Point[] = []
        const startPoint = points[((startingY) * mapLength + startingX)]
        startPoint.visited = true
        startPoint.stepsToArrive = 0
        travelQueue.push(startPoint)

        while (travelQueue.length) {
            const currentPoint = travelQueue.pop()
            const { x, y } = currentPoint
            const surroundingPoints = [points[((y) * mapLength + x + 1)], points[((y) * mapLength + x - 1)],
            points[((y - 1) * mapLength + x)],
            points[((y + 1) * mapLength + x)],]

            for (const point of surroundingPoints) {
                if (!point || point.visited || point.elevation - currentPoint.elevation > 1) continue
                point.visited = true
                point.stepsToArrive = currentPoint.stepsToArrive + 1
                travelQueue.unshift(point)
            }
        }


        const stepsToArrive = points[destinationPoint.y * mapLength + destinationPoint.x].stepsToArrive
        if (stepsToArrive === 0) {
            console.log('ha');
        }
        if (stepsToArrive < minToArrive && stepsToArrive > 0) minToArrive = stepsToArrive
    })

    console.log(minToArrive);



}