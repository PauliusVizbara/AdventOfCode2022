
import { getInput } from "../../api/api.js";


const getItemPriority = (item: string) => {
    const charCode = item.charCodeAt(0)
    if (charCode < 97) {
        return charCode - 65 + 27
    }
    else return charCode - 96
}

export default async () => {

    const data = (await getInput(3, '\n')).filter(row => row !== '')

    const prioritySums = data.reduce((sum, rucksack) => {
        const leftSide = Array.from(rucksack.slice(0, rucksack.length / 2))
        const rightSide = Array.from(rucksack.slice(rucksack.length / 2))
        const intersectedItem = leftSide.filter(i => rightSide.includes(i))
        return sum + getItemPriority(intersectedItem[0])

    }, 0)
    console.log(prioritySums);
}