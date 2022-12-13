
import { getInput } from "../../api/api.js";



const closingBracketLocation = (packetString: string, openingBracketIndex: number) => {
    const openingBrackets = []
    for (let i = openingBracketIndex; i < packetString.length; i++) {
        const element = packetString[i]
        if (element === '[') openingBrackets.push('[')
        if (element === ']') openingBrackets.pop()
        if (!openingBrackets.length) {
            return i
        }
    }
}

const parsePacket = (packetString: string) => {
    let packet = []
    for (let i = 0; i < packetString.length;) {
        if (packetString[i] === '[') {
            packet.push(parsePacket(packetString.slice(i + 1, closingBracketLocation(packetString, i))))
            i = closingBracketLocation(packetString, i) + 2
        }
        else {
            const commaIndex = packetString.slice(i).indexOf(',') !== -1 ? packetString.slice(i).indexOf(',') + i : packetString.length
            const nextElement = packetString.slice(i, commaIndex)
            if (!nextElement) {
                debugger
            }
            packet.push(+nextElement)
            i = commaIndex + 1
        }

    }

    return packet
}

const arraysAreInOrder = (array1: number[] | number, array2: number[] | number) => {
    const arr1 = typeof array1 === 'number' ? [array1] : [...array1]
    const arr2 = typeof array2 === 'number' ? [array2] : [...array2]
    while (arr2.length) {
        const leftElement = arr1.shift()
        const rightElement = arr2.shift()
        if (typeof leftElement === 'object' || typeof rightElement === 'object') {
            return arraysAreInOrder(leftElement, rightElement)
        }
        if (leftElement && !rightElement) {
            return false
        }
        if (rightElement > leftElement) {
            return true
        }
        if (leftElement > rightElement) {
            return false
        }
    }
    if (arr1.length && !arr2.length) return false
    return true
}

export default async () => {

    // const data = (await getInput(13, '\n')).filter(row => row !== '')
    const data = [
        '[1,1,3,1,1]',
        '[1,1,5,1,1]',
        '',
        '[[1],[2,3,4]]',
        '[[1],4]',
        '',
        '[9]',
        '[[8,7,6]]',
        '',
        '[[4,4],4,4]',
        '[[4,4],4,4,4]',
        '',
        '[7,7,7,7]',
        '[7,7,7]',
        '',
        '[]',
        '[3]',
        '',
        '[[[]]]',
        '[[]]',
        '',
        '[1,[2,[3,[4,[5,6,7]]]],8,9]',
        '[1,[2,[3,[4,[5,6,0]]]],8,9]',
    ]

    const packetPairs: number[][][] = []

    for (let i = 0; i < data.length; i += 3) {
        const rowOne = data[i].slice(1, data[i].length - 1)
        const rowTwo = data[i + 1].slice(1, data[i + 1].length - 1)

        packetPairs.push([parsePacket(rowOne), parsePacket(rowTwo)])

    }

    type Packet = (number | number[])[]

    let sum = 0
    packetPairs.forEach(([packetOne, packetTwo], index) => {


        const isInOrder = arraysAreInOrder(packetOne, packetTwo)
        if (isInOrder) sum += index + 1
    })
    console.log(sum);
}