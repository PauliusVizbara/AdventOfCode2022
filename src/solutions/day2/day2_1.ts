import { getInput } from "../../api/api.js";


export enum ROCK_PAPER_SCISSORS {
    ROCK = 'ROCK',
    PAPER = 'PAPER',
    SCISSORS = 'SCISSORS'
}

export const INPUT_TO_RPS = {
    'A': ROCK_PAPER_SCISSORS.ROCK,
    'B': ROCK_PAPER_SCISSORS.PAPER,
    'C': ROCK_PAPER_SCISSORS.SCISSORS,
    'X': ROCK_PAPER_SCISSORS.ROCK,
    'Y': ROCK_PAPER_SCISSORS.PAPER,
    'Z': ROCK_PAPER_SCISSORS.SCISSORS,
}
export const WINNING_STRATEGY = {
    [ROCK_PAPER_SCISSORS.ROCK]: ROCK_PAPER_SCISSORS.PAPER,
    [ROCK_PAPER_SCISSORS.PAPER]: ROCK_PAPER_SCISSORS.SCISSORS,
    [ROCK_PAPER_SCISSORS.SCISSORS]: ROCK_PAPER_SCISSORS.ROCK,
}

export const SHAPE_SCORE = {
    [ROCK_PAPER_SCISSORS.ROCK]: 1,
    [ROCK_PAPER_SCISSORS.PAPER]: 2,
    [ROCK_PAPER_SCISSORS.SCISSORS]: 3,
}

export default async () => {

    const data = (await getInput(2, '\n')).filter(row => row !== '')


    const sums = data.reduce((acc, curr) => {
        let sum = 0
        const [inputLetter, outputLetter] = curr.split(' ')
        const input = INPUT_TO_RPS[inputLetter]
        const output = INPUT_TO_RPS[outputLetter]
        sum += SHAPE_SCORE[output]
        if (input === output) sum += 3;
        if (WINNING_STRATEGY[input] === output) sum += 6
        return acc + sum;
    }, 0)
    console.log(sums);
}