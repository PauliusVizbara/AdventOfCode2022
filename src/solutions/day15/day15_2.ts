
import { getInput } from "../../api/api.js";

type Point = {
    x: number,
    y: number
}

const distanceBetweenPoints = (point1: Point, point2: Point) => Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y)

export default async () => {

    const data = (await getInput(15, '\n'))
    data.pop()
    // const data = [
    //     'Sensor at x=2, y=18: closest beacon is at x=-2, y=15',
    //     'Sensor at x=9, y=16: closest beacon is at x=10, y=16',
    //     'Sensor at x=13, y=2: closest beacon is at x=15, y=3',
    //     'Sensor at x=12, y=14: closest beacon is at x=10, y=16',
    //     'Sensor at x=10, y=20: closest beacon is at x=10, y=16',
    //     'Sensor at x=14, y=17: closest beacon is at x=10, y=16',
    //     'Sensor at x=8, y=7: closest beacon is at x=2, y=10',
    //     'Sensor at x=2, y=0: closest beacon is at x=2, y=10',
    //     'Sensor at x=0, y=11: closest beacon is at x=2, y=10',
    //     'Sensor at x=20, y=14: closest beacon is at x=25, y=17',
    //     'Sensor at x=17, y=20: closest beacon is at x=21, y=22',
    //     'Sensor at x=16, y=7: closest beacon is at x=15, y=3',
    //     'Sensor at x=14, y=3: closest beacon is at x=15, y=3',
    //     'Sensor at x=20, y=1: closest beacon is at x=15, y=3',
    // ]

    let locations: { sensor: Point, beacon: Point, distanceBetween: number }[] = []

    const maxTestedCoordinate = 4e6
    let index = 0
    data.forEach(row => {
        const [sensorString, beaconString] = row.split(':')
        const sensorX = +sensorString.slice(sensorString.indexOf('x=') + 2, sensorString.indexOf(','))
        const sensorY = +sensorString.slice(sensorString.indexOf('y=') + 2)
        const beaconX = +beaconString.slice(beaconString.indexOf('x=') + 2, beaconString.indexOf(','))
        const beaconY = +beaconString.slice(beaconString.indexOf('y=') + 2)
        locations.push({ sensor: { x: sensorX, y: sensorY }, beacon: { x: beaconX, y: beaconY }, distanceBetween: distanceBetweenPoints({ x: sensorX, y: sensorY }, { x: beaconX, y: beaconY }) })
    })



    let potentialPoints: Point[] = []
    for (let i = 0; i < locations.length; i++) {
        const location = locations[i];

        const sensor = location.sensor
        const beacon = location.beacon
        const distanceToBeacon = location.distanceBetween
        for (let delta = 0; delta <= distanceToBeacon + 1; delta++) {
            if (i !== 6) continue
            // potentialPoints.push({ x: sensor.x + distanceToBeacon + 1 - delta, y: sensor.y + distanceToBeacon + 1 - delta })
            // potentialPoints.push({ x: sensor.x - distanceToBeacon + 1 - delta, y: sensor.y + distanceToBeacon + 1 - delta })
            // potentialPoints.push({ x: sensor.x + distanceToBeacon + 1 - delta, y: sensor.y - distanceToBeacon + 1 - delta })
            // potentialPoints.push({ x: sensor.x - distanceToBeacon + 1 - delta, y: sensor.y - distanceToBeacon + 1 - delta })
            potentialPoints.push({ x: sensor.x - distanceToBeacon - 1 + delta, y: sensor.y + delta })
            if (delta > 0 && delta < distanceToBeacon + 1)
                potentialPoints.push({ x: sensor.x - distanceToBeacon - 1 + delta, y: sensor.y - delta })
            potentialPoints.push({ x: sensor.x + distanceToBeacon + 1 - delta, y: sensor.y + delta })
            if (delta > 0 && delta < distanceToBeacon + 1)
                potentialPoints.push({ x: sensor.x + distanceToBeacon + 1 - delta, y: sensor.y - delta })

        }

        potentialPoints = potentialPoints.filter((p) => p.x >= 0 && p.y >= 0 && p.x <= maxTestedCoordinate && p.y <= maxTestedCoordinate)

        for (const potentialPoint of potentialPoints) {
            let isValid = true
            for (const location of locations) {
                if (distanceBetweenPoints(potentialPoint, location.sensor) <= location.distanceBetween) {
                    isValid = false
                    break
                }
            }
            if (isValid) {
                console.log(potentialPoint);
                console.log(potentialPoint.x * 4e6 + potentialPoint.y);
                break
            }
        }

    }





    console.log('Done');
}   