
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

    const sensors: Point[] = []
    const beacons: Point[] = []

    let impossibleBeaconLocationAmount = new Set<number>()
    const testedY = 2e6
    data.forEach(row => {
        const [sensorString, beaconString] = row.split(':')
        const sensorX = +sensorString.slice(sensorString.indexOf('x=') + 2, sensorString.indexOf(','))
        const sensorY = +sensorString.slice(sensorString.indexOf('y=') + 2)
        const beaconX = +beaconString.slice(beaconString.indexOf('x=') + 2, beaconString.indexOf(','))
        const beaconY = +beaconString.slice(beaconString.indexOf('y=') + 2)
        sensors.push({ x: sensorX, y: sensorY })
        beacons.push({ x: beaconX, y: beaconY })
    })




    for (let i = 0; i < sensors.length; i++) {

        const sensor = sensors[i]
        const beacon = beacons[i]
        const distanceToBeacon = distanceBetweenPoints(sensor, beacon)

        for (let x = sensor.x - distanceToBeacon; x <= sensor.x + distanceToBeacon; x++) {
            if (distanceBetweenPoints(sensor, { x, y: testedY }) <= distanceToBeacon) {
                if (sensor.x === x && sensor.y === testedY) continue
                if (beacon.x === x && beacon.y === testedY) continue
                impossibleBeaconLocationAmount.add(x)
            }
        }
    }


    console.log(impossibleBeaconLocationAmount.size);
    console.log('Done');
}   