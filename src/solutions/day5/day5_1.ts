
import { getInput } from "../../api/api.js";

export default async () => {

    const data = (await getInput(5, '\n'))
    const stacksInput = data.slice(0, data.indexOf(''))
    const stacksIndices = stacksInput.pop()
    const stacksAmount = +stacksIndices[stacksIndices.length - 2]
    const stacks = Array.from(Array(stacksAmount), () => new Array());
    const instructions = data.slice(data.indexOf('') + 1, data.length - 1)
    for (let i = stacksInput.length - 1; i >= 0; i--) {
        const stackInput = stacksInput[i]
        for (let j = 1; j < stackInput.length; j += 4) {
            stackInput[j] !== ' ' && stacks[+stacksIndices[j] - 1].push(stackInput[j])
        }
    }
    instructions.forEach(instruction => {
        const [, amount, , from, , to] = instruction.split(' ')
        const fromIndex = +from - 1
        const toIndex = +to - 1

        const movedCrates = stacks[fromIndex].splice(stacks[fromIndex].length - +amount).reverse()
        stacks[toIndex].push(...movedCrates)
    })
    const cratesOnTop = stacks.reduce((acc, curr) => acc + curr[curr.length - 1], '')
    console.log(cratesOnTop);
}