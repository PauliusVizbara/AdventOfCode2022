
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

    // const data = (await getInput(12, '\n')).filter(row => row !== '')
    const data = [
        'Sabqponm',
        'abcryxxl',
        'accszExk',
        'acctuvwj',
        'abdefghi',
    ]

    const travelQueue: Point[] = []
    let travelDistance = 0
    let destinationPoint: Point | null = null
    let startingPoint: Point | null = null
    const points: Point[] = []

    const mapWidth = data.length
    const mapLength = data[0].length

    for (let y = 0; y < mapWidth; y++) {
        for (let x = 0; x < mapLength; x++) {
            const element = data[y][x];
            let elevation = element.charCodeAt(0)
            if (element === 'S') elevation = 'a'.charCodeAt(0)
            if (element === 'E') elevation = 'z'.charCodeAt(0)
            const point: Point = {
                elevation,
                stepsToArrive: 0,
                visited: false,
                x,
                y,
            }
            if (element === 'S') startingPoint = point
            if (element === 'E') destinationPoint = point
            points.push(point)
        }

    }
    startingPoint.stepsToArrive = travelDistance
    startingPoint.visited = true
    travelQueue.push(startingPoint)

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
    console.log(startingPoint);
    console.log(destinationPoint);
    console.log(points);


}