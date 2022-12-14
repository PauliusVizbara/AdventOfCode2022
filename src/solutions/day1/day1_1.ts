import { getInput } from "../../api/api.js";

export default async () => {

    const data = await getInput(1, '\n\n')

    const summedCalories = data.map(row => row.split('\n').reduce((acc, curr) => acc + Number(curr), 0))
    console.log(Math.max(...summedCalories));
}