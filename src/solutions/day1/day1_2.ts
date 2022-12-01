import { getInput } from "../../api/api.js";

export default async () => {

    const data = await getInput(1, '\n\n')

    const summedCalories = data.map(row => row.split('\n').reduce((acc, curr) => acc + Number(curr), 0))
    const sortedCalories = summedCalories.sort((a, b) => b - a)
    console.log(sortedCalories.slice(0, 3).reduce((acc, curr) => acc + Number(curr), 0));
}