
import { getInput } from "../../api/api.js";

const valueIsInRange = (value: number, start: number, end: number) => value >= start && value <= end
export default async () => {

    const data = (await getInput(4, '\n')).filter(row => row !== '')

    const fullyContainedAmount = data.reduce((amount, assignments) => {
        const [assignment1Input, assignment2Input] = assignments.split(',')
        const [assignment1Start, assignment1End] = assignment1Input.split('-').map(v => +v)
        const [assignment2Start, assignment2End] = assignment2Input.split('-').map(v => +v)
        if (valueIsInRange(assignment1Start, assignment2Start, assignment2End) && valueIsInRange(assignment1End, assignment2Start, assignment2End))
            return amount + 1
        if (valueIsInRange(assignment2Start, assignment1Start, assignment1End) && valueIsInRange(assignment2End, assignment1Start, assignment1End))
            return amount + 1
        return amount
    }, 0)
    console.log(fullyContainedAmount);
}