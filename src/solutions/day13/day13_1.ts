
import { getInput } from "../../api/api.js";

//2505
// 2843

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


const arraysAreInOrder = (array1: any, array2: any) => {


    const arr1 = typeof array1 === 'number' ? [array1] : [...array1]
    const arr2 = typeof array2 === 'number' ? [array2] : [...array2]

    if (!arr1.length && arr2.length) return true
    if (!arr2.length && arr1.length) return false


    for (let i = 0; i < arr2.length; i++) {
        if (typeof arr2[i] === 'object' || typeof arr1[i] === 'object') {
            const compareArrays = arraysAreInOrder(arr1[i], arr2[i])
            if (compareArrays !== undefined) return compareArrays
            else continue
        }
        console.log(`Comparing:  ${arr1[i]} vs ${arr2[i]} `)

        if (i === arr1.length) return true

        if (arr2[i] > arr1[i]) return true
        if (arr1[i] > arr2[i]) return false
        if (i === arr2.length - 1 && arr1.length > arr2.length) return false
    }


}

export default async () => {

    // const data = (await getInput(13, '\n'))
    // data.pop()
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


    const debugIndex = -1
    let sum = 0
    packetPairs.forEach(([packetOne, packetTwo], index) => {

        if (index === debugIndex) {
            debugger
        }
        const isInOrder = arraysAreInOrder(packetOne, packetTwo)
        if (isInOrder) sum += index + 1

        console.log(index, isInOrder);
        console.log('');
    })
    console.log(sum);
}