
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

    const chunkedData = data.reduce((all, one, i) => {
        const ch = Math.floor(i / 3);
        all[ch] = [].concat((all[ch] || []), [Array.from(one)]);
        return all
    }, [])


    const prioritySums = chunkedData.reduce((sum, rucksacks) => {
        const [rucksack1, rucksack2, rucksack3] = rucksacks
        const intersectedItem = rucksack1.filter(i => rucksack2.includes(i) && rucksack3.includes(i))
        return sum + getItemPriority(intersectedItem[0])

    }, 0)
    console.log(prioritySums);
}