
import { getInput } from "../../api/api.js";

export default async () => {


    const data = (await getInput(10, '\n')).filter(row => row !== '')
    // const data = [
    //     'addx 15',
    //     'addx -11',
    //     'addx 6',
    //     'addx -3',
    //     'addx 5',
    //     'addx -1',
    //     'addx -8',
    //     'addx 13',
    //     'addx 4',
    //     'noop',
    //     'addx -1',
    //     'addx 5',
    //     'addx -1',
    //     'addx 5',
    //     'addx -1',
    //     'addx 5',
    //     'addx -1',
    //     'addx 5',
    //     'addx -1',
    //     'addx -35',
    //     'addx 1',
    //     'addx 24',
    //     'addx -19',
    //     'addx 1',
    //     'addx 16',
    //     'addx -11',
    //     'noop',
    //     'noop',
    //     'addx 21',
    //     'addx -15',
    //     'noop',
    //     'noop',
    //     'addx -3',
    //     'addx 9',
    //     'addx 1',
    //     'addx -3',
    //     'addx 8',
    //     'addx 1',
    //     'addx 5',
    //     'noop',
    //     'noop',
    //     'noop',
    //     'noop',
    //     'noop',
    //     'addx -36',
    //     'noop',
    //     'addx 1',
    //     'addx 7',
    //     'noop',
    //     'noop',
    //     'noop',
    //     'addx 2',
    //     'addx 6',
    //     'noop',
    //     'noop',
    //     'noop',
    //     'noop',
    //     'noop',
    //     'addx 1',
    //     'noop',
    //     'noop',
    //     'addx 7',
    //     'addx 1',
    //     'noop',
    //     'addx -13',
    //     'addx 13',
    //     'addx 7',
    //     'noop',
    //     'addx 1',
    //     'addx -33',
    //     'noop',
    //     'noop',
    //     'noop',
    //     'addx 2',
    //     'noop',
    //     'noop',
    //     'noop',
    //     'addx 8',
    //     'noop',
    //     'addx -1',
    //     'addx 2',
    //     'addx 1',
    //     'noop',
    //     'addx 17',
    //     'addx -9',
    //     'addx 1',
    //     'addx 1',
    //     'addx -3',
    //     'addx 11',
    //     'noop',
    //     'noop',
    //     'addx 1',
    //     'noop',
    //     'addx 1',
    //     'noop',
    //     'noop',
    //     'addx -13',
    //     'addx -19',
    //     'addx 1',
    //     'addx 3',
    //     'addx 26',
    //     'addx -30',
    //     'addx 12',
    //     'addx -1',
    //     'addx 3',
    //     'addx 1',
    //     'noop',
    //     'noop',
    //     'noop',
    //     'addx -9',
    //     'addx 18',
    //     'addx 1',
    //     'addx 2',
    //     'noop',
    //     'noop',
    //     'addx 9',
    //     'noop',
    //     'noop',
    //     'noop',
    //     'addx -1',
    //     'addx 2',
    //     'addx -37',
    //     'addx 1',
    //     'addx 3',
    //     'noop',
    //     'addx 15',
    //     'addx -21',
    //     'addx 22',
    //     'addx -6',
    //     'addx 1',
    //     'noop',
    //     'addx 2',
    //     'addx 1',
    //     'noop',
    //     'addx -10',
    //     'noop',
    //     'noop',
    //     'addx 20',
    //     'addx 1',
    //     'addx 2',
    //     'addx 2',
    //     'addx -6',
    //     'addx -11',
    //     'noop',
    //     'noop',
    //     'noop',
    // ]

    let registerValueByCycle = {}
    let currentValue = 1
    let currentCycle = 0
    data.forEach((instruction) => {
        const [command, value] = instruction.split(' ')
        if (command === 'noop') {
            registerValueByCycle[currentCycle++] = currentValue
        }
        if (command === 'addx') {
            registerValueByCycle[currentCycle++] = currentValue
            registerValueByCycle[currentCycle++] = currentValue
            currentValue += Number(value)
        }
    })


    const pixels = Array.from(Array(6), () => Array.from(Array(40)))
    for (let i = 0; i < 240; i++) {
        const row = Math.floor(i / 40);
        const column = i % 40
        const registerValue = registerValueByCycle[i]
        if (column >= registerValue - 1 && column <= registerValue + 1) {
            pixels[row][column] = '#'
        }
        else pixels[row][column] = '*'

    }
    pixels.forEach(pixel => {
        console.log(pixel.join(''));
    })

}