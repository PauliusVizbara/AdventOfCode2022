import { getInput } from "../../api/api.js";
import { INPUT_TO_RPS, SHAPE_SCORE, WINNING_STRATEGY } from "./day2_1.js";

enum DESIRED_OUTCOME {
    LOSE,
    DRAW,
    WIN,
}

const INPUT_TO_DESIRED_OUTCOME = {
    'X': DESIRED_OUTCOME.LOSE,
    'Y': DESIRED_OUTCOME.DRAW,
    'Z': DESIRED_OUTCOME.WIN,
}

export default async () => {

    const data = (await getInput(2, '\n')).filter(row => row !== '')


    const sums = data.reduce((acc, curr) => {
        let sum = 0
        const [inputLetter, outputLetter] = curr.split(' ')
        const input = INPUT_TO_RPS[inputLetter]
        const desiredOutcome = INPUT_TO_DESIRED_OUTCOME[outputLetter]
        let output = input
        if (desiredOutcome === DESIRED_OUTCOME.WIN) output = WINNING_STRATEGY[input]
        if (desiredOutcome === DESIRED_OUTCOME.LOSE) {
            output = Object.entries(WINNING_STRATEGY).find(([, strategyOutput]) => strategyOutput === input)[0]
        }
        sum += SHAPE_SCORE[output]
        if (input === output) sum += 3;
        if (WINNING_STRATEGY[input] === output) sum += 6
        return acc + sum;
    }, 0)

    console.log(sums);
}