
import { getInput } from "../../api/api.js";

type ThrownItem = {
    recipient: number
    item: number
}

class Monkey {
    constructor(params) {
        Object.assign(this, params)
        this.inspectedTimes = 0
    }

    index: number
    items: number[]
    operation: string
    testDivisor: number
    passThrowTo: number
    failThrowTo: number
    inspectedTimes: number
    executeOperation(item: number) {
        const expression = this.operation.replace(/old/g, item.toString())
        return eval(expression)
    }
    throwItems(): ThrownItem[] {
        const thrownItems: ThrownItem[] = []


        while (this.items.length) {
            this.inspectedTimes++
            let item = this.executeOperation(this.items.shift())
            item = Math.floor(item / 3)
            const recipient = item % this.testDivisor === 0 ? this.passThrowTo : this.failThrowTo
            thrownItems.push({ recipient, item })
        }

        return thrownItems
    }

}
export default async () => {

    const data = (await getInput(11, '\n'))
    data.pop()
    // const data = [
    //     'Monkey 0:',
    //     '  Starting items: 79, 98',
    //     '  Operation: new = old * 19',
    //     '  Test: divisible by 23',
    //     '    If true: throw to monkey 2',
    //     '    If false: throw to monkey 3',
    //     '',
    //     'Monkey 1:',
    //     '  Starting items: 54, 65, 75, 74',
    //     '  Operation: new = old + 6',
    //     '  Test: divisible by 19',
    //     '    If true: throw to monkey 2',
    //     '    If false: throw to monkey 0',
    //     '',
    //     'Monkey 2:',
    //     '  Starting items: 79, 60, 97',
    //     '  Operation: new = old * old',
    //     '  Test: divisible by 13',
    //     '    If true: throw to monkey 1',
    //     '    If false: throw to monkey 3',
    //     '',
    //     'Monkey 3:',
    //     '  Starting items: 74',
    //     '  Operation: new = old + 3',
    //     '  Test: divisible by 17',
    //     '    If true: throw to monkey 0',
    //     '    If false: throw to monkey 1',
    // ]

    const monkeys: Monkey[] = []
    for (let i = 0; i < data.length; i += 7) {
        const items = data[i + 1].slice(18).split(', ').map(Number)
        const operation = data[i + 2].slice(18)
        const testDivisor = data[i + 3].split(' ').pop()
        const passThrowTo = +data[i + 4][data[i + 4].length - 1]
        const failThrowTo = +data[i + 5][data[i + 5].length - 1]
        monkeys.push(new Monkey({ index: i / 7, items, operation, testDivisor, passThrowTo, failThrowTo }))
    }

    const rounds = 20
    for (let i = 0; i < rounds; i++) {

        monkeys.forEach(monkey => {
            const thrownItems = monkey.throwItems()
            thrownItems.forEach(thrownItem => monkeys[thrownItem.recipient].items.push(thrownItem.item))
        })
    }

    const [monkey1, monkey2] = monkeys.map(m => m.inspectedTimes).sort((a, b) => b - a)
    const monkeyBusiness = monkey1 * monkey2
    console.log(monkeyBusiness);
}