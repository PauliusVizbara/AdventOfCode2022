
import { getInput } from "../../api/api.js";

export default async () => {

    const data = (await getInput(6, '\n')).shift()

    const packetSize = 14
    let marker = 0
    for (let i = packetSize; i < data.length; i++) {
        const packet = data.slice(i - packetSize, i)
        const uniqueCharactersAmount = new Set(packet).size
        if (uniqueCharactersAmount === packetSize) {
            marker = i;
            break
        }

    }
    console.log(marker);
}