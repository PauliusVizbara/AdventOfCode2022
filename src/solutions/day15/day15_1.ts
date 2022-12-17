
import { getInput } from "../../api/api.js";

type Point = {
    x: number,
    y: number
}

const distanceBetweenPoints = (point1: Point, point2: Point) => Math.abs(point1.x - point2.x) + Math.abs(point1.y - point2.y)

export default async () => {

    // const data = (await getInput(15, '\n'))
    // data.pop()
    const data = [
        'Sensor at x=2, y=18: closest beacon is at x=-2, y=15',
        'Sensor at x=9, y=16: closest beacon is at x=10, y=16',
        'Sensor at x=13, y=2: closest beacon is at x=15, y=3',
        'Sensor at x=12, y=14: closest beacon is at x=10, y=16',
        'Sensor at x=10, y=20: closest beacon is at x=10, y=16',
        'Sensor at x=14, y=17: closest beacon is at x=10, y=16',
        'Sensor at x=8, y=7: closest beacon is at x=2, y=10',
        'Sensor at x=2, y=0: closest beacon is at x=2, y=10',
        'Sensor at x=0, y=11: closest beacon is at x=2, y=10',
        'Sensor at x=20, y=14: closest beacon is at x=25, y=17',
        'Sensor at x=17, y=20: closest beacon is at x=21, y=22',
        'Sensor at x=16, y=7: closest beacon is at x=15, y=3',
        'Sensor at x=14, y=3: closest beacon is at x=15, y=3',
        'Sensor at x=20, y=1: closest beacon is at x=15, y=3',
    ]

    const sensors: Point[] = []
    const beacons: Point[] = []

    const nonExistingBeaconPointsSet = new Set<string>()

    data.forEach(row => {
        const [sensorString, beaconString] = row.split(':')
        const sensorX = +sensorString.slice(sensorString.indexOf('x=') + 2, sensorString.indexOf(','))
        const sensorY = +sensorString.slice(sensorString.indexOf('y=') + 2)
        const beaconX = +beaconString.slice(beaconString.indexOf('x=') + 2, beaconString.indexOf(','))
        const beaconY = +beaconString.slice(beaconString.indexOf('y=') + 2)
        sensors.push({ x: sensorX, y: sensorY })
        beacons.push({ x: beaconX, y: beaconY })
    })

    console.log(sensors);


    sensors.forEach((sensor, index) => {
        const beacon = beacons[index]
        const distanceToBeacon = distanceBetweenPoints(sensor, beacon)

        for (let x = sensor.x - distanceToBeacon; x <= sensor.x + distanceToBeacon; x++) {
            for (let y = sensor.y - distanceToBeacon; y <= sensor.y + distanceToBeacon; y++) {
                if (distanceBetweenPoints(sensor, { x, y }) <= distanceToBeacon) {
                    if (x === beacon.x && y === beacon.y) continue
                    if (index === 6) nonExistingBeaconPointsSet.add(`${x},${y}`)
                }
            }
        }
    })

    const nonExistingPoints = Array.from(nonExistingBeaconPointsSet).map(pString => {
        const [x, y] = pString.split(',')
        return { x: Number(x), y: Number(y) }
    })

    const y10Beacons = nonExistingPoints.filter(p => p.y === 2e6)

    console.log(y10Beacons.length);
    for (let y = -4; y < 25; y++) {
        let string = ''
        for (let x = -2; x < 25; x++) {
            if (nonExistingPoints.find(p => p.x === x && p.y === y))
                string += '#'
            else string += '.'

        }
        console.log(string);
    }
    console.log('Done');
}   